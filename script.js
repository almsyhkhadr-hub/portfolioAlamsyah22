/**
 * Portfolio JavaScript - Alamsyah Khadir Ratuloly
 * Handles dynamic interactions: Typewriter, Sticky Navbar, Scrollspy, Mobile Menu
 */

// 1. Set current year in footer dynamically
const currentYearEl = document.getElementById('currentYear');
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

// 2. Typewriter Effect
const typewriterElement = document.getElementById('typewriter');
const phrases = [
  'Web Developer',
  'UI/UX Designer',
  'Informatics Student',
  'Creative Digital Enthusiast'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  if (!typewriterElement) return;
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 110;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    // Pause on complete word
    typingSpeed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 400;
  }

  setTimeout(typeEffect, typingSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
  typeEffect();
});

// 3. Sticky Navbar Blur & Background Transition on Scroll
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('bg-spider-dark/90', 'backdrop-blur-md', 'shadow-xl', 'border-b', 'border-white/10');
    } else {
      navbar.classList.remove('bg-spider-dark/90', 'backdrop-blur-md', 'shadow-xl', 'border-b', 'border-white/10');
    }
  });
}

// 4. Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// 5. Active Link Highlight on Scroll (Scrollspy)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let currentSectionId = '';
  const scrollPosition = window.scrollY + 200;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('text-red-400', 'bg-white/10');
    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('text-red-400', 'bg-white/10');
    }
  });
});
