const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = vm.createContext({document:{addEventListener(){}}, console});
vm.runInContext(fs.readFileSync('js/config.js','utf8')+'\n'+fs.readFileSync('js/app.js','utf8'),context);
test('WhatsApp link has real number and safely encoded text',()=>{
 const result=vm.runInContext('whatsappUrl("Hi & नमस्ते? #quote")',context);
 const url=new URL(result);
 assert.equal(url.hostname,'wa.me');assert.equal(url.pathname,'/919140910217');
 assert.equal(url.searchParams.get('text'),'Hi & नमस्ते? #quote');
});
test('Inquiry retains customer fields',()=>{
 const result=vm.runInContext('inquiryMessage({name:"Example",phone:"1234567890",service:"Website",notes:"Need a quote"})',context);
 for(const field of ['Example','1234567890','Website','Need a quote'])assert.ok(result.includes(field));
});
test('All local HTML assets exist and internal anchors resolve',()=>{
 const html=fs.readFileSync('index.html','utf8');
 for(const [,src]of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
  if(/^(https?:|tel:|mailto:)/.test(src))continue;
  assert.ok(fs.existsSync(src.replace(/^\.\//,'').replace(/^\//,'')),src);
 }
 const ids=new Set([...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]));
 for(const [,id]of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.has(id),id);
});
test('Blocked WhatsApp popup leaves enquiry intact and offers fallback',()=>{
 let init=[],submit;const values={clientName:{value:'Example'},clientPhone:{value:'+91 98765 43210',setCustomValidity(){},addEventListener(){}},clientService:{value:'Website'},clientMessage:{value:'Need a salon website'},inquiryFallback:{hidden:true},inquiryStatus:{textContent:''}};
 values.projectInquiryForm={addEventListener(event,fn){submit=fn},reportValidity(){return true},reset(){throw Error('Must not reset customer input')}};
 const ctx=vm.createContext({document:{addEventListener(event,fn){if(event==='DOMContentLoaded')init.push(fn)},querySelectorAll(){return []},getElementById(id){return values[id]||null}},window:{open(){return null}},Date});
 vm.runInContext(fs.readFileSync('js/config.js','utf8')+'\n'+fs.readFileSync('js/app.js','utf8'),ctx);init.forEach(fn=>fn());submit({preventDefault(){}});
 assert.equal(values.clientName.value,'Example');assert.equal(values.inquiryFallback.hidden,false);
 assert.equal(new URL(values.inquiryFallback.href).hostname,'wa.me');
 assert.match(values.inquiryStatus.textContent,/press Send/);
});
