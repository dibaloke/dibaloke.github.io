/* Particle illustration of a simplified Transformer. No external dependencies. */
(() => {
  'use strict';
  const host = document.querySelector('[data-transformer-particles]');
  if (!host) return;
  const stage = host.querySelector('.transformer-stage');
  const canvas = host.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const toggle = host.querySelector('[data-particle-toggle]');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const particles = [];
  let seed = 73;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  host.querySelectorAll('[data-particle-path]').forEach(path => {
    const length = path.getTotalLength();
    for (let d = 0; d < length; d += 5) {
      const p = path.getPointAtLength(d);
      particles.push({ homeX: p.x, homeY: p.y, x: p.x, y: p.y,
        vx: 0, vy: 0, phase: random() * Math.PI * 2,
        radius: 0.8 + random() * 0.7, accent: random() < 0.045 });
    }
  });
  let frame = 0;
  let previousTime = 0;
  let elapsed = 0;
  let paused = false;
  let visible = true;
  let pointer = null;
  let ripple = null;
  let width = 0;
  let height = 0;
  let scale = 1;
  let offsetX = 0;
  let offsetY = 0;

  function draw(time, animate) {
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);
    particles.forEach(p => {
      if (animate) {
        p.vx += (p.homeX - p.x) * 0.024;
        p.vy += (p.homeY - p.y) * 0.024;
        if (pointer) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 92) {
            const force = (1 - distance / 92) * 1.7;
            p.vx += dx / Math.max(distance, 1) * force;
            p.vy += dy / Math.max(distance, 1) * force;
          }
        }
        if (ripple) {
          const dx = p.homeX - ripple.x;
          const dy = p.homeY - ripple.y;
          const distance = Math.hypot(dx, dy);
          const wave = Math.abs(distance - (time - ripple.time) * 0.5);
          if (wave < 28) {
            const force = (1 - wave / 28) * 0.65;
            p.vx += dx / Math.max(distance, 1) * force;
            p.vy += dy / Math.max(distance, 1) * force;
          }
        }
        p.vx *= 0.87;
        p.vy *= 0.87;
        p.x += p.vx;
        p.y += p.vy;
      }
      const shimmer = animate ? Math.sin(time * 0.0018 + p.phase) : 0;
      const signal = animate && Math.abs(p.homeX - ((time * 0.1) % 1250 - 75)) < 30;
      ctx.globalAlpha = signal ? 1 : 0.45 + (shimmer + 1) * 0.17;
      ctx.fillStyle = p.accent || signal ? '#d18b54' : '#496ad0';
      ctx.beginPath();
      ctx.arc(p.x, p.y + (animate ? shimmer * 0.55 : 0), p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
    if (ripple && time - ripple.time > 2600) ripple = null;
  }

  function tick(now) {
    frame = 0;
    if (now - previousTime >= 1000 / 45) {
      // Limit updates after a suspended tab and keep simulation speed stable.
      elapsed += Math.min(now - previousTime || 22, 40);
      previousTime = now;
      draw(elapsed, true);
    }
    if (canAnimate()) frame = requestAnimationFrame(tick);
  }
  function canAnimate() {
    return !paused && !motion.matches && visible && !document.hidden;
  }
  function sync() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    previousTime = performance.now();
    toggle.disabled = motion.matches;
    toggle.textContent = motion.matches ? 'Reduced motion' : paused ? 'Resume animation' : 'Pause animation';
    toggle.setAttribute('aria-pressed', String(paused));
    if (canAnimate()) frame = requestAnimationFrame(tick);
    else draw(elapsed, false);
  }
  function resize() {
    const rect = stage.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    scale = Math.min(width / 1100, height / 300);
    offsetX = (width - 1100 * scale) / 2;
    offsetY = (height - 300 * scale) / 2;
    pointer = null;
    draw(elapsed, false);
  }
  function position(event) {
    const rect = stage.getBoundingClientRect();
    return { x: (event.clientX - rect.left - offsetX) / scale,
      y: (event.clientY - rect.top - offsetY) / scale };
  }
  stage.addEventListener('pointermove', event => {
    if (canAnimate() && event.pointerType !== 'touch') pointer = position(event);
  });
  stage.addEventListener('pointerleave', () => { pointer = null; });
  stage.addEventListener('pointerdown', event => {
    if (canAnimate()) ripple = { ...position(event), time: elapsed };
  });
  toggle.addEventListener('click', () => {
    paused = !paused;
    pointer = null;
    sync();
  });
  motion.addEventListener('change', () => {
    if (motion.matches) {
      pointer = null;
      ripple = null;
      particles.forEach(p => { p.x = p.homeX; p.y = p.homeY; p.vx = p.vy = 0; });
    }
    sync();
  });
  document.addEventListener('visibilitychange', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      sync();
    }).observe(stage);
  }
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(stage);
  else window.addEventListener('resize', resize);
  resize();
  host.classList.add('particles-ready');
  toggle.hidden = false;
  sync();
})();
