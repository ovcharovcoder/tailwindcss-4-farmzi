'use strict';

// Burger Menu Toggle
const burger = document.getElementById('burger');
const menu = document.getElementById('mainMenu');
const menuIcon = burger?.querySelector('.menu-icon');
const closeIcon = burger?.querySelector('.close-icon');

burger?.addEventListener('click', () => {
  const isOpen = !menu.classList.contains('-translate-x-full');
  menu.classList.toggle('-translate-x-full');
  menu.classList.toggle('translate-x-0', !isOpen);
  menuIcon?.classList.toggle('hidden', !isOpen);
  closeIcon?.classList.toggle('hidden', isOpen);
  burger.setAttribute('aria-expanded', !isOpen);
});

// Close mobile menu on link click
document.querySelectorAll('#mainMenu a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.add('-translate-x-full');
    menu.classList.remove('translate-x-0');
    menuIcon?.classList.remove('hidden');
    closeIcon?.classList.add('hidden');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// Smooth Scroll and Close Mobile Menu on Link Click
document.querySelectorAll('#mainMenu a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault(); // Prevent default anchor behavior
    const targetId = link.getAttribute('href').substring(1); // Remove '#' from href
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // Close mobile menu
      menu.classList.add('-translate-x-full');
      menu.classList.remove('translate-x-0');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
});

// Scroll to Top Button
const scrollToTopButton = document.getElementById('scrollToTop');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopButton.classList.remove('hidden');
  } else {
    scrollToTopButton.classList.add('hidden');
  }
});

// Scroll to top on button click
scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// Swiper slider Projects
let swiperForProjects = new Swiper('.mySwiper-projects', {
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

// Enable/disable autoplay depending on width
function handleAutoplay() {
  if (window.innerWidth <= 768) {
    swiperForProjects.autoplay.start();
  } else {
    swiperForProjects.autoplay.stop();
  }
}

handleAutoplay();
window.addEventListener('resize', handleAutoplay);

// Swiper slider Testimonials
const swiperForTestimonials = new Swiper('.mySwiper-testimonials', {
  slidesPerView: 2,
  centeredSlides: true,
  spaceBetween: 30,
  grabCursor: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  loop: true,

  // Added breakpoints
  breakpoints: {
    0: {
      slidesPerView: 1,
      centeredSlides: false,
    },
    769: {
      slidesPerView: 2,
      centeredSlides: true,
    },
  },
});

// Animations when appearing in the viewport to right
document.addEventListener('DOMContentLoaded', function () {
  const image = document.getElementById('aboutImage');

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          image.classList.remove('opacity-0', '-translate-x-20');
          image.classList.add('opacity-100', 'translate-x-0');
          observer.unobserve(image);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  observer.observe(image);
});

// Animations when appearing in the viewport to left
document.addEventListener('DOMContentLoaded', () => {
  const promoImage = document.getElementById('promoImage');

  setTimeout(() => {
    promoImage.classList.remove('opacity-0', 'translate-x-[100px]');
    promoImage.classList.add('opacity-100', 'translate-x-0');
  }, 100);
});

// Animations when appearing in vertical rotation
document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('.scroll-fade');

  const observer = new IntersectionObserver(
    (entries, observer) => {
      let delay = 0;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.remove('opacity-0', 'rotate-x-90');
            entry.target.classList.add('opacity-100', 'rotate-x-0');
          }, delay);

          delay += 200;
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  images.forEach(image => observer.observe(image));
});

// Animations when appearing in horizontal rotation
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.team-section');
  const images = section.querySelectorAll('.team-image');

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          images.forEach((img, index) => {
            setTimeout(() => {
              img.classList.remove(
                'opacity-0',
                '[transform:rotateY(90deg)]',
                'translate-x-20'
              );
              img.classList.add('opacity-100', 'translate-x-0');
              img.style.transform = 'rotateY(0deg)';
            }, 300 * index);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  observer.observe(section);
});

// Counter animation
function animateCount(el, target, duration = 1500) {
  let start = 0;
  let startTime = null;

  function update(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const progressRatio = Math.min(progress / duration, 1);
    const current = Math.floor(progressRatio * target);
    el.textContent = current;

    if (progress < duration) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.achievements-section');
  const counters = section.querySelectorAll('.counter');

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            animateCount(counter, target, 1500);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(section);
});
