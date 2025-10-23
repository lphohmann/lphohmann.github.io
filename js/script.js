// ========================
// Smooth Scroll for Nav Links
// ========================
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// ========================
// Hover interaction for cards
// ========================
const cards = document.querySelectorAll('.project, .skill-category, .conference');

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-7px)';
    card.style.boxShadow = '0 10px 25px rgba(57, 255, 20, 0.3)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '0 5px 15px rgba(0, 255, 128, 0.2)';
  });
});

// ========================
// Optional: Hover sound effect
// ========================

const hoverSound = new Audio('sounds/hover.mp3'); // add your sound file in /sounds/

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
  });
});

