(() => {
  "use strict";

  const initialise = () => {
    const nav = document.getElementById("nav");
    const links = document.getElementById("primary-navigation");
    const menu = nav?.querySelector(".menu");
    const brand = nav?.querySelector(".brand");
    if (!nav || !links || !menu || !brand) return;

    const home = new URL(brand.getAttribute("href") || "/", window.location.href);
    home.hash = "";
    const homeLink = (hash) => `${home.href}#${hash}`;

    links.classList.add("nav-enhanced");
    links.innerHTML = `
      <a href="${homeLink("method")}">How it works</a>
      <a href="${homeLink("offer")}">Pricing</a>
      <a href="${homeLink("why")}">About</a>
      <a href="/insights/" data-nav-section="insights">Insights</a>
      <a href="${homeLink("contact")}">Contact</a>
    `;

    menu.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        const open = !links.classList.contains("is-open");
        links.classList.toggle("is-open", open);
        links.classList.remove("mobile-open");
        menu.setAttribute("aria-expanded", String(open));
      },
      true,
    );

    links.addEventListener("click", (event) => {
      if (!event.target.closest("a")) return;
      links.classList.remove("is-open", "mobile-open");
      menu.setAttribute("aria-expanded", "false");
    });

    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target)) {
        links.classList.remove("is-open", "mobile-open");
        menu.setAttribute("aria-expanded", "false");
      }
    });

    if (window.location.pathname.includes("/insights")) {
      links.querySelector('[data-nav-section="insights"]')?.classList.add("is-active");
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
