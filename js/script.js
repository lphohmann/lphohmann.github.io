// js/script.js
document.addEventListener('DOMContentLoaded', () => {
  // pick nav links (prefer .nav-link but fall back to .topnav a)
  let links = document.querySelectorAll('.nav-link');
  if (!links.length) links = document.querySelectorAll('.topnav a');

  // pick all sections that have an id (keeps it generic for new sections)
  const sections = Array.from(document.querySelectorAll('section[id]'));

  // compute offset dynamically from the topbar (so changes in header size don't break scroll)
  const topbar = document.querySelector('.topbar');
  const getOffset = () => (topbar ? topbar.getBoundingClientRect().height : 80);

  // Smooth scroll behavior for nav links
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || '';
      if (!href.startsWith('#')) return; // ignore external links
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      const offset = getOffset();
      const top = el.getBoundingClientRect().top + window.scrollY - offset + 6; // small nudge
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Highlight active link on scroll (throttled)
  function updateActiveLink() {
    const offset = getOffset();
    const fromTop = window.scrollY + offset + 10;
    let current = sections[0];
    for (const section of sections) {
      if (section.offsetTop <= fromTop) current = section;
    }
    links.forEach(l => {
      const href = l.getAttribute('href') || '';
      l.classList.toggle('active', href === `#${current.id}`);
    });
  }
  updateActiveLink();
  window.addEventListener('scroll', throttle(updateActiveLink, 120));
  window.addEventListener('resize', throttle(updateActiveLink, 250));

  // Optional: unlock audio on first click so hover sounds can play afterward
  // (Use a relative path; place the WAV in /sounds/hover.wav in your repo)
  const enableHoverSound = false; // set to true if you want hover sound (and have the file)
  let hoverSound;
  if (enableHoverSound) {
    hoverSound = new Audio('sounds/hover.mp3');
    document.addEventListener('click', () => {
      // try to play/pause once to "unlock" audio in browsers
      hoverSound.play().catch(()=>{}); 
      hoverSound.pause();
    }, { once: true });
  }

  // Example: if you want hover sounds on cards, uncomment and use this block:
  
  if (enableHoverSound) {
    const cards = document.querySelectorAll('.project, .skill-category, .conference, .card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        try {
          hoverSound.currentTime = 0;
          hoverSound.play();
        } catch (e) {
          // ignore play errors
        }
      });
    });
  }
  
  // small throttle to reduce scroll work
  function throttle(fn, wait) {
    let time = Date.now();
    return (...args) => {
      if ((time + wait - Date.now()) < 0) {
        fn(...args);
        time = Date.now();
      }
    };
  }
});
