'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mainMenu');
  const scrollToTopButton = document.getElementById('scrollToTop');

  // Menu functions
  function closeMenu() {
    if (!menu.classList.contains('-translate-x-full')) {
      menu.classList.add('-translate-x-full');
      menu.classList.remove('translate-x-0');
      burger.setAttribute('aria-expanded', 'false');
    }
  }

  function openMenu() {
    menu.classList.remove('-translate-x-full');
    menu.classList.add('translate-x-0');
    burger.setAttribute('aria-expanded', 'true');
  }

  burger?.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('-translate-x-full');
    isOpen ? closeMenu() : openMenu();
  });

  // Close menu on link click
  document.querySelectorAll('#mainMenu a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      closeMenu();
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (
      !menu.contains(e.target) &&
      !burger.contains(e.target) &&
      !menu.classList.contains('-translate-x-full')
    ) {
      closeMenu();
    }
  });

  // Scroll-to-top button
  window.addEventListener('scroll', () => {
    scrollToTopButton?.classList.toggle('hidden', window.scrollY <= 300);
  });

  scrollToTopButton?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Swiper Projects
  if (document.querySelector('.mySwiper-projects')) {
    const swiperForProjects = new Swiper('.mySwiper-projects', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      loop: true,
      slidesPerView: 1,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });

    const handleAutoplay = () => {
      if (window.innerWidth <= 768) {
        swiperForProjects.autoplay.start();
      } else {
        swiperForProjects.autoplay.stop();
      }
    };

    handleAutoplay();
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleAutoplay, 200);
    });
  }

  // Swiper Testimonials
  if (document.querySelector('.mySwiper-testimonials')) {
    new Swiper('.mySwiper-testimonials', {
      slidesPerView: 2,
      centeredSlides: true,
      spaceBetween: 30,
      grabCursor: true,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: { slidesPerView: 1, centeredSlides: false },
        769: { slidesPerView: 2, centeredSlides: true },
      },
    });
  }

  // Animate on view (general)
  const animateOnView = (
    selector,
    classToRemove,
    classToAdd,
    threshold = 0.5
  ) => {
    const el = document.querySelector(selector);
    if (!el) return;

    const runAnimation = () => {
      el.classList.remove(...classToRemove);
      el.classList.add(...classToAdd);
    };

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          runAnimation();
          obs.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);

    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewport) {
      runAnimation();
      observer.unobserve(el);
    }
  };

  // #aboutImage — on view
  animateOnView(
    '#aboutImage',
    ['opacity-0', '-translate-x-20'],
    ['opacity-100', 'translate-x-0']
  );

  // #promoImage — immediately on load
  const promoImage = document.getElementById('promoImage');
  if (promoImage) {
    setTimeout(() => {
      promoImage.classList.remove('opacity-0', 'translate-x-[100px]');
      promoImage.classList.add('opacity-100', 'translate-x-0');
    }, 100); // невелика затримка для ефекту
  }

  // scroll-fade items
  const scrollFadeItems = document.querySelectorAll('.scroll-fade');
  if (scrollFadeItems.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        let delay = 0;
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.remove('opacity-0', 'rotate-x-90');
              entry.target.classList.add('opacity-100', 'rotate-x-0');
            }, delay);
            delay += 200;
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    scrollFadeItems.forEach(el => observer.observe(el));
  }

  // Animate team images
  const teamSection = document.querySelector('.team-section');
  if (teamSection) {
    const teamImages = teamSection.querySelectorAll('.team-image');
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          teamImages.forEach((img, i) => {
            setTimeout(() => {
              img.classList.remove(
                'opacity-0',
                '[transform:rotateY(90deg)]',
                'translate-x-20'
              );
              img.classList.add('opacity-100', 'translate-x-0');
              img.style.transform = 'rotateY(0deg)';
            }, 300 * i);
          });
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(teamSection);
  }

  // Achievements counter
  const achievements = document.querySelector('.achievements-section');
  if (achievements) {
    const counters = achievements.querySelectorAll('.counter');

    const animateCount = (el, target, duration = 1500) => {
      let start = 0,
        startTime = null;

      const update = timestamp => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const ratio = Math.min(progress / duration, 1);
        const current = Math.floor(ratio * target);
        el.textContent = current;
        if (progress < duration) requestAnimationFrame(update);
        else el.textContent = target;
      };

      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            animateCount(counter, target);
          });
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(achievements);
  }
});
