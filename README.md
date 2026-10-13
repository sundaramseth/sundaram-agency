# Sundaram Agency
Static business website deployed to https://sundaram-agency.vercel.app/.

## Customer journey
Visitors compare packages, explore working concept demos and prepare a WhatsApp enquiry. Every CTA uses `BUSINESS_CONFIG` in `js/config.js`. The form opens a prefilled message; the customer must press Send inside WhatsApp. It does not silently save to a database, and it preserves inputs if WhatsApp is blocked.

## Deploy
Vercel: import this repository, Framework Preset **Other**, root directory `.`, no build command, no output directory override. Pushes to the configured production branch deploy automatically. No server secrets belong in this static repo. Asset cache revalidates on new visits. Confirm the deployed commit in Vercel.

## Check
`node --test tests/contact.test.cjs`

Manually check phone/mobile width, all service CTA messages, form validation, FAQ, keyboard menu close, and WhatsApp fallback link. Do not press Send to a real number during testing without authorization. Submit the sitemap URL to your Search Console property after ownership verification.

## WhatsApp integration
The website works without the agent. The `whatsapp-ai-agent` service must be separately deployed and subscribed to the Meta Business phone number receiving these messages. Enable it only after a real test number exchange and human handoff check. Do not advertise calendar bookings as confirmed unless an actual calendar integration is added. The phone demonstrations are labelled illustrative.

## Business routine
Record incoming qualified chats in the business sheet, prepare a written scope/quote, get customer approval and deposit, deliver for review, collect balance, then record actual paid revenue and expenses. Do not record enquiry or package prices as earned revenue. No automated cold outreach is included.
