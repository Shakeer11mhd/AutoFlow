/* ═══════════════════════════════════════════════════
   NEXAFLOW — Main JavaScript
   Three.js 3D hero, cursor, animations, interactions
   ═══════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ─── CUSTOM CURSOR ───────────────────────────────────
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animateCursor() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .service-card, .work-card, .testi-card, input, select, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); follower.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); follower.classList.remove('hover'); });
  });

  // ─── NAV SCROLL ──────────────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ─── MOBILE MENU ─────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen = false;

  hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    hamburger.style.opacity = menuOpen ? '0.5' : '1';
  });

  window.closeMobile = function() {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    hamburger.style.opacity = '1';
  };

  // ─── THREE.JS HERO ───────────────────────────────────
  const canvas = document.getElementById('heroCanvas');
  if (canvas && window.THREE) {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 6);

    // Particle field
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const velocities = [];

    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      velocities.push({
        x: (Math.random() - 0.5) * 0.004,
        y: (Math.random() - 0.5) * 0.004,
        z: (Math.random() - 0.5) * 0.004
      });
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Wireframe torus
    const tGeo = new THREE.TorusGeometry(2.2, 0.6, 16, 80);
    const tMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      opacity: 0.08,
      transparent: true
    });
    const torus = new THREE.Mesh(tGeo, tMat);
    scene.add(torus);

    // Inner sphere
    const sGeo = new THREE.SphereGeometry(1.0, 32, 32);
    const sMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      opacity: 0.04,
      transparent: true
    });
    const sphere = new THREE.Mesh(sGeo, sMat);
    scene.add(sphere);

    // Connecting lines between nearby particles (sparse)
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = [];
    const sampleCount = 60;
    const pts = [];
    for (let i = 0; i < sampleCount; i++) {
      pts.push(new THREE.Vector3(positions[i*3], positions[i*3+1], positions[i*3+2]));
    }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i+1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < 2.5) {
          linePositions.push(pts[i].x, pts[i].y, pts[i].z);
          linePositions.push(pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, opacity: 0.08, transparent: true });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // Mouse influence
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', e => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    let clock = 0;
    function animate() {
      requestAnimationFrame(animate);
      clock += 0.005;

      // Animate particles
      const pos = pGeo.attributes.position.array;
      for (let i = 0; i < count; i++) {
        pos[i*3]   += velocities[i].x;
        pos[i*3+1] += velocities[i].y;
        pos[i*3+2] += velocities[i].z;

        const dist = Math.sqrt(pos[i*3]**2 + pos[i*3+1]**2 + pos[i*3+2]**2);
        if (dist > 15 || dist < 5) {
          velocities[i].x *= -1;
          velocities[i].y *= -1;
          velocities[i].z *= -1;
        }
      }
      pGeo.attributes.position.needsUpdate = true;

      // Rotate shapes
      torus.rotation.x = clock * 0.3 + mouseY * 0.2;
      torus.rotation.y = clock * 0.2 + mouseX * 0.2;
      sphere.rotation.y = clock * 0.5;
      sphere.rotation.x = clock * 0.3;
      particles.rotation.y = clock * 0.05 + mouseX * 0.05;
      particles.rotation.x = mouseY * 0.05;
      lines.rotation.y = clock * 0.05;

      // Camera subtle movement
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  // ─── COUNTER ANIMATION ───────────────────────────────
  const counters = document.querySelectorAll('.stat-num');
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;
    counters.forEach(counter => {
      const target = +counter.dataset.target;
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;

      const update = () => {
        current = Math.min(current + step, target);
        counter.textContent = Math.floor(current);
        if (current < target) requestAnimationFrame(update);
        else counter.textContent = target;
      };
      update();
    });
  }

  // ─── SCROLL REVEAL ───────────────────────────────────
  const revealEls = document.querySelectorAll(
    '.service-card, .step, .tech-item, .work-card, .testi-card, .price-card, .section-title, .section-label, .contact-info, .contact-form-wrap'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  // Add stagger delays to grid children
  ['.services-grid', '.tech-grid', '.work-grid', '.testi-grid', '.pricing-grid', '.process-steps'].forEach(selector => {
    const children = document.querySelectorAll(selector + ' > *');
    children.forEach((child, i) => {
      child.style.transitionDelay = (i * 0.1) + 's';
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.closest('.hero')) animateCounters();
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // Hero counter trigger on scroll
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const heroObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) animateCounters();
    }, { threshold: 0.3 });
    heroObs.observe(heroSection);
  }

  // Trigger counters immediately if visible on load
  setTimeout(animateCounters, 800);

  // ─── CONTACT FORM ────────────────────────────────────
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.style.opacity = '0.7';
      btn.querySelector('span').textContent = 'Sending...';

      setTimeout(() => {
        btn.style.display = 'none';
        success.style.display = 'block';
        form.reset();
      }, 1200);
    });
  }

  // ─── SMOOTH ACTIVE NAV ───────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 200) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
    });
  });

  // ─── TILT EFFECT on Cards ────────────────────────────
  document.querySelectorAll('.service-card, .work-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ─── MARQUEE PAUSE ON HOVER ──────────────────────────
  const marqueeInner = document.querySelector('.marquee-inner');
  if (marqueeInner) {
    marqueeInner.addEventListener('mouseenter', () => marqueeInner.style.animationPlayState = 'paused');
    marqueeInner.addEventListener('mouseleave', () => marqueeInner.style.animationPlayState = 'running');
  }

  console.log('%c⚡ NexaFlow', 'font-size:28px;font-weight:bold;color:#00e5ff;');
  console.log('%cAI Agents · Automation · Brand Design', 'color:#8899bb;font-size:14px;');

})();
