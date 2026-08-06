document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuButton = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-site-nav]");

  if (menuButton && nav) {
    const closeMenu = () => {
      nav.classList.remove("active");
      body.classList.remove("nav-open");
      menuButton.setAttribute("aria-expanded", "false");
    };

    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("active");
      body.classList.toggle("nav-open", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  document.querySelectorAll("[data-faq-button]").forEach((button) => {
    const answerId = button.getAttribute("aria-controls");
    const answer = answerId ? document.getElementById(answerId) : null;

    if (!answer) return;

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      answer.classList.toggle("open", !isOpen);
    });
  });

  const contactForm = document.querySelector("[data-contact-form]");

  if (contactForm) {
    const status = contactForm.querySelector("[data-form-status]");
    const submit = contactForm.querySelector("button[type='submit']");

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const required = ["name", "email", "user_type", "message"];
      const missing = required.filter((key) => !String(formData.get(key) || "").trim());

      if (missing.length) {
        status.textContent = "Please complete the required fields before sending.";
        status.className = "form-status error";
        contactForm.querySelector(`[name="${missing[0]}"]`)?.focus();
        return;
      }

      const email = String(formData.get("email") || "");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = "Please enter a valid email address.";
        status.className = "form-status error";
        contactForm.querySelector("[name='email']")?.focus();
        return;
      }

      submit.disabled = true;
      status.textContent = "Opening your email client with the prepared message...";
      status.className = "form-status";

      const subject = encodeURIComponent(formData.get("subject") || "Agent Flux website inquiry");
      const bodyLines = [
        `Name: ${formData.get("name")}`,
        `Email: ${formData.get("email")}`,
        `Phone: ${formData.get("phone") || "Not provided"}`,
        `Company: ${formData.get("company") || "Not provided"}`,
        `I am: ${formData.get("user_type")}`,
        "",
        String(formData.get("message") || "")
      ];

      window.location.href = `mailto:mansoor@agentflux.us?subject=${subject}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

      window.setTimeout(() => {
        status.textContent = "Your email client should now have a prepared message. You can also email mansoor@agentflux.us directly.";
        status.className = "form-status success";
        submit.disabled = false;
      }, 700);
    });
  }
});
