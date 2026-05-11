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
