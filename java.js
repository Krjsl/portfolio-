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
document.querySelectorAll('a, button, .badge, .tool-card, .soft-card, .project-card, .blog-card, .modal-close').forEach(el => {
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


// ── 12. BLOG SYSTEM (Create / Read / Edit / Delete / Search) ─
(function blogSystem() {
  const STORAGE_KEY = 'krijal_blog_posts';

  const grid         = document.getElementById('blog-grid');
  const emptyMsg      = document.getElementById('blog-empty');
  const searchInput   = document.getElementById('blog-search');

  const newBtn        = document.getElementById('blog-new-btn');
  const formOverlay   = document.getElementById('blog-modal-overlay');
  const formCloseBtn  = document.getElementById('blog-modal-close');
  const cancelBtn     = document.getElementById('blog-cancel-btn');
  const form          = document.getElementById('blog-form');
  const idInput       = document.getElementById('blog-id');
  const titleInput    = document.getElementById('blog-title-input');
  const tagInput      = document.getElementById('blog-tag-input');
  const contentInput  = document.getElementById('blog-content-input');
  const modalTitle    = document.getElementById('blog-modal-title');

  const viewOverlay   = document.getElementById('blog-view-overlay');
  const viewClose     = document.getElementById('blog-view-close');
  const viewTag       = document.getElementById('blog-view-tag');
  const viewTitle     = document.getElementById('blog-view-title');
  const viewMeta      = document.getElementById('blog-view-meta');
  const viewContent   = document.getElementById('blog-view-content');
  const editBtn       = document.getElementById('blog-edit-btn');
  const deleteBtn     = document.getElementById('blog-delete-btn');

  if (!grid) return; // blog section not present on this page

  let currentViewId = null;

  // ---- storage helpers ----
  function loadPosts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error('Blog load error:', e);
      return null;
    }
  }

  function savePosts(posts) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (e) {
      console.error('Blog save error:', e);
    }
  }

  function seedDefaults() {
    return [
      {
        id: 'seed-1',
        title: 'Why Enumeration Is the Most Underrated Skill in Hacking',
        tag: 'Methodology',
        date: '2026-05-12',
        content: 'When I started practicing on TryHackMe and HackTheBox, I assumed exploitation was where the real skill was. Months in, I realized the opposite is true — most boxes are won or lost during enumeration. Spending extra time mapping services, checking versions, and reading source code patiently has saved me more times than any flashy exploit.\n\nA structured enumeration checklist beats intuition every time, especially under CTF time pressure.'
      },
      {
        id: 'seed-2',
        title: 'My Journey Into Application Security',
        tag: 'Career',
        date: '2026-04-02',
        content: 'I started my undergraduate degree in Ethical Hacking and Cybersecurity with a broad interest in offense and defense. Over time, web application security pulled me in the most — there is something satisfying about chaining small misconfigurations into a full account takeover.\n\nEarning the Certified AppSec Practitioner v2 certification helped me formalize a lot of what I had learned through trial and error in labs.'
      }
    ];
  }

  function getPosts() {
    let posts = loadPosts();
    if (posts === null) {
      posts = seedDefaults();
      savePosts(posts);
    }
    return posts;
  }

  // ---- formatting helpers ----
  function formatDate(dateStr) {
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function readingTime(text) {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  }

  function excerpt(text, len = 140) {
    const clean = text.replace(/\n+/g, ' ').trim();
    return clean.length > len ? clean.slice(0, len).trim() + '…' : clean;
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ---- render ----
  function render(filter = '') {
    const posts = getPosts().slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    const q = filter.trim().toLowerCase();
    const filtered = q
      ? posts.filter(p => p.title.toLowerCase().includes(q) || (p.tag || '').toLowerCase().includes(q))
      : posts;

    grid.innerHTML = '';

    if (filtered.length === 0) {
      emptyMsg.style.display = 'block';
      emptyMsg.textContent = posts.length === 0
        ? 'No posts yet. Click "+ New Post" to write your first one.'
        : 'No posts match your search.';
      return;
    }
    emptyMsg.style.display = 'none';

    filtered.forEach((post) => {
      const card = document.createElement('div');
      card.className = 'blog-card';
      card.innerHTML =
        '<div class="blog-card-top">' +
          '<span class="blog-tag">' + escapeHTML(post.tag || 'General') + '</span>' +
          '<span class="blog-date">' + formatDate(post.date) + '</span>' +
        '</div>' +
        '<h3 class="blog-card-title">' + escapeHTML(post.title) + '</h3>' +
        '<p class="blog-card-excerpt">' + escapeHTML(excerpt(post.content)) + '</p>' +
        '<div class="blog-card-footer">' +
          '<span class="blog-read-time">' + readingTime(post.content) + ' min read</span>' +
          '<span class="blog-read-more">Read more →</span>' +
        '</div>';

      card.addEventListener('click', () => openView(post.id));
      card.addEventListener('mouseenter', () => follower.classList.add('hover'));
      card.addEventListener('mouseleave', () => follower.classList.remove('hover'));
      grid.appendChild(card);
    });
  }

  // ---- create / edit form modal ----
  function openForm(post = null) {
    if (post) {
      modalTitle.textContent = 'Edit Blog Post';
      idInput.value = post.id;
      titleInput.value = post.title;
      tagInput.value = post.tag || '';
      contentInput.value = post.content;
    } else {
      modalTitle.textContent = 'New Blog Post';
      form.reset();
      idInput.value = '';
    }
    formOverlay.classList.add('active');
    setTimeout(() => titleInput.focus(), 100);
  }

  function closeForm() {
    formOverlay.classList.remove('active');
  }

  // ---- view modal ----
  function openView(id) {
    const posts = getPosts();
    const post = posts.find(p => p.id === id);
    if (!post) return;
    currentViewId = id;
    viewTag.textContent = post.tag || 'General';
    viewTitle.textContent = post.title;
    viewMeta.textContent = formatDate(post.date) + ' · ' + readingTime(post.content) + ' min read';
    viewContent.innerHTML = post.content
      .split(/\n+/)
      .filter(p => p.trim().length > 0)
      .map(p => '<p>' + escapeHTML(p) + '</p>')
      .join('');
    viewOverlay.classList.add('active');
  }

  function closeView() {
    viewOverlay.classList.remove('active');
    currentViewId = null;
  }

  // ---- form submit (create or update) ----
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const posts = getPosts();
    const id = idInput.value;

    if (id) {
      const idx = posts.findIndex(p => p.id === id);
      if (idx !== -1) {
        posts[idx].title   = titleInput.value.trim();
        posts[idx].tag     = tagInput.value.trim();
        posts[idx].content = contentInput.value.trim();
      }
    } else {
      posts.push({
        id: 'post-' + Date.now(),
        title: titleInput.value.trim(),
        tag: tagInput.value.trim(),
        date: new Date().toISOString().slice(0, 10),
        content: contentInput.value.trim()
      });
    }

    savePosts(posts);
    closeForm();
    render(searchInput.value);
  });

  // ---- event wiring ----
  newBtn.addEventListener('click', () => openForm());
  formCloseBtn.addEventListener('click', closeForm);
  cancelBtn.addEventListener('click', closeForm);
  formOverlay.addEventListener('click', (e) => { if (e.target === formOverlay) closeForm(); });

  viewClose.addEventListener('click', closeView);
  viewOverlay.addEventListener('click', (e) => { if (e.target === viewOverlay) closeView(); });

  editBtn.addEventListener('click', () => {
    const posts = getPosts();
    const post = posts.find(p => p.id === currentViewId);
    closeView();
    if (post) openForm(post);
  });

  deleteBtn.addEventListener('click', () => {
    if (!confirm('Delete this post? This cannot be undone.')) return;
    let posts = getPosts();
    posts = posts.filter(p => p.id !== currentViewId);
    savePosts(posts);
    closeView();
    render(searchInput.value);
  });

  searchInput.addEventListener('input', () => render(searchInput.value));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeForm(); closeView(); }
  });

  render();
})();
