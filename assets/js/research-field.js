/* Decorative research studies. These particles illustrate ideas, not research data. */
(() => {
  'use strict';

  const initialize = () => {
    const host = document.querySelector('[data-research-visual]');
    const canvas = host && host.querySelector('canvas');
    if (!canvas) return;

    let context;
    try {
      context = canvas.getContext('2d');
    } catch (_) {
      return;
    }
    if (!context) return;

    const modes = ['pathology', 'explainability', 'graphs'];
    const buttons = [...document.querySelectorAll('[data-research-mode]')];
    const pauseButton = document.querySelector('[data-particle-pause]');
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const selected = buttons.find(button => button.getAttribute('aria-pressed') === 'true');
    let mode = selected && modes.includes(selected.dataset.researchMode)
      ? selected.dataset.researchMode : 'pathology';
    let paused = motionPreference.matches || Boolean(pauseButton && pauseButton.getAttribute('aria-pressed') === 'true');
    let visible = true;
    let width = 0;
    let height = 0;
    let frameRequest = 0;
    let previousTime = 0;
    let elapsed = 0;
    let particles = [];
    let shapes = {};
    let graphOpacity = mode === 'graphs' ? 1 : 0;
    const nodeCount = 30;
    const connections = [];

    for (let index = 0; index < nodeCount; index += 1) {
      if (index % 6 < 5) connections.push([index, index + 1]);
      if (index < nodeCount - 6) connections.push([index, index + 6]);
      if (index < nodeCount - 7 && index % 3 === 0) connections.push([index, index + 7]);
    }

    // A fixed seed keeps the composition stable through resize and mode changes.
    const randomGenerator = seed => () => {
      let value = seed += 0x6D2B79F5;
      value = Math.imul(value ^ value >>> 15, value | 1);
      value ^= value + Math.imul(value ^ value >>> 7, value | 61);
      return ((value ^ value >>> 14) >>> 0) / 4294967296;
    };

    const makeShapes = count => {
      const random = randomGenerator(1736);
      const gaussian = () => Math.sqrt(-2 * Math.log(Math.max(random(), 0.00001))) * Math.cos(2 * Math.PI * random());
      const palette = [
        [111, 108, 246], [139, 116, 246], [87, 132, 240],
        [94, 162, 238], [182, 120, 229], [226, 141, 194]
      ];
      const cells = Array.from({ length: 18 }, (_, index) => {
        const angle = index * 2.39996;
        const radius = Math.sqrt((index + 0.5) / 18);
        return {
          x: Math.cos(angle) * radius * 0.91,
          y: Math.sin(angle) * radius * 0.7,
          z: gaussian() * 0.2,
          radius: 0.105 + random() * 0.07
        };
      });
      const result = { pathology: [], explainability: [], graphs: [] };

      for (let index = 0; index < count; index += 1) {
        const cell = cells[index % cells.length];
        const angle = random() * Math.PI * 2;
        const radius = cell.radius * (index % 5 === 0 ? Math.sqrt(random()) : 0.75 + random() * 0.5);
        const depth = gaussian() * 0.09;
        const cellColor = palette[random() < 0.13 ? 5 : Math.floor(random() * 5)];
        result.pathology.push({
          x: cell.x + Math.cos(angle) * radius,
          y: cell.y + Math.sin(angle) * radius * 0.85,
          z: cell.z + depth,
          color: cellColor
        });

        const x = random() * 2 - 1;
        const ribbon = index % 3;
        const saliency = Math.exp(-Math.pow((x - 0.2) * 2.5, 2));
        result.explainability.push({
          x,
          y: Math.sin(x * 3.6 + ribbon * 0.8) * 0.33 + (ribbon - 1) * 0.22 + gaussian() * 0.055,
          z: Math.cos(x * 2.8 + ribbon) * 0.33 + gaussian() * 0.1,
          color: palette[random() < saliency * 0.4 ? 5 : ribbon]
        });

        const fieldAngle = random() * Math.PI * 2;
        const fieldRadius = Math.sqrt(random());
        const fieldX = Math.cos(fieldAngle) * fieldRadius;
        const fieldY = Math.sin(fieldAngle) * fieldRadius;
        result.graphs.push({
          x: index < nodeCount ? (index % 6 - 2.5) * 0.36 + gaussian() * 0.04 : fieldX,
          y: index < nodeCount ? (Math.floor(index / 6) - 2) * 0.29 + gaussian() * 0.04 : fieldY * 0.66 + Math.sin(fieldX * 3) * 0.1,
          z: index < nodeCount ? 0.3 : gaussian() * 0.25,
          color: palette[index < nodeCount ? 3 : (random() < 0.07 ? 4 : 2)]
        });
      }
      return result;
    };

    const snapToMode = () => {
      particles.forEach((particle, index) => {
        const target = shapes[mode][index];
        particle.x = target.x;
        particle.y = target.y;
        particle.z = target.z;
        particle.color = target.color.slice();
      });
      graphOpacity = mode === 'graphs' ? 1 : 0;
    };

    const draw = () => {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      const yaw = Math.sin(elapsed * 0.12) * 0.14 - 0.06;
      const sine = Math.sin(yaw);
      const cosine = Math.cos(yaw);
      const scaleX = width * 0.405;
      const scaleY = height * 0.47;

      particles.forEach(particle => {
        const drift = elapsed * particle.speed + particle.phase;
        const x = particle.x + Math.sin(drift) * 0.014;
        const y = particle.y + Math.cos(drift * 0.8) * 0.012;
        const rotatedX = x * cosine + particle.z * sine;
        const rotatedZ = particle.z * cosine - x * sine;
        const perspective = 1 / (1 - rotatedZ * 0.19);
        particle.screenX = width * 0.5 + rotatedX * scaleX * perspective;
        particle.screenY = height * 0.5 + y * scaleY * perspective;
        particle.depth = Math.max(0.3, Math.min(1, 0.67 + rotatedZ * 0.4));
      });

      if (graphOpacity > 0.01) {
        context.strokeStyle = `rgba(121, 150, 243, ${graphOpacity * 0.22})`;
        context.lineWidth = 0.7;
        context.beginPath();
        connections.forEach(([from, to]) => {
          context.moveTo(particles[from].screenX, particles[from].screenY);
          context.lineTo(particles[to].screenX, particles[to].screenY);
        });
        context.stroke();
      }

      particles.forEach((particle, index) => {
        const color = particle.color;
        const nodeSize = index < nodeCount ? graphOpacity * 1.2 : 0;
        const radius = particle.size + nodeSize;
        context.fillStyle = `rgba(${Math.round(color[0])}, ${Math.round(color[1])}, ${Math.round(color[2])}, ${particle.depth})`;
        context.beginPath();
        context.arc(particle.screenX, particle.screenY, radius, 0, Math.PI * 2);
        context.fill();
      });
    };

    const canAnimate = () => !paused && visible && !document.hidden && width > 0 && height > 0;

    const animate = timestamp => {
      frameRequest = 0;
      if (!canAnimate()) return;
      const delta = previousTime ? Math.min((timestamp - previousTime) / 1000, 0.05) : 1 / 60;
      previousTime = timestamp;
      elapsed += delta;
      const blend = 1 - Math.exp(-delta * 3.2);
      particles.forEach((particle, index) => {
        const target = shapes[mode][index];
        particle.x += (target.x - particle.x) * blend;
        particle.y += (target.y - particle.y) * blend;
        particle.z += (target.z - particle.z) * blend;
        for (let channel = 0; channel < 3; channel += 1) {
          particle.color[channel] += (target.color[channel] - particle.color[channel]) * blend;
        }
      });
      graphOpacity += ((mode === 'graphs' ? 1 : 0) - graphOpacity) * blend;
      draw();
      frameRequest = window.requestAnimationFrame(animate);
    };

    const updatePlayback = () => {
      if (canAnimate()) {
        if (!frameRequest) {
          previousTime = 0;
          frameRequest = window.requestAnimationFrame(animate);
        }
      } else if (frameRequest) {
        window.cancelAnimationFrame(frameRequest);
        frameRequest = 0;
        previousTime = 0;
      }
    };

    const updatePauseControl = () => {
      if (!pauseButton) return;
      const label = paused ? 'Play animation' : 'Pause animation';
      pauseButton.setAttribute('aria-pressed', String(paused));
      pauseButton.setAttribute('aria-label', label);
      pauseButton.setAttribute('title', label);
      const text = pauseButton.querySelector('[data-particle-pause-label]');
      if (text) text.textContent = label;
      else if (!pauseButton.children.length) pauseButton.textContent = label;
      const icon = pauseButton.querySelector('[data-particle-pause-icon], span[aria-hidden="true"]');
      if (icon) {
        icon.dataset.state = paused ? 'play' : 'pause';
        icon.textContent = '';
      }
    };

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      width = Math.max(0, bounds.width);
      height = Math.max(0, bounds.height);
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = window.innerWidth < 720 ? 480 : 1050;
      if (particles.length !== count) {
        shapes = makeShapes(count);
        const random = randomGenerator(638);
        particles = Array.from({ length: count }, () => ({
          phase: random() * Math.PI * 2,
          speed: 0.3 + random() * 0.45,
          size: 0.65 + random() * 0.75
        }));
        snapToMode();
      }
      draw();
      updatePlayback();
    };

    buttons.forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.researchMode === mode));
      button.addEventListener('click', () => {
        if (!modes.includes(button.dataset.researchMode)) return;
        mode = button.dataset.researchMode;
        buttons.forEach(control => control.setAttribute('aria-pressed', String(control.dataset.researchMode === mode)));
        if (paused) {
          snapToMode();
          draw();
        }
        updatePlayback();
      });
    });

    if (pauseButton) {
      pauseButton.addEventListener('click', () => {
        paused = !paused;
        updatePauseControl();
        updatePlayback();
      });
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        updatePlayback();
      });
      observer.observe(host);
    }
    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(resize);
      observer.observe(host);
    }
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', updatePlayback);
    const onMotionPreferenceChange = event => {
      if (!event.matches) return;
      paused = true;
      updatePauseControl();
      updatePlayback();
      draw();
    };
    if (motionPreference.addEventListener) motionPreference.addEventListener('change', onMotionPreferenceChange);
    else if (motionPreference.addListener) motionPreference.addListener(onMotionPreferenceChange);

    updatePauseControl();
    resize();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
