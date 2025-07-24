// Add smooth scroll behavior to navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Parallax effect
window.addEventListener('scroll', () => {
  const parallaxSections = document.querySelectorAll('.parallax-section');
  parallaxSections.forEach(section => {
    const bg = section.querySelector('.parallax-bg');
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    bg.style.transform = `translate3d(0, ${rate}px, 0)`;
  });
});

// Scroll animations
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
  scrollObserver.observe(el);
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
    nav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
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

// Animate underline accent for headings when in view
function animateHeadingsInView() {
  const headings = document.querySelectorAll('h1, h3');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, { threshold: 0.5 });
  headings.forEach(h => observer.observe(h));
}

window.addEventListener('DOMContentLoaded', animateHeadingsInView);

// Fade & slide up animation for page load
function fadeSlideUpOnLoad() {
  const elements = document.querySelectorAll('.fade-slide-up');
  elements.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 + i * 120);
  });
}
window.addEventListener('DOMContentLoaded', fadeSlideUpOnLoad);

// Quiz logic for lesson1.html
// Use window.quizData if defined, otherwise use the default quizData
const defaultQuizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Paris", "London", "Madrid"],
    answer: 1
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 1
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "2"],
    answer: 1
  },
  {
    question: "Which animal is known as man's best friend?",
    options: ["Cat", "Dog", "Horse", "Parrot"],
    answer: 1
  }
];

const quizData = window.quizData || defaultQuizData;

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function startQuiz() {
  if (!document.getElementById('quiz-question-card')) return;
  let questions = shuffle([...quizData]);
  let current = 0;
  let correct = 0;
  let selected = null;

  const questionCard = document.getElementById('quiz-question-card');
  const nextBtn = document.getElementById('next-btn');
  const resultCard = document.getElementById('quiz-result');
  const progressBar = document.querySelector('.quiz-progress');

  function renderQuestion() {
    selected = null;
    nextBtn.style.display = 'none';
    const q = questions[current];
    questionCard.innerHTML = `
      <div class="quiz-question">${q.question}</div>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `<button class="quiz-option" data-idx="${i}">${opt}</button>`).join('')}
      </div>
    `;
    // Animate question card
    questionCard.classList.remove('visible');
    setTimeout(() => questionCard.classList.add('visible'), 10);
    // Progress bar
    progressBar.style.width = `${((current) / questions.length) * 100}%`;
    // Option click
    document.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', function() {
        if (selected !== null) return;
        selected = parseInt(this.dataset.idx);
        if (selected === q.answer) {
          this.classList.add('correct');
          correct++;
        } else {
          this.classList.add('incorrect');
          document.querySelectorAll('.quiz-option')[q.answer].classList.add('correct');
        }
        document.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
        nextBtn.style.display = 'inline-block';
      });
    });
  }

  function showResult() {
    questionCard.innerHTML = '';
    nextBtn.style.display = 'none';
    progressBar.style.width = '100%';
    const passed = correct >= 2;
    resultCard.style.display = 'block';
    resultCard.className = 'quiz-result-card ' + (passed ? 'pass' : 'fail');
    resultCard.innerHTML = `
      <div style="font-size:2.5rem;">${passed ? '🎉' : '😕'}</div>
      <div style="font-size:1.5rem; font-weight:700; margin:1rem 0;">
        ${passed ? 'You Passed!' : 'Try Again'}
      </div>
      <div>You got <b>${correct}</b> out of <b>${questions.length}</b> correct.</div>
      <button onclick="window.location.reload()" class="button-accent" style="margin-top:1.5rem;">Restart Quiz</button>
    `;
  }

  nextBtn.onclick = function() {
    if (current < questions.length - 1) {
      current++;
      renderQuestion();
    } else {
      showResult();
    }
  };

  // Initial render
  renderQuestion();
  resultCard.style.display = 'none';
}

window.addEventListener('DOMContentLoaded', startQuiz);

// Carousel functionality
function initCarousel() {
  const track = document.querySelector('.lessons-track');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  const cards = document.querySelectorAll('.lesson-card');
  
  if (!track || !prevButton || !nextButton) return;
  
  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight);
  const visibleCards = Math.floor(track.offsetWidth / cardWidth);
  
  function updateButtons() {
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= cards.length - visibleCards;
  }
  
  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      track.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      });
      updateButtons();
    }
  });
  
  nextButton.addEventListener('click', () => {
    if (currentIndex < cards.length - visibleCards) {
      currentIndex++;
      track.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      });
      updateButtons();
    }
  });
  
  // Initialize button states
  updateButtons();
  
  // Update on window resize
  window.addEventListener('resize', () => {
    const newVisibleCards = Math.floor(track.offsetWidth / cardWidth);
    if (currentIndex > cards.length - newVisibleCards) {
      currentIndex = Math.max(0, cards.length - newVisibleCards);
      track.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      });
    }
    updateButtons();
  });
}

// Zelda sound effect
function initZeldaSound() {
  const zeldaImage = document.querySelector('.zelda-image');
  if (!zeldaImage) return;
  
  const audio = new Audio('Legend of Zelda Hidden Area Sound Effect.mp3');
  
  zeldaImage.addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play();
  });
}

// Initialize new features
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initZeldaSound();
});

// Add external link indicators
function addExternalLinkIndicators() {
  const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
  
  externalLinks.forEach(link => {
    // Skip if already has external-link class
    if (link.classList.contains('external-link')) return;
    
    // Add external-link class
    link.classList.add('external-link');
    
    // Add tooltip if it doesn't already exist
    if (!link.querySelector('.external-link-tooltip')) {
      const tooltip = document.createElement('span');
      tooltip.className = 'external-link-tooltip';
      tooltip.textContent = 'This link takes you to an external website';
      link.appendChild(tooltip);
    }
  });
}

// Initialize external link indicators when DOM is loaded
document.addEventListener('DOMContentLoaded', addExternalLinkIndicators);

// Dropdown for Lessons nav item
function setupLessonsDropdown() {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;
  const lessonsParent = navLinks.querySelector('.dropdown-parent');
  if (!lessonsParent) return;

  // Open on hover (desktop)
  lessonsParent.addEventListener('mouseenter', () => {
    lessonsParent.classList.add('open');
  });
  lessonsParent.addEventListener('mouseleave', () => {
    lessonsParent.classList.remove('open');
  });

  // Open/close on click (mobile/focus)
  lessonsParent.addEventListener('click', function(e) {
    // Only toggle if not hovering (for mobile)
    if (window.innerWidth <= 900) {
      e.preventDefault();
      lessonsParent.classList.toggle('open');
    }
  });

  // Close dropdown on outside click
  document.addEventListener('click', function(e) {
    if (!lessonsParent.contains(e.target)) {
      lessonsParent.classList.remove('open');
    }
  });
}

document.addEventListener('DOMContentLoaded', setupLessonsDropdown);
