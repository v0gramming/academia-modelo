// ===== Scroll Reveal Animation (Intersection Observer) =====
document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.scroll-reveal');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(el => revealObserver.observe(el));

  // ===== Navbar Scroll Effect =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ===== Counter Animation =====
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el, target) {
    const duration = 2000;
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    };

    requestAnimationFrame(update);
  }

  // ===== Mobile Hamburger Menu =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navCta = document.querySelector('.nav-cta');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      navCta.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navCta.classList.remove('active');
      });
    });
  }

  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Interest Selector =====
  const interestOptions = document.querySelectorAll('.interest-option');
  const interestValue = document.getElementById('interestValue');
  const interestFeedback = document.getElementById('interestFeedback');

  interestOptions.forEach(option => {
    option.addEventListener('click', () => {
      interestOptions.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      interestValue.value = option.getAttribute('data-value');
      interestFeedback.textContent = `Selecionado: ${option.getAttribute('data-value')}`;
      interestFeedback.classList.add('show');
    });

    // Hover animation
    option.addEventListener('mouseenter', () => {
      if (!option.classList.contains('selected')) {
        option.style.transform = 'scale(1.05)';
      }
    });
    option.addEventListener('mouseleave', () => {
      if (!option.classList.contains('selected')) {
        option.style.transform = 'scale(1)';
      }
    });
  });

  // ===== Form Submission =====
  const form = document.getElementById('signupForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!interestValue.value) {
        interestFeedback.textContent = 'Por favor, selecione um interesse';
        interestFeedback.style.color = '#ff4d00';
        interestFeedback.classList.add('show');
        return;
      }
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Enviado!';
      btn.style.background = '#2ecc71';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        form.reset();
        interestOptions.forEach(opt => opt.classList.remove('selected'));
        interestFeedback.classList.remove('show');
      }, 3000);
    });
  }

  // ===== Active Nav Link on Scroll =====
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = '#ff4d00';
      }
    });
  });

  // ===== Scroll Progress Bar =====
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 3px;
    background: linear-gradient(to right, #ff4d00, #ff6a33);
    z-index: 1001; transition: width 0.1s ease; width: 0%;
  `;
  document.body.prepend(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  });

});
