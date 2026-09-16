const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('is-open', !open);
});

nav?.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuToggle?.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }
});

const filters = document.querySelector('[data-filters]');
const videoCards = [...document.querySelectorAll('.video-card')];

filters?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  const selected = button.dataset.filter;
  filters.querySelectorAll('[data-filter]').forEach((filter) => {
    const active = filter === button;
    filter.classList.toggle('is-active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  videoCards.forEach((card) => {
    card.hidden = selected !== 'all' && card.dataset.category !== selected;
  });
});

const dialog = document.querySelector('[data-video-dialog]');
const dialogPlayer = document.querySelector('[data-dialog-player]');
const dialogTitle = document.querySelector('[data-dialog-title]');
const dialogInstagram = document.querySelector('[data-dialog-instagram]');
const dialogClose = document.querySelector('[data-dialog-close]');

const closeDialog = () => {
  const video = dialogPlayer?.querySelector('video');
  if (video) {
    video.pause();
    video.removeAttribute('src');
    video.load();
  }
  if (dialog?.open) dialog.close();
  if (dialogPlayer) dialogPlayer.replaceChildren();
};

videoCards.forEach((card) => {
  card.addEventListener('click', () => {
    if (!dialog || !dialogPlayer || !dialogTitle || !dialogInstagram) return;
    const video = document.createElement('video');
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.poster = card.dataset.poster;
    video.src = card.dataset.video;
    dialogPlayer.replaceChildren(video);
    dialogTitle.textContent = card.dataset.title;
    dialogInstagram.href = card.dataset.instagram;
    dialog.showModal();
  });
});

dialogClose?.addEventListener('click', closeDialog);
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) closeDialog();
});
dialog?.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeDialog();
});
