/* Laboratorio Vintage · PDP behavior */
(function(){
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Custom cursor
  const cursor = document.getElementById('cursor');
  if(cursor && !reduced && !matchMedia('(hover: none)').matches){
    let x = innerWidth/2, y = innerHeight/2, tx = x, ty = y;
    document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
    document.addEventListener('mouseleave', () => cursor.classList.add('is-hidden'));
    document.addEventListener('mouseenter', () => cursor.classList.remove('is-hidden'));
    (function loop(){
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      cursor.style.transform = 'translate(' + x + 'px,' + y + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button, .shot, .cta-primary, .cta-secondary').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });
  } else if(cursor){
    cursor.style.display = 'none';
  }

  // Scroll progress
  const bar = document.getElementById('progress');
  if(bar){
    const onScroll = () => {
      const h = document.documentElement;
      const s = h.scrollTop / (h.scrollHeight - h.clientHeight);
      bar.style.width = (Math.min(1, Math.max(0, s)) * 100).toFixed(2) + '%';
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Scroll reveal
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if(en.isIntersecting){
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));
})();
