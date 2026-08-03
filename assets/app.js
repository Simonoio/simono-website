(() => {
  "use strict";

  const nav = document.getElementById("nav");
  const menu = document.querySelector(".menu");
  const navLinks = document.getElementById("primary-navigation");
  const overlay = document.getElementById("bookingOverlay");
  const close = document.getElementById("bookingClose");
  const back = document.getElementById("bookingBack");
  const calContainer = document.getElementById("simono-cal-inline");
  const bookingTitle = document.getElementById("bookingTitle");
  const bookingSubtitle = document.getElementById("bookingSubtitle");
  const reassuranceTitle = document.getElementById("bookingReassuranceTitle");
  const reassuranceText = document.getElementById("bookingReassuranceText");
  let calLoaded = false;

  const bookingContent = {
    build: {
      title: "Build your outbound system with Simono",
      subtitle:
        "Design the foundations of a predictable outbound engine for your Cybersecurity, Cloud or Data business. We'll review your goals, ideal customers, messaging and the infrastructure needed to launch with clarity.",
      reassuranceTitle: "No sales pressure.",
      reassuranceText:
        "We'll explore how to build the right outbound foundation for your business and determine whether Simono is the right partner.",
    },
    scale: {
      title: "Scale your outbound system with Simono",
      subtitle:
        "Review your current outbound engine, identify growth bottlenecks and uncover opportunities to generate more qualified conversations. We'll focus on what is already working and where the greatest improvements can be made.",
      reassuranceTitle: "Bring your current outbound strategy.",
      reassuranceText:
        "We'll review your targeting, messaging, deliverability, campaign performance and meeting quality to identify the highest-impact opportunities for growth.",
    },
    default: {
      title: "Build your outbound system with Simono",
      subtitle:
        "Book a focused 30-minute conversation to review your goals, identify the highest-impact opportunities and determine whether Simono is the right partner.",
      reassuranceTitle: "No sales pressure.",
      reassuranceText:
        "No obligation. Just a focused conversation to understand your business and explore whether Simono can help.",
    },
  };

  const updateNav = () =>
    nav?.classList.toggle("scrolled", window.scrollY > 12);
  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });

  menu?.addEventListener("click", () => {
    const open = navLinks?.classList.toggle("is-open") ?? false;
    menu.setAttribute("aria-expanded", String(open));
    menu.textContent = open ? "×" : "☰";
  });

  navLinks?.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menu?.setAttribute("aria-expanded", "false");
      if (menu) menu.textContent = "☰";
    }),
  );

  const revealObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12 },
        )
      : null;

  document.querySelectorAll(".reveal").forEach((el) => {
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add("visible");
  });

  const loadCal = () => {
    if (calLoaded || !calContainer) return;
    calLoaded = true;
    const iframe = document.createElement("iframe");
    iframe.src =
      "https://cal.com/simon-lecat/build-your-outbound-system?embed=true&theme=dark";
    iframe.title = "Book a 30-minute conversation with Simono";
    iframe.loading = "lazy";
    iframe.style.cssText =
      "width:100%;min-height:700px;border:0;background:#151515;";
    iframe.allow = "camera; microphone; fullscreen; payment";
    calContainer.appendChild(iframe);
  };

  const setBookingContent = (type = "default") => {
    const content = bookingContent[type] || bookingContent.default;
    if (bookingTitle) bookingTitle.textContent = content.title;
    if (bookingSubtitle) bookingSubtitle.textContent = content.subtitle;
    if (reassuranceTitle)
      reassuranceTitle.textContent = content.reassuranceTitle;
    if (reassuranceText)
      reassuranceText.textContent = content.reassuranceText;
  };

  const openBooking = (event) => {
    event?.preventDefault();
    if (!overlay) return;
    const trigger = event?.currentTarget;
    setBookingContent(trigger?.dataset?.bookingType || "default");
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("booking-open");
    loadCal();
    close?.focus();
  };

  const closeBooking = () => {
    overlay?.classList.remove("is-open");
    overlay?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("booking-open");
  };

  document
    .querySelectorAll(".open-booking")
    .forEach((el) => el.addEventListener("click", openBooking));
  close?.addEventListener("click", closeBooking);
  back?.addEventListener("click", (event) => {
    event.preventDefault();

    const isInsightsPage = window.location.pathname.includes("/insights/");

    // On the homepage, “Back to Simono” simply closes the booking overlay.
    if (!isInsightsPage) {
      closeBooking();
      return;
    }

    // Use a real relative file path during local Safari testing, and / in production.
    const homeUrl =
      window.location.protocol === "file:"
        ? `${window.location.href.split("/insights/")[0]}/index.html`
        : "/";

    window.location.assign(homeUrl);
  });
  overlay?.addEventListener("click", (event) => {
    if (event.target === overlay) closeBooking();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeBooking();
  });
})();

document.addEventListener("click", function (event) {
  const link = event.target.closest("a");

  if (!link || typeof gtag !== "function") {
    return;
  }

  const href = link.getAttribute("href") || "";

  if (href.includes("cal.com")) {
    gtag("event", "book_call_click", {
      event_category: "conversion",
      event_label: link.textContent.trim() || "Cal.com link",
    });
  }

  if (href.startsWith("mailto:")) {
    gtag("event", "email_click", {
      event_category: "conversion",
      event_label: href.replace("mailto:", ""),
    });
  }

  if (href.includes("linkedin.com")) {
    gtag("event", "linkedin_click", {
      event_category: "engagement",
      event_label: href,
    });
  }
});

document.querySelectorAll(".open-booking").forEach((button) => {
  button.addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "book_call_click", {
        event_category: "conversion",
        event_label: button.textContent.trim() || "Booking overlay",
        booking_type: button.dataset.bookingType || "default",
      });
    }
  });
});
