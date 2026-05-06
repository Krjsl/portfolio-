/* =============================================
   CYBERSECURITY PORTFOLIO — java.js
   Interactive features
   ============================================= */

// ── 1. CUSTOM CURSOR ──────────────────────────
const cursor       = document.getElementById('cursor');
const follower     = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Smooth follower animation
function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Hover effect on interactive elements
document.querySelectorAll('a, button, .badge, .tool-card, .soft-card').forEach(el => {
  el.addEventListener('mouseenter', () => follower.classList.add('hover'));
  el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
});


// ── 2. MATRIX RAIN CANVAS ─────────────────────
(function initMatrix() {
  const canvas  = document.getElementById('matrix-canvas');
  const ctx     = canvas.getContext('2d');
  const chars   = '01アイウエオカキクケコ▓█░▒ABCDEF0123456789';
  const fontSize = 13;
  let columns, drops;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops   = Array(columns).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(8,12,16,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#c9a84c';
    ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 55);
})();


// ── 3. TYPED HERO TAG ─────────────────────────
(function typeWriter() {
  const el       = document.getElementById('typed-tag');
  const messages = [
    '> Initializing secure session...',
    '> Running enumeration scan...',
    '> Web exploitation mode: ON.',
    '> Welcome — I am Krijal Prajapati.'
  ];
  let msgIndex = 0, charIndex = 0, deleting = false;

  function type() {
    const current = messages[msgIndex];
    if (deleting) {
      el.textContent = current.substring(0, charIndex--);
    } else {
      el.textContent = current.substring(0, charIndex++);
    }

    // Blinking cursor char
    el.innerHTML = el.textContent + '<span class="typed-cursor"></span>';

    let speed = deleting ? 40 : 70;

    if (!deleting && charIndex > current.length) {
      speed = 1800; // pause at end
      deleting = true;
    } else if (deleting && charIndex < 0) {
      deleting = false;
      msgIndex = (msgIndex + 1) % messages.length;
      speed = 400;
      charIndex = 0;
    }
    setTimeout(type, speed);
  }
  type();
})();


// ── 4. NAVBAR SCROLL EFFECT ───────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});


// ── 5. COUNTER ANIMATION ──────────────────────
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target   = parseInt(el.getAttribute('data-target'));
    const duration = 1800;
    const step     = target / (duration / 16);
    let current    = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 16);
  });
}

// Run counters once hero is visible
const heroObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateCounters();
    heroObserver.disconnect();
  }
}, { threshold: 0.4 });
heroObserver.observe(document.getElementById('hero'));


// ── 6. SCROLL REVEAL ──────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

// Add reveal class to key elements
const revealTargets = [
  '.section-header',
  '.about-photo-wrap',
  '.about-text',
  '.skill-item',
  '.tool-card',
  '.soft-card',
  '.hero-stats',
];
revealTargets.forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.07) + 's';
    revealObserver.observe(el);
  });
});


// ── 7. SKILL BAR ANIMATION ────────────────────
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const level = entry.target.getAttribute('data-level');
      entry.target.querySelector('.skill-fill').style.width = level + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-item').forEach(el => skillObserver.observe(el));


// ── 8. SKILLS TABS ────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show correct panel
    const tab = btn.getAttribute('data-tab');
    document.querySelectorAll('.skills-panel').forEach(panel => panel.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');

    // Re-trigger skill bar animation if switching to technical
    if (tab === 'technical') {
      document.querySelectorAll('.skill-item').forEach(el => {
        const level = el.getAttribute('data-level');
        const fill  = el.querySelector('.skill-fill');
        fill.style.width = '0';
        setTimeout(() => { fill.style.width = level + '%'; }, 50);
      });
    }
  });
});


// ── 9. ACTIVE NAV LINK HIGHLIGHT ──────────────
const sections    = document.querySelectorAll('section[id]');
const navLinks    = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--gold)';
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(sec => sectionObserver.observe(sec));


// ── 10. DOWNLOAD BUTTON FEEDBACK ──────────────
const dlBtn = document.getElementById('download-btn');
if (dlBtn) {
  dlBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const orig = dlBtn.textContent;
    dlBtn.textContent = '> Preparing File...';
    setTimeout(() => {
      dlBtn.textContent = '✓ Ready to Download';
      setTimeout(() => { dlBtn.textContent = orig; }, 2000);
    }, 1000);
  });
}


// ── 11. TOOL CARD GLITCH ON HOVER ─────────────
document.querySelectorAll('.tool-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const span = card.querySelector('span');
    if (!span) return;
    const original = span.textContent;
    let iter = 0;
    const glitchChars = 'ABCDEF0123456789#@!%';
    const interval = setInterval(() => {
      span.textContent = original.split('').map((c, i) => {
        if (i < iter) return original[i];
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }).join('');
      iter += 1.5;
      if (iter >= original.length) {
        span.textContent = original;
        clearInterval(interval);
      }
    }, 40);
  });
});
