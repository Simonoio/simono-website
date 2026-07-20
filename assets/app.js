(() => {
  'use strict';

  const nav = document.getElementById('nav');
  const menu = document.querySelector('.menu');
  const navLinks = document.getElementById('primary-navigation');
  const overlay = document.getElementById('bookingOverlay');
  const close = document.getElementById('bookingClose');
  const back = document.getElementById('bookingBack');
  const calContainer = document.getElementById('simono-cal-inline');
  let calLoaded = false;

  const updateNav = () => nav?.classList.toggle('scrolled', window.scrollY > 12);
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  menu?.addEventListener('click', () => {
    const open = navLinks?.classList.toggle('is-open') ?? false;
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? '×' : '☰';
  });

  navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    menu?.setAttribute('aria-expanded', 'false');
    if (menu) menu.textContent = '☰';
  }));

  const revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 })
    : null;

  document.querySelectorAll('.reveal').forEach((el) => {
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add('visible');
  });

  const loadCal = () => {
    if (calLoaded || !calContainer) return;
    calLoaded = true;
    const iframe = document.createElement('iframe');
    iframe.src = 'https://cal.com/simon-lecat/build-your-outbound-system?embed=true&theme=dark';
    iframe.title = 'Book a strategy call with Simon';
    iframe.loading = 'lazy';
    iframe.style.cssText = 'width:100%;min-height:700px;border:0;background:#151515;';
    iframe.allow = 'camera; microphone; fullscreen; payment';
    calContainer.appendChild(iframe);
  };

  const openBooking = (event) => {
    event?.preventDefault();
    if (!overlay) return;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('booking-open');
    loadCal();
    close?.focus();
  };

  const closeBooking = () => {
    overlay?.classList.remove('is-open');
    overlay?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('booking-open');
  };

  document.querySelectorAll('.open-booking').forEach((el) => el.addEventListener('click', openBooking));
  close?.addEventListener('click', closeBooking);
  back?.addEventListener('click', closeBooking);
  overlay?.addEventListener('click', (event) => { if (event.target === overlay) closeBooking(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeBooking(); });
})();
