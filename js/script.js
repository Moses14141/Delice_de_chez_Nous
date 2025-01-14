// Toggle hamburger menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
  }




  
// Get the h2 element inside home-content
const homeContentH2 = document.querySelector('.home-content h2');

// Add the 'visible' class immediately to trigger the animation
window.addEventListener('DOMContentLoaded', function() {
  homeContentH2.classList.add('visible'); // Add the class to trigger animation
});



  hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
  });

  // Animate Home Content on Scroll (when it becomes visible)
  const homeHeading = document.querySelector('.home-content h2');
  const homeContent = document.querySelector('.home-content p');
  const homeSection = document.querySelector('.home-section');

  function checkVisibility() {
    const rect = homeSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      homeHeading.classList.add('visible');
      homeContent.classList.add('visible');
    }
  }

  // Add smooth scroll behavior on page load and scroll
  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('load', checkVisibility);

  // Smooth scroll for internal links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  













  // Simple Scroll Animation for Menu Section
document.addEventListener('DOMContentLoaded', function () {
  const menuSections = document.querySelectorAll('.menu-section');
  
  window.addEventListener('scroll', () => {
      menuSections.forEach(section => {
          const sectionTop = section.getBoundingClientRect().top;
          const sectionHeight = section.offsetHeight;
          const windowHeight = window.innerHeight;
          
          if (sectionTop < windowHeight - 100 && sectionTop + sectionHeight > 100) {
              section.classList.add('fade-in');
          }
      });
  });
});

