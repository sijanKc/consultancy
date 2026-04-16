/* ============================================
   Generation Future Hub — Premium JavaScript
   Sakura Canvas, Custom Cursor, Scroll Reveals,
   Parallax, Counter Animations, Form Handling
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ══════════════════════════════════
  // 1. PRELOADER
  // ══════════════════════════════════
  const preloader = document.getElementById('preloader');

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.classList.add('loaded');
      setTimeout(() => {
        initScrollReveals();
        animateHeroCounters();
      }, 300);
    }, 2200);
  });

  // Fallback
  setTimeout(() => {
    if (!preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
      document.body.classList.add('loaded');
      initScrollReveals();
    }
  }, 5000);

  // ══════════════════════════════════
  // 2. CUSTOM CURSOR
  // ══════════════════════════════════
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.matchMedia('(pointer:fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    // Smooth follow for ring
    function animateCursor() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .course-card, .service-card, .testimonial-card, .feature-item, .journey-node, input, select, textarea');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
    });
  }

  // ══════════════════════════════════
  // 3. SAKURA CANVAS (Cherry Blossoms)
  // ══════════════════════════════════
  const canvas = document.getElementById('sakuraCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let petals = [];
    const PETAL_COUNT = 35;

    function resizeCanvas() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Petal {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * -1 - 20;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 0.8 + 0.3;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = Math.random() * 0.15 + 0.05;
        this.swingAmplitude = Math.random() * 1.5 + 0.5;
        this.swingSpeed = Math.random() * 0.02 + 0.01;
        this.swingOffset = Math.random() * Math.PI * 2;
        this.time = 0;
      }

      update() {
        this.time += 1;
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.time * this.swingSpeed + this.swingOffset) * this.swingAmplitude * 0.1;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        // Petal shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
          this.size * 0.3, -this.size * 0.5,
          this.size, -this.size * 0.3,
          this.size, 0
        );
        ctx.bezierCurveTo(
          this.size, this.size * 0.3,
          this.size * 0.3, this.size * 0.5,
          0, 0
        );
        ctx.fillStyle = 'rgba(255, 183, 197, 0.8)';
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize petals
    for (let i = 0; i < PETAL_COUNT; i++) {
      const petal = new Petal();
      petal.y = Math.random() * canvas.height; // Spread initially
      petals.push(petal);
    }

    function animateSakura() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateSakura);
    }

    animateSakura();
  }

  // ══════════════════════════════════
  // 4. NAVBAR
  // ══════════════════════════════════
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');
  const scrollTopBtn = document.getElementById('scrollTop');
  const navLinksAll = document.querySelectorAll('.nav-link:not(.cta-link)');

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        // Navbar scroll state
        navbar.classList.toggle('scrolled', window.scrollY > 60);

        // Scroll to top visibility
        scrollTopBtn.classList.toggle('visible', window.scrollY > 600);

        // Active section
        highlightActiveSection();

        // Parallax effects
        updateParallax();

        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Scroll to top
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ══════════════════════════════════
  // 5. MOBILE MENU
  // ══════════════════════════════════
  function toggleMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  }

  navToggle.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', toggleMenu);

  navLinksAll.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) toggleMenu();
    });
  });

  // ══════════════════════════════════
  // 6. ACTIVE SECTION HIGHLIGHT
  // ══════════════════════════════════
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveSection() {
    const scrollPos = window.scrollY + 250;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinksAll.forEach(l => l.classList.remove('active'));
        const match = document.querySelector(`.nav-link[href="#${id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }

  // ══════════════════════════════════
  // 7. SCROLL REVEAL ANIMATIONS
  // ══════════════════════════════════
  function initScrollReveals() {
    const revealUpElements = document.querySelectorAll('.reveal-up');
    const revealGroupElements = document.querySelectorAll('.reveal-group');

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay) || 0;
          setTimeout(() => {
            entry.target.classList.add('active');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealUpElements.forEach(el => revealObserver.observe(el));
    revealGroupElements.forEach(el => revealObserver.observe(el));
  }

  // ══════════════════════════════════
  // 8. PARALLAX EFFECTS
  // ══════════════════════════════════
  function updateParallax() {
    const scrollY = window.scrollY;

    // Hero orbs subtle parallax
    const orbs = document.querySelectorAll('.hero-orb');
    orbs.forEach((orb, i) => {
      const speed = 0.02 + i * 0.01;
      orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }

  // ══════════════════════════════════
  // 9. COUNTER ANIMATION
  // ══════════════════════════════════
  function animateHeroCounters() {
    const heroMetrics = document.querySelectorAll('.metric-val[data-count]');
    heroMetrics.forEach(el => animateCounter(el));
  }

  // Stats section counters
  const statCounters = document.querySelectorAll('.stat-val[data-count]');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statCounters.forEach(el => animateCounter(el));
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const statsBanner = document.querySelector('.stats-banner');
  if (statsBanner) statsObserver.observe(statsBanner);

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2400;
    const start = performance.now();

    function easeOutQuint(t) {
      return 1 - Math.pow(1 - t, 5);
    }

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuint(progress);
      const current = Math.floor(eased * target);

      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(tick);
  }

  // ══════════════════════════════════
  // 10. CONTACT FORM
  // ══════════════════════════════════
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const required = contactForm.querySelectorAll('[required]');

      required.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#E74C3C';
          isValid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      // Email check
      const emailField = contactForm.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
          emailField.style.borderColor = '#E74C3C';
          isValid = false;
        }
      }

      if (isValid) {
        const data = Object.fromEntries(new FormData(contactForm));
        console.log('Form submitted:', data);

        contactForm.style.display = 'none';
        formSuccess.classList.add('show');

        setTimeout(() => {
          contactForm.reset();
          contactForm.style.display = 'flex';
          formSuccess.classList.remove('show');
        }, 5000);
      }
    });

    // Reset error on input
    contactForm.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
      });
    });
  }

  // ══════════════════════════════════
  // 11. SMOOTH SCROLL
  // ══════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ══════════════════════════════════
  // 12. NAVBAR BRAND → TOP
  // ══════════════════════════════════
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ══════════════════════════════════
  // 13. AUTO YEAR
  // ══════════════════════════════════
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ══════════════════════════════════
  // 14. TILT EFFECT ON CARDS
  // ══════════════════════════════════
  if (window.matchMedia('(pointer:fine)').matches) {
    const tiltCards = document.querySelectorAll('.course-card, .service-card');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -3;
        const rotateY = (x - centerX) / centerX * 3;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ══════════════════════════════════
  // 15. MAGNETIC BUTTONS
  // ══════════════════════════════════
  if (window.matchMedia('(pointer:fine)').matches) {
    const magneticBtns = document.querySelectorAll('.btn-glow, .btn-white');

    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

});
