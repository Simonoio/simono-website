(() => {
  "use strict";

  const initialise = () => {
    const nav = document.getElementById("nav");
    const links = document.getElementById("primary-navigation");
    const menu = nav?.querySelector(".menu");
    const brand = nav?.querySelector(".brand");
    const cta = nav?.querySelector(".nav-inner > a.button");
    if (!nav || !links || !menu || !brand || !cta) return;

    const home = new URL(brand.getAttribute("href") || "/", window.location.href);
    home.hash = "";
    const homeLink = (hash) => `${home.href}#${hash}`;
    const findHref = (label, fallback) =>
      [...links.querySelectorAll("a")].find((link) =>
        link.textContent.trim().toLowerCase().includes(label.toLowerCase()),
      )?.href || fallback;

    const paths = {
      diagnosis: homeLink("diagnosis"),
      method: homeLink("method"),
      framework: homeLink("framework"),
      why: homeLink("why"),
      solutions: findHref("Solutions", homeLink("offer")),
      insights: findHref("Insights", homeLink("insights")),
      contact: findHref("Contact", homeLink("contact")),
    };

    links.classList.add("nav-enhanced");
    links.innerHTML = `
      <div class="nav-approach">
        <button class="nav-approach-toggle" type="button" aria-expanded="false">Approach</button>
        <div class="nav-approach-menu">
          <a href="${paths.diagnosis}">Diagnosis</a>
          <a href="${paths.method}">Methodology</a>
          <a href="${paths.framework}">Framework</a>
          <a href="${paths.why}">Why Simono</a>
        </div>
      </div>
      <a href="${paths.solutions}">Solutions</a>
      <a href="${paths.insights}" data-nav-section="insights">Insights</a>
      <a href="${paths.contact}">Contact</a>
    `;

    cta.textContent = "Start a conversation";
    cta.href = paths.contact;
    cta.classList.remove("open-booking");
    cta.classList.add("nav-conversation");
    cta.removeAttribute("data-booking-type");

    const approach = links.querySelector(".nav-approach");
    const approachToggle = links.querySelector(".nav-approach-toggle");
    const setApproach = (open) => {
      approach.classList.toggle("is-open", open);
      approachToggle.setAttribute("aria-expanded", String(open));
    };

    approachToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      setApproach(!approach.classList.contains("is-open"));
    });

    menu.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        const open = !links.classList.contains("is-open");
        links.classList.toggle("is-open", open);
        links.classList.remove("mobile-open");
        menu.setAttribute("aria-expanded", String(open));
        if (!open) setApproach(false);
      },
      true,
    );

    links.addEventListener("click", (event) => {
      if (!event.target.closest("a")) return;
      links.classList.remove("is-open", "mobile-open");
      menu.setAttribute("aria-expanded", "false");
      setApproach(false);
    });

    document.addEventListener("click", (event) => {
      if (!approach.contains(event.target)) setApproach(false);
      if (!nav.contains(event.target)) {
        links.classList.remove("is-open", "mobile-open");
        menu.setAttribute("aria-expanded", "false");
      }
    });

    if (window.location.pathname.includes("/insights")) {
      links.querySelector('[data-nav-section="insights"]')?.classList.add("is-active");
    } else if (["diagnosis", "method", "framework", "why"].includes(window.location.hash.slice(1))) {
      approach.classList.add("is-active");
    }

    const compact = () => nav.classList.toggle("nav-compact", window.scrollY > 36);
    compact();
    window.addEventListener("scroll", compact, { passive: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialise);
  } else {
    initialise();
  }
})();
