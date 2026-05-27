// Broken Barriers Church - Shared JavaScript

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileNav = document.getElementById('mobile-nav');
  
  if (mobileMenuButton && mobileNav) {
    mobileMenuButton.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      
      // Toggle icon
      const icon = mobileMenuButton.querySelector('svg use');
      if (icon) {
        const currentIcon = icon.getAttribute('href');
        if (currentIcon === '#menu-icon') {
          icon.setAttribute('href', '#x-icon');
        } else {
          icon.setAttribute('href', '#menu-icon');
        }
      }
    });
  }
  
  // Mobile dropdown toggles
  const mobileDropdownButtons = document.querySelectorAll('.mobile-nav-item[data-dropdown]');
  mobileDropdownButtons.forEach(button => {
    button.addEventListener('click', function() {
      const dropdownId = this.getAttribute('data-dropdown');
      const dropdown = document.getElementById(dropdownId);
      
      if (dropdown) {
        dropdown.classList.toggle('active');
        
        // Rotate chevron
        const chevron = this.querySelector('.chevron');
        if (chevron) {
          chevron.style.transform = dropdown.classList.contains('active') 
            ? 'rotate(180deg)' 
            : 'rotate(0deg)';
        }
      }
    });
  });
  
  // Set active nav item based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-button, .dropdown-item, .footer-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // Scroll Animation Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
  animatedElements.forEach(el => observer.observe(el));
  
  // Header scroll effect
  const header = document.querySelector('header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Scroll Animation Observer
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
  animatedElements.forEach(el => observer.observe(el));
});

// ==========================================
// Hero Slider Functionality
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevButton = document.querySelector('.slider-prev');
  const nextButton = document.querySelector('.slider-next');
  
  if (!slides.length) return; // Exit if no slider present
  
  let currentSlide = 0;
  let autoPlayInterval;
  
  // Show specific slide
  function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentSlide = index;
  }
  
  // Next slide
  function nextSlide() {
    let next = currentSlide + 1;
    if (next >= slides.length) next = 0;
    showSlide(next);
  }
  
  // Previous slide
  function prevSlide() {
    let prev = currentSlide - 1;
    if (prev < 0) prev = slides.length - 1;
    showSlide(prev);
  }
  
  // Auto-play function
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 6000); // Change slide every 6 seconds
  }
  
  // Stop auto-play
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }
  
  // Event listeners for arrows
  if (prevButton) {
    prevButton.addEventListener('click', function() {
      stopAutoPlay();
      prevSlide();
      startAutoPlay(); // Restart auto-play after manual interaction
    });
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', function() {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });
  }
  
  // Event listeners for dots
  dots.forEach(function(dot, index) {
    dot.addEventListener('click', function() {
      stopAutoPlay();
      showSlide(index);
      startAutoPlay();
    });
  });
  
  // Pause on hover
  const sliderContainer = document.querySelector('.hero-slider');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    } else if (e.key === 'ArrowRight') {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    }
  });
  
  // Start auto-play
  startAutoPlay();
});
