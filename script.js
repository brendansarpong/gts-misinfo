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
const quizData = [
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
