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

handleAutoplay(); // called when loading
window.addEventListener('resize', handleAutoplay); // called when resizing

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
