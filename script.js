// ===== Theme Toggle =====
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') root.classList.add('light');

function updateThemeIcon() {
  const isLight = root.classList.contains('light');
  themeToggle.textContent = isLight ? '🌞' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

themeToggle?.addEventListener('click', () => {
  root.classList.toggle('light');
  updateThemeIcon();
});
updateThemeIcon();

// ===== Mobile Nav =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('show');
});

// Close menu when clicking a link (mobile)
navMenu?.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && navMenu.classList.contains('show')) {
    navMenu.classList.remove('show');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// ===== Active Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-menu a');

const activeOnScroll = () => {
  const scrollY = window.scrollY + 120; // offset for sticky header
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-menu a[href="#${id}"]`);
    if (scrollY >= top && scrollY < top + height) {
      links.forEach(a => a.classList.remove('active'));
      link?.classList.add('active');
    }
  });
};
window.addEventListener('scroll', activeOnScroll);
activeOnScroll();

// ===== Contact Form (mailto fallback) =====
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get('name');
  const email = data.get('email');
  const message = data.get('message');
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
  window.location.href = `mailto:ananyakumari10sep@gmail.com?subject=${subject}&body=${body}`;
  statusEl.textContent = 'Opening your email client…';
});

// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();