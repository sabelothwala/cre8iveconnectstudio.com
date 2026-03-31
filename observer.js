document.addEventListener('DOMContentLoaded', function () {
  // Hero entrance animation
  var hero = document.querySelector('.section-hero');
  if (hero) {
    setTimeout(function () {
      hero.classList.add('hero-animated');
    }, 100);
  }

  // Scroll-reveal for all .reveal-item elements
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.08
  });

  document.querySelectorAll('.reveal-item').forEach(function (el) {
    revealObserver.observe(el);
  });
});
