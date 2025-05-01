// Add smooth scroll behavior to navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Enhanced scroll-based animations for feature cards
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add staggered delay for each card
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
      }, index * 150);
    }
  });
}, observerOptions);

// Observe all feature cards with enhanced initial state
document.querySelectorAll('.feature-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px) scale(0.95)';
  card.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  observer.observe(card);
});

// Add scroll-based navbar effect with enhanced animation
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    nav.style.backgroundColor = 'var(--primary-bg)';
    nav.style.backdropFilter = 'none';
    nav.style.transform = 'translateY(0)';
  } else if (currentScroll > lastScroll) {
    // Scrolling down
    nav.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up
    nav.style.transform = 'translateY(0)';
    nav.style.backgroundColor = 'rgba(41, 40, 43, 0.98)';
    nav.style.backdropFilter = 'blur(8px)';
  }
  lastScroll = currentScroll;
});

// Add hover effect to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px) scale(1.02)';
    card.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
    card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  });
});

// Handle lesson accordions
document.querySelectorAll('.lesson-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    const isActive = content.classList.contains('active');
    
    // Close all other accordions
    document.querySelectorAll('.lesson-content').forEach(item => {
      item.classList.remove('active');
      item.style.maxHeight = '0';
    });
    
    // Toggle clicked accordion
    if (!isActive) {
      content.classList.add('active');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});
