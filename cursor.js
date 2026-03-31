document.addEventListener('DOMContentLoaded', function () {
  // Skip on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.id = 'cursor';
  document.body.appendChild(cursor);

  let mouseX = -100;
  let mouseY = -100;
  let curX = -100;
  let curY = -100;
  let rafId;

  // Smooth follow with lerp
  function lerp(a, b, n) {
    return a + (b - a) * n;
  }

  function animate() {
    curX = lerp(curX, mouseX, 0.18);
    curY = lerp(curY, mouseY, 0.18);
    cursor.style.transform = 'translate3d(' + (curX - 6) + 'px, ' + (curY - 6) + 'px, 0)';
    rafId = requestAnimationFrame(animate);
  }

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Expand on interactive elements
  const interactiveSelector = 'a, button, [role="button"], input, textarea, label';

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(interactiveSelector)) {
      cursor.classList.add('expanded');
    }
  });

  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(interactiveSelector)) {
      cursor.classList.remove('expanded');
    }
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', function () {
    cursor.style.opacity = '0';
  });

  document.addEventListener('mouseenter', function () {
    cursor.style.opacity = '1';
  });

  animate();
});
