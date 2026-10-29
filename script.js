(function () {
  "use strict";
  var config = window.UNIQUE_FITNESS_CONFIG || {};
  var contact = config.contact || {};

  // The click-to-chat button is hidden until a real WhatsApp number is configured.
  var whatsappButton = document.getElementById("whatsapp-float");
  var whatsappNumber = String(contact.whatsappNumber || "").replace(/\D/g, "");
  if (whatsappButton && whatsappNumber) {
    var whatsappMessage = encodeURIComponent("Hi Unique Fitness! I found your website and would like to ask about membership options.");
    whatsappButton.href = "https://wa.me/" + whatsappNumber + "?text=" + whatsappMessage;
    whatsappButton.hidden = false;
  }
  var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var address = document.getElementById("address-text");
  if (address && contact.address) address.textContent = contact.address;
  var hours = document.getElementById("hours-text");
  if (hours && contact.openingHours) hours.textContent = contact.openingHours;
  var phoneText = document.getElementById("phone-text");
  if (phoneText && contact.phoneDisplay) {
    phoneText.textContent = "";
    if (contact.phoneE164) {
      var phoneLink = document.createElement("a");
      phoneLink.href = "tel:" + String(contact.phoneE164).replace(/[^+0-9]/g, "");
      phoneLink.textContent = contact.phoneDisplay;
      phoneText.appendChild(phoneLink);
    } else phoneText.textContent = contact.phoneDisplay;
  }

  var menuButton = document.querySelector(".menu-toggle");
  var nav = document.getElementById("primary-nav");
  function closeMenu(restoreFocus) {
    if (!menuButton || !nav) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    nav.classList.remove("is-open");
    if (restoreFocus) menuButton.focus();
  }
  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      var open = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      nav.classList.toggle("is-open", open);
    });
    nav.querySelectorAll("a").forEach(function (link) { link.addEventListener("click", function () { closeMenu(false); }); });
    document.addEventListener("keydown", function (event) { if (event.key === "Escape") closeMenu(true); });
    document.addEventListener("click", function (event) {
      if (nav.classList.contains("is-open") && !nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu(false);
    });
  }

  var copy = {
    muscle: { kicker: "SELECTED FOCUS / 01", title: "BUILD SIZE.<br>BUILD CONFIDENCE.", description: "A goal-led approach to resistance training, progressive overload and consistent recovery. Your starting point and plan should be tailored to your experience." },
    strength: { kicker: "SELECTED FOCUS / 02", title: "LIFT WITH<br>INTENTION.", description: "Build a consistent foundation around technique, training structure and gradual progression. Choose exercises and loads that suit your current ability." },
    fitness: { kicker: "SELECTED FOCUS / 03", title: "MAKE MOVEMENT<br>A HABIT.", description: "Create a practical routine that fits your life. Start from your current level and build consistency across strength, movement and recovery." },
    fatloss: { kicker: "SELECTED FOCUS / 04", title: "FOCUS ON<br>SUSTAINABLE HABITS.", description: "Pair regular activity with realistic, sustainable habits. Outcomes vary by individual; ask a qualified professional for advice tailored to your circumstances." }
  };
  document.querySelectorAll("[data-program]").forEach(function (button) {
    button.addEventListener("click", function () {
      var item = copy[button.getAttribute("data-program")];
      if (!item) return;
      document.querySelectorAll("[data-program]").forEach(function (other) {
        var selected = other === button;
        other.classList.toggle("is-selected", selected);
        other.setAttribute("aria-pressed", String(selected));
      });
      document.getElementById("program-kicker").textContent = item.kicker;
      document.getElementById("program-title").innerHTML = item.title;
      document.getElementById("program-description").textContent = item.description;
    });
  });

  document.querySelectorAll("[data-plan]").forEach(function (link) {
    link.addEventListener("click", function () {
      var select = document.getElementById("interest");
      if (select) select.value = link.getAttribute("data-plan") || "Membership pricing";
    });
  });

  if ("IntersectionObserver" in window && !reducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -25px 0px" });
    document.querySelectorAll(".reveal").forEach(function (element) { revealObserver.observe(element); });
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        document.querySelectorAll(".nav-link").forEach(function (link) {
          var active = link.getAttribute("href") === "#" + entry.target.id;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-25% 0px -65% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (section) { navObserver.observe(section); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (element) { element.classList.add("is-visible"); });
  }

  var form = document.querySelector('form[name="membership-enquiry"]');
  var status = document.getElementById("form-status");
  if (form) form.addEventListener("submit", function (event) {
    var host = window.location.hostname;
    var unsupportedHost = host.endsWith("github.io") || window.location.protocol === "file:" || host === "localhost";
    if (unsupportedHost) {
      event.preventDefault();
      if (status) {
        status.textContent = "Form processing is not available on GitHub Pages or local previews. Deploy on Netlify and enable Forms, or configure another form endpoint. See README.md.";
        status.focus();
      }
    }
  });

  var year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      var href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      var target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      if (target.id === "enquiry") window.setTimeout(function () {
        var field = document.getElementById("full-name");
        if (field) field.focus({ preventScroll: true });
      }, reducedMotion ? 0 : 300);
    });
  });
})();