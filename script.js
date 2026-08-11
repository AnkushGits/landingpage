const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelector('#year').textContent = new Date().getFullYear();

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});
