const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const form = document.querySelector('#contact-form');

function closeMenu() {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation menu');
}

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

function setTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-theme', isDark);
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  themeIcon.textContent = isDark ? '☀' : '☾';
  document.querySelector('meta[name="theme-color"]').setAttribute('content', isDark ? '#17211e' : '#f7f6f1');
}

const savedTheme = localStorage.getItem('portfolio-theme');
setTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
  setTheme(nextTheme);
  localStorage.setItem('portfolio-theme', nextTheme);
});

const sections = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
sections.forEach((section) => revealObserver.observe(section));

function showError(input, message) {
  input.classList.toggle('invalid', Boolean(message));
  document.querySelector(`#${input.id}-error`).textContent = message;
}

function validateInput(input) {
  const value = input.value.trim();
  let message = '';
  if (!value) message = 'This field is required.';
  else if (input.type === 'email' && !/^\S+@\S+\.\S+$/.test(value)) message = 'Enter a valid email address.';
  else if (input.id === 'message' && value.length < 10) message = 'Please write at least 10 characters.';
  showError(input, message);
  return !message;
}

form.querySelectorAll('input, textarea').forEach((input) => input.addEventListener('blur', () => validateInput(input)));
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputs = [...form.querySelectorAll('input, textarea')];
  const isValid = inputs.every(validateInput);
  const status = document.querySelector('#form-status');
  if (!isValid) {
    status.textContent = 'Please correct the highlighted fields.';
    status.classList.remove('success');
    return;
  }
  status.textContent = 'Thanks! Your message is ready to send. Connect this form to Formspree or EmailJS to receive submissions.';
  status.classList.add('success');
  form.reset();
});

document.querySelector('#year').textContent = new Date().getFullYear();
