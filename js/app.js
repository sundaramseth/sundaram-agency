/**
 * Application Runtime Scripts
 * Handles dynamic WhatsApp link generation, mobile menu toggles,
 * FAQ accordions, and interactive quote form submission.
 */

document.addEventListener("DOMContentLoaded", () => {
  initWhatsAppButtons();
  initMobileNavigation();
  initFaqAccordion();
  initContactForm();
  setCurrentYear();
});

/**
 * Attaches dynamic WhatsApp URL with pre-filled messages to all CTA buttons
 */
function initWhatsAppButtons() {
  const number = BUSINESS_CONFIG.whatsappNumber;
  const triggers = document.querySelectorAll(".js-whatsapp-trigger");

  triggers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const msgKey = btn.getAttribute("data-msg-key") || "general";
      const customText = BUSINESS_CONFIG.whatsappMessages[msgKey] || BUSINESS_CONFIG.whatsappMessages.general;
      const encodedMsg = encodeURIComponent(customText);
      const whatsappUrl = `https://wa.me/\({number}?text=\){encodedMsg}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  });
}

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileNavigation() {
  const toggleBtn = document.getElementById("mobileMenuBtn");
  const drawer = document.getElementById("mobileDrawer");
  const navLinks = document.querySelectorAll(".mobile-nav-link");

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener("click", () => {
    drawer.classList.toggle("open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      drawer.classList.remove("open");
    });
  });
}

/**
 * FAQ Accordion Controller
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    if (!questionBtn) return;

    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      faqItems.forEach((other) => {
        other.classList.remove("active");
        const btn = other.querySelector(".faq-question");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });

      // Toggle clicked item
      if (!isActive) {
        item.classList.add("active");
        questionBtn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/**
 * Lead Form Handler
 * Validates frontend data and generates a clean WhatsApp pre-filled inquiry.
 * Also details how to connect to Formspree, Google Sheets, or backend API.
 */
function initContactForm() {
  const form = document.getElementById("projectInquiryForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("clientName").value.trim();
    const phone = document.getElementById("clientPhone").value.trim();
    const service = document.getElementById("clientService").value;
    const notes = document.getElementById("clientMessage").value.trim();

    if (!name || !phone) {
      alert("Please enter your name and phone number to proceed.");
      return;
    }

    // Construct structured WhatsApp message
    const formattedMessage = 
`*New Project Inquiry via Website*
• *Name:* ${name}
• *Phone:* ${phone}
• *Interested Service:* ${service}
• *Details:* ${notes ? notes : "None specified."}`;

    const whatsappUrl = `https://wa.me/\({BUSINESS_CONFIG.whatsappNumber}?text=\){encodeURIComponent(formattedMessage)}`;
    
    // Open WhatsApp to seal the conversion
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Clear form inputs
    form.reset();
  });
}

/**
 * Keeps the copyright year current
 */
function setCurrentYear() {
  const yearElement = document.getElementById("copyrightYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}