/* All contact routes use the same public business configuration. */
function whatsappUrl(message) {
  const number = BUSINESS_CONFIG.whatsappNumber.replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
function inquiryMessage({ name, phone, service, notes }) {
  return `New Project Inquiry via Website\nName: ${name}\nPhone: ${phone}\nService: ${service}\nDetails: ${notes || 'Please help me choose the right solution.'}`;
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-whatsapp-trigger').forEach(link => {
    const message = BUSINESS_CONFIG.whatsappMessages[link.dataset.msgKey] || BUSINESS_CONFIG.whatsappMessages.general;
    link.href = whatsappUrl(message);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
  const toggle = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  function closeMenu() { drawer?.classList.remove('open'); toggle?.setAttribute('aria-expanded', 'false'); }
  toggle?.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.mobile-nav-link').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question')?.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('active'); other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });
      if (!wasActive) { item.classList.add('active'); item.querySelector('.faq-question').setAttribute('aria-expanded', 'true'); }
    });
  });
  const form = document.getElementById('projectInquiryForm');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const phoneInput = document.getElementById('clientPhone');
    const phone = phoneInput.value.trim();
    phoneInput.setCustomValidity(/^\+?[\d\s().-]{7,25}$/.test(phone) && phone.replace(/\D/g, '').length >= 7 ? '' : 'Please enter a valid phone number.');
    if (!form.reportValidity()) return;
    const message = inquiryMessage({name: document.getElementById('clientName').value.trim(), phone,
      service: document.getElementById('clientService').value, notes: document.getElementById('clientMessage').value.trim()});
    const fallback = document.getElementById('inquiryFallback');
    fallback.href = whatsappUrl(message); fallback.hidden = false;
    document.getElementById('inquiryStatus').textContent = 'Your message is ready. In WhatsApp, press Send to deliver it. Your details stay here until you clear them.';
    window.open(fallback.href, '_blank', 'noopener,noreferrer');
  });
  document.getElementById('clientPhone')?.addEventListener('input', event => event.target.setCustomValidity(''));
  const year = document.getElementById('copyrightYear'); if (year) year.textContent = new Date().getFullYear();
});
