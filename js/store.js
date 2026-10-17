/* Direct store: product catalogue, filters and contextual WhatsApp links. */
document.addEventListener('DOMContentLoaded', () => {
  const products = [{"id": "apex", "name": "APEX Car Detailing", "category": "Automotive", "price": 6499, "url": "https://apex-auto-detailing-gamma.vercel.app/", "image": "apex-live-preview.jpg", "desc": "A bold, dark storefront for car care studios and premium detailing services.", "features": ["Service packages", "Vehicle enquiry", "WhatsApp quote requests"], "asset": "img/store/apex.webp"}, {"id": "nestcare", "name": "Nestcare Home Cleaning", "category": "Home services", "price": 5999, "url": "https://nestcare-home-cleaning.vercel.app/", "image": "nestcare-live-preview.jpg", "desc": "A fresh, welcoming website for home, upholstery and office cleaning businesses.", "features": ["Cleaning services", "Property details", "WhatsApp quote requests"], "asset": "img/store/nestcare.webp"}, {"id": "forma", "name": "Forma Interior Design", "category": "Interiors", "price": 8999, "url": "https://forma-interior-studio-nine.vercel.app/", "image": "forma-live-preview.jpg", "desc": "A warm editorial design for interior studios, designers and home renovation teams.", "features": ["Inspiration gallery", "Design services", "Consultation enquiries"], "asset": "img/store/forma.webp"}, {"id": "haven", "name": "Haven PG & Hostel", "category": "PG & hostel", "price": 5999, "url": "https://haven-pg-hostel.vercel.app/", "image": "haven-live-preview.jpg", "desc": "A clear room showcase for PG owners, hostels and student living businesses.", "features": ["Sharing & rent plans", "Room gallery", "Property visit enquiries"], "asset": "img/store/haven.webp"}, {"id": "aurelia", "name": "Aurelia Unisex Salon", "category": "Salon & barber", "price": 5999, "url": "https://aurelia-premium-salon.vercel.app/", "image": "aurelia-live-preview.jpg", "desc": "A premium salon concept for hair, beauty and unisex grooming businesses.", "features": ["Salon service menu", "Premium visual style", "Appointment enquiry setup"], "asset": "img/store/aurelia.webp"}, {"id": "iron-oak", "name": "Iron & Oak Barbershop", "category": "Salon & barber", "price": 5499, "url": "https://iron-and-oak-barbershop-alpha.vercel.app/", "image": "iron-oak-live-preview.jpg", "desc": "A characterful barber website with a sharp service menu and direct enquiries.", "features": ["Grooming packages", "Barber showcase", "WhatsApp appointments"], "asset": "img/store/iron-oak.webp"}, {"id": "forge", "name": "Forge Gym & Fitness", "category": "Fitness", "price": 6999, "url": "https://forge-gym-fitness.vercel.app/", "image": "forge-fitness-live-preview.jpg", "desc": "An energetic fitness website for gyms, personal trainers and training studios.", "features": ["Membership plans", "Class schedule", "Trial session enquiries"], "asset": "img/store/forge.webp"}, {"id": "glow-up", "name": "Glow Up Salon", "category": "Salon & barber", "price": 5500, "url": "https://glowupsaloon.vercel.app/", "asset": "img/project-salon.webp", "desc": "An elegant beauty and spa website with a polished services and gallery experience.", "features": ["Beauty services", "Photo gallery", "Appointment enquiries"]}, {"id": "saffron-smoke", "name": "Saffron & Smoke", "category": "Restaurant", "price": 8999, "url": "https://saffron-and-smoke-self.vercel.app/", "asset": "img/project-restaurant.webp", "desc": "A warm restaurant website that brings menus, signature dishes and dining together.", "features": ["Food & menu showcase", "Restaurant details", "Table enquiries"]}, {"id": "smilecraft", "name": "SmileCraft Dental", "category": "Healthcare", "price": 9999, "url": "https://smilecraft-dental-studio-smoky.vercel.app/", "asset": "img/project-dental.webp", "desc": "A reassuring clinic website with a clear treatment menu and patient enquiry journey.", "features": ["Treatment showcase", "Clinic information", "Appointment enquiries"]}];
  const grid = document.getElementById('templateGrid');
  if (!grid) return;
  const search = document.getElementById('storeSearch');
  const sort = document.getElementById('storeSort');
  const filters = [...document.querySelectorAll('[data-store-filter]')];
  const cards = [...grid.querySelectorAll('[data-product-id]')];
  const currency = value => new Intl.NumberFormat('en-IN', {style:'currency', currency:'INR', maximumFractionDigits:0}).format(value);
  let category = 'all';
  let mode = 'setup';
  function updateStore() {
    const term = search.value.trim().toLocaleLowerCase();
    const source = mode === 'source';
    const ordered = [...products];
    const cost = product => source ? 1499 : product.price;
    if (sort.value === 'price-low') ordered.sort((a,b) => cost(a)-cost(b));
    if (sort.value === 'price-high') ordered.sort((a,b) => cost(b)-cost(a));
    if (sort.value === 'name') ordered.sort((a,b) => a.name.localeCompare(b.name));
    let count = 0;
    ordered.forEach(product => {
      const card = cards.find(item => item.dataset.productId === product.id);
      const haystack = [product.name,product.category,product.desc,...product.features].join(' ').toLocaleLowerCase();
      const visible = (category === 'all' || category === product.category) && (!term || haystack.includes(term));
      card.hidden = !visible;
      if (visible) count++;
      card.querySelector('[data-price-prefix]').textContent = source ? '' : 'From';
      card.querySelector('[data-product-price]').textContent = currency(cost(product));
      card.querySelector('[data-price-suffix]').textContent = source ? 'source files / one-time' : 'one-time setup';
      card.querySelector('[data-package-copy]').textContent = source ? 'Editable code for one business. Set up yourself.' : 'Branding, content updates & launch assistance.';
      const message = `Hi Sundaram, I want to buy ${product.name} from your agency Store.\nProduct ID: ${product.id}\nPackage: ${source ? 'Source template' : 'Customized business setup'}\nListed price: ${source ? '' : 'From '}${currency(cost(product))}\nDemo: ${product.url}\nPlease confirm the scope, final total, payment instructions and delivery timeline.\nMy business name:\nMy city:\nCustomization needed:`;
      card.querySelector('.template-buy').href = whatsappUrl(message);
      grid.append(card);
    });
    document.getElementById('storeResults').textContent = `Showing ${count} of ${products.length} templates · ${source ? 'Source template' : 'Business setup'}`;
    document.getElementById('storeEmpty').hidden = count !== 0;
    document.getElementById('storePackageNote').textContent = source ? 'Source template: existing editable code for one business website, ₹1,499 each. Customization and installation are not included.' : 'Business setup: your logo, colours, supplied content, WhatsApp contact and launch assistance. Prices start at the amounts shown.';
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.storeFilter === category)));
  }
  filters.forEach(button => button.addEventListener('click', () => {category = button.dataset.storeFilter; updateStore();}));
  search.addEventListener('input', updateStore);
  sort.addEventListener('change', updateStore);
  document.querySelectorAll('[name="storePackage"]').forEach(input => input.addEventListener('change', () => {mode=input.value;updateStore();}));
  document.getElementById('storeReset').addEventListener('click', () => {category='all';search.value='';updateStore();search.focus();});
  updateStore();
});
