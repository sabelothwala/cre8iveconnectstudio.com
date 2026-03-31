document.addEventListener('DOMContentLoaded', function () {
  var nav = document.getElementById('site-nav');
  var toggle = document.querySelector('.nav-toggle');
  var overlay = document.querySelector('.nav-overlay');
  var overlayLinks = document.querySelectorAll('.nav-overlay-links a');
  var isOpen = false;

  // Sticky scroll behavior
  var scrollThreshold = 80;

  function onScroll() {
    if (window.scrollY > scrollThreshold) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run on init

  // Mobile menu toggle
  function openMenu() {
    isOpen = true;
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    isOpen = false;
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (toggle && overlay) {
    toggle.addEventListener('click', function () {
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on overlay link click
    overlayLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    });
  }

  // Active link highlight on scroll
  var sections = document.querySelectorAll('section[id]');
  var navLinksAll = document.querySelectorAll('.nav-links a, .nav-overlay-links a');

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinksAll.forEach(function (link) {
          var href = link.getAttribute('href');
          if (href === '#' + id) {
            link.style.color = 'var(--color-text)';
          } else {
            link.style.color = '';
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });
});
