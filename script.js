/**
 * HARTHIKA V — MINIMAL & PROFESSIONAL PORTFOLIO
 * Clean Vanilla JavaScript
 * 
 * Features:
 * 1. Single-run Typewriter Animation for "HARTHIKA V"
 * 2. Dynamic Role Cycling for Subtitle
 * 3. Header Scroll States & Top Progress Indicator
 * 4. Active Navigation Link Highlighting & Smooth Scrolling
 * 5. Mobile Hamburger Navigation Drawer
 * 6. Light / Dark Theme Switcher with LocalStorage
 * 7. Functional Project Category Filtering & Counter
 * 8. Interactive Project Details Modal
 * 9. Truthful Contact Form Validation & Mailto Generator
 * 10. Resume Download Verification & Toast Notification
 * 11. Subtle IntersectionObserver Scroll Reveals
 * 12. Dynamic Footer Copyright Year
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Accessibility check for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. Hero Name Typewriter Animation (Target: "HARTHIKA V" only)
     ========================================================================== */
  const heroNameText = document.getElementById('hero-name-text');
  const heroNameCursor = document.getElementById('hero-name-cursor');
  const targetHeroName = "HARTHIKA V";
  let hasTypedHeroName = false;

  const startHeroNameTypewriter = () => {
    if (hasTypedHeroName || !heroNameText) return;
    hasTypedHeroName = true;

    // Respect reduced-motion accessibility preference
    if (prefersReducedMotion) {
      heroNameText.innerHTML = 'HARTHIKA <span class="serif-accent">V</span>';
      if (heroNameCursor) heroNameCursor.style.display = 'none';
      return;
    }

    let charIndex = 0;
    const typingSpeed = 120; // 120ms per character

    const typeNextChar = () => {
      if (charIndex < targetHeroName.length) {
        charIndex++;
        const currentSlice = targetHeroName.substring(0, charIndex);

        if (charIndex === targetHeroName.length) {
          // Final letter V has the elegant serif accent
          heroNameText.innerHTML = 'HARTHIKA <span class="serif-accent">V</span>';
        } else if (currentSlice.endsWith(' ')) {
          heroNameText.innerHTML = currentSlice.slice(0, -1) + '&nbsp;';
        } else {
          heroNameText.textContent = currentSlice;
        }

        setTimeout(typeNextChar, typingSpeed);
      } else {
        // Full name is now visible permanently
        // Stop cursor blinking and smoothly fade it out
        if (heroNameCursor) {
          setTimeout(() => {
            heroNameCursor.classList.add('cursor-finished');
          }, 400);
        }
      }
    };

    typeNextChar();
  };

  // Trigger typewriter promptly on load
  setTimeout(startHeroNameTypewriter, 150);

  /* ==========================================================================
     2. Hero Role Typing Animation (Cycling subtitle roles)
     ========================================================================== */
  const typingTextElement = document.getElementById('typing-text');
  const roles = [
    'Aspiring Full-Stack Developer',
    'Web Developer',
    'Creative Problem Solver'
  ];

  let roleIndex = 0;
  let charPos = 0;
  let isDeleting = false;
  let typingDelay = 100;

  const handleRoleTypewriter = () => {
    if (!typingTextElement || prefersReducedMotion) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charPos--;
      typingTextElement.textContent = currentRole.substring(0, charPos);
      typingDelay = 45;
    } else {
      charPos++;
      typingTextElement.textContent = currentRole.substring(0, charPos);
      typingDelay = 95;
    }

    if (!isDeleting && charPos === currentRole.length) {
      // Pause at full word
      typingDelay = 2200;
      isDeleting = true;
    } else if (isDeleting && charPos === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingDelay = 400;
    }

    setTimeout(handleRoleTypewriter, typingDelay);
  };

  if (!prefersReducedMotion) {
    setTimeout(handleRoleTypewriter, 1400);
  }

  /* ==========================================================================
     3. Scroll Progress Indicator & Header Scrolled State
     ========================================================================== */
  const scrollProgress = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  const onScrollHandler = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // Progress bar
    if (scrollProgress && scrollHeight > 0) {
      const progressPercent = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.width = `${progressPercent}%`;
    }

    // Header styling
    if (navbar) {
      if (scrollTop > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button
    if (backToTopBtn) {
      if (scrollTop > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', onScrollHandler, { passive: true });
  onScrollHandler();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     4. Active Navigation Link Highlighting on Scroll
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightActiveNav = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const headerOffset = 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - headerOffset;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightActiveNav, { passive: true });

  /* ==========================================================================
     5. Mobile Hamburger Navigation Drawer
     ========================================================================== */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    const toggleMobileMenu = () => {
      const isOpen = navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    const closeMobileMenu = () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Close when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }

  /* ==========================================================================
     6. Theme Switcher (Dark / Light) with LocalStorage
     ========================================================================== */
  const themeToggle = document.getElementById('theme-toggle');

  const getSavedTheme = () => {
    const saved = localStorage.getItem('harthika_portfolio_theme');
    if (saved) return saved;
    return 'dark'; // Dark is default
  };

  const applyTheme = (theme) => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('harthika_portfolio_theme', theme);
  };

  applyTheme(getSavedTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme') || 'dark';
      const target = current === 'dark' ? 'light' : 'dark';
      applyTheme(target);
    });
  }

  /* ==========================================================================
     7. Project Category Filters
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const projectCards = document.querySelectorAll('.project-clean-card');
  const emptyFilterState = document.getElementById('filter-empty-state');
  const resetFilterBtn = document.getElementById('reset-filter-btn');

  const executeFilter = (category) => {
    let visibleCount = 0;

    projectCards.forEach(card => {
      const cardCat = card.getAttribute('data-category');

      if (category === 'all' || cardCat === category) {
        card.style.display = 'flex';
        card.style.opacity = '1';
        visibleCount++;
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });

    filterBtns.forEach(btn => {
      const isSelected = btn.getAttribute('data-filter') === category;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    if (emptyFilterState) {
      emptyFilterState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-filter');
      executeFilter(cat);
    });
  });

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      executeFilter('all');
    });
  }

  /* ==========================================================================
     8. Project Details Modal
     ========================================================================== */
  const projectDetailsDatabase = {
    'pickbite': {
      title: 'PickBite: Food Decision Wheel',
      category: 'Web Development',
      githubUrl: 'https://github.com/harthikaanchan19',
      description: 'A food decision web application with food categories, an interactive spinning wheel, food items, and an admin dashboard.',
      technologies: ['React', 'Firebase Realtime Database', 'Firebase Authentication', 'CSS Animations', 'JavaScript'],
      features: [
        'Interactive customizable spinning wheel with dynamic random selection',
        'Categorized food item directory with instant search and filtering',
        'Administrative dashboard for adding food items and customizing categories',
        'Mobile-friendly responsive user interface designed for swift food decisions'
      ],
      note: 'Built as an interactive frontend & cloud-integrated web application.'
    },
    'laptop-price': {
      title: 'Laptop Price Prediction',
      category: 'Machine Learning',
      githubUrl: 'https://github.com/harthikaanchan19',
      description: 'A machine-learning project that predicts laptop prices based on specifications such as brand, RAM, processor, storage, and graphics.',
      technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib / Seaborn'],
      features: [
        'Feature engineering on brand, RAM capacity, CPU frequency, storage types (SSD/HDD), and GPU tier',
        'Data cleaning, missing value handling, and categorical feature encoding',
        'Model training using linear and ensemble regression algorithms with minimized RMSE',
        'Exploratory data analysis highlighting key pricing drivers in consumer electronics'
      ],
      note: 'Developed for predictive data analysis and practical machine learning.'
    },
    'karrchu': {
      title: 'KARRCHU: Expense Tracker',
      category: 'Android / Mobile Development',
      githubUrl: 'https://github.com/harthikaanchan19',
      description: 'An expense-tracking application for recording expenses and viewing summaries, charts, and group-wise expenses.',
      technologies: ['React Native', 'Firebase Firestore', 'JavaScript / ES6+', 'Mobile UI/UX'],
      features: [
        'Real-time transaction logging with category tagging and date timestamps',
        'Visual expense summaries, interactive category charts, and budget limits',
        'Group-wise expense tracking for shared household or group expenditures',
        'Offline capability with automated cloud synchronization upon reconnection'
      ],
      note: 'Developed for mobile Android devices.'
    },
    'coffee-shop': {
      title: 'Coffee Shop Website',
      category: 'Web Development',
      githubUrl: 'https://github.com/harthikaanchan19',
      description: 'A coffee shop website with product displays, ordering functionality, and user and admin features.',
      technologies: ['React', 'Supabase (PostgreSQL & Auth)', 'CSS3', 'JavaScript'],
      features: [
        'Curated product showcase featuring single-origin roasts, coffee varieties, and brewing accessories',
        'Interactive shopping cart and order-placement flow simulation',
        'Supabase backend authentication with relational PostgreSQL database storage',
        'Administrative interface for managing menu items and tracking customer orders'
      ],
      note: 'Full-stack web application showcasing database schema and auth integration.'
    },
    'quickdoc': {
      title: 'QuickDoc: Doctor Appointment Booking App',
      category: 'Android Development',
      githubUrl: 'https://github.com/harthikaanchan19',
      description: 'An Android application for doctor appointment booking and appointment management, including doctor-management features for administrators.',
      technologies: ['Java', 'Android SDK', 'XML Layouts', 'Firebase Realtime Database / Auth'],
      features: [
        'Specialty-based medical professional directory with live appointment slot booking',
        'Patient appointment status tracking with confirmation feedback',
        'Administrative module for registering practitioners, configuring visiting schedules, and managing queues',
        'Native Android interface strictly adhering to clean Material Design standards'
      ],
      note: 'Native Android application built with Java and XML.'
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalBody = document.getElementById('modal-body');

  const openProjectModal = (projectId) => {
    const data = projectDetailsDatabase[projectId];
    if (!data || !projectModal) return;

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;

    const techBadges = data.technologies.map(t => `<span class="tech-tag">${t}</span>`).join(' ');
    const featureItems = data.features.map(f => `<li>${f}</li>`).join('');

    modalBody.innerHTML = `
      <div class="modal-section">
        <h4 class="modal-subheading">Overview</h4>
        <p class="modal-text">${data.description}</p>
      </div>

      <div class="modal-section">
        <h4 class="modal-subheading">Key Features</h4>
        <ul class="modal-feature-list">
          ${featureItems}
        </ul>
      </div>

      <div class="modal-section">
        <h4 class="modal-subheading">Technologies Used</h4>
        <div class="modal-tags-container">
          ${techBadges}
        </div>
      </div>

      <div class="modal-section modal-note-box">
        <p><strong>Architecture Note:</strong> ${data.note}</p>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Attach modal trigger to buttons
  document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = btn.getAttribute('data-project');
      openProjectModal(pId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
      }
    });
  }

  /* ==========================================================================
     8.1 Project GitHub Link Visibility Synchronizer
     Shows "View GitHub" button only when a real repository URL exists.
     Hides the button when no repository URL exists (preventing invented links).
     ========================================================================== */
  const syncProjectGitHubButtons = () => {
    document.querySelectorAll('.project-clean-card').forEach(card => {
      const pId = card.getAttribute('data-project-id');
      const githubBtn = card.querySelector('.github-repo-btn');
      if (!githubBtn) return;

      const projectData = projectDetailsDatabase[pId];
      const validUrl = (projectData && projectData.githubUrl) || githubBtn.getAttribute('href');

      if (validUrl && validUrl.trim() !== '' && validUrl !== '#') {
        githubBtn.href = validUrl;
        githubBtn.style.display = 'inline-flex';
        githubBtn.removeAttribute('hidden');
        githubBtn.classList.remove('is-hidden');
      } else {
        githubBtn.removeAttribute('href');
        githubBtn.style.display = 'none';
        githubBtn.setAttribute('hidden', '');
        githubBtn.classList.add('is-hidden');
      }
    });
  };

  syncProjectGitHubButtons();

  /* ==========================================================================
     9. Truthful Contact Form Validation & Mailto Action
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const formStatus = document.getElementById('form-status');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (input, errorId, validatorFn) => {
    const errorEl = document.getElementById(errorId);
    const isValid = validatorFn(input.value.trim());

    if (!isValid) {
      input.classList.add('input-error');
      if (errorEl) errorEl.style.display = 'block';
      return false;
    } else {
      input.classList.remove('input-error');
      if (errorEl) errorEl.style.display = 'none';
      return true;
    }
  };

  if (nameInput) nameInput.addEventListener('blur', () => validateField(nameInput, 'name-error', val => val.length >= 2));
  if (emailInput) emailInput.addEventListener('blur', () => validateField(emailInput, 'email-error', val => emailRegex.test(val)));
  if (subjectInput) subjectInput.addEventListener('blur', () => validateField(subjectInput, 'subject-error', val => val.length >= 3));
  if (messageInput) messageInput.addEventListener('blur', () => validateField(messageInput, 'message-error', val => val.length >= 10));

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, 'name-error', val => val.length >= 2);
      const isEmailValid = validateField(emailInput, 'email-error', val => emailRegex.test(val));
      const isSubjectValid = validateField(subjectInput, 'subject-error', val => val.length >= 3);
      const isMessageValid = validateField(messageInput, 'message-error', val => val.length >= 10);

      if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
        if (formStatus) {
          formStatus.style.display = 'block';
          formStatus.className = 'form-status-msg status-error';
          formStatus.textContent = 'Please fill out all required fields correctly before sending.';
        }
        return;
      }

      const name = encodeURIComponent(nameInput.value.trim());
      const email = encodeURIComponent(emailInput.value.trim());
      const subject = encodeURIComponent(subjectInput.value.trim());
      const body = encodeURIComponent(`From: ${decodeURIComponent(name)} (${decodeURIComponent(email)})\n\nMessage:\n${messageInput.value.trim()}`);

      const mailtoUrl = `mailto:harthikaanchananchan@gmail.com?subject=${subject}&body=${body}`;

      if (formStatus) {
        formStatus.style.display = 'block';
        formStatus.className = 'form-status-msg status-success';
        formStatus.innerHTML = `<strong>Ready to send:</strong> Opening your default email client to deliver your message to <strong>harthikaanchananchan@gmail.com</strong>.`;
      }

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 500);
    });
  }

  /* ==========================================================================
     10. Resume Download Verification & Toast Notification
     ========================================================================== */
  const navResumeBtn = document.getElementById('nav-resume-btn');
  const aboutResumeBtn = document.getElementById('about-resume-btn');
  const toastContainer = document.getElementById('toast-notification');

  const showToast = (message, isError = false) => {
    if (!toastContainer) return;

    toastContainer.textContent = message;
    toastContainer.className = `toast-container active ${isError ? 'toast-error' : 'toast-success'}`;

    setTimeout(() => {
      toastContainer.classList.remove('active');
    }, 4500);
  };

  const handleResumeDownload = () => {
    const resumePath = 'assets/resume.pdf';

    fetch(resumePath, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          const a = document.createElement('a');
          a.href = resumePath;
          a.download = 'Harthika_V_Resume.pdf';
          a.target = '_blank';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          showToast('Resume download initiated (Harthika_V_Resume.pdf)');
        } else {
          showToast('Resume file is temporarily unavailable. Please email harthikaanchananchan@gmail.com for a copy.', true);
        }
      })
      .catch(() => {
        // Fallback: direct window open
        window.open(resumePath, '_blank');
        showToast('Opening resume in a new tab.');
      });
  };

  if (navResumeBtn) navResumeBtn.addEventListener('click', handleResumeDownload);
  if (aboutResumeBtn) aboutResumeBtn.addEventListener('click', handleResumeDownload);

  /* ==========================================================================
     11. Subtle IntersectionObserver Scroll Reveals
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-fade');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  /* ==========================================================================
     12. Dynamic Copyright Year
     ========================================================================== */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
