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

const applicationForm = document.querySelector('[data-application-form]');
const formSteps = [...document.querySelectorAll('[data-step]')];
const formBack = document.querySelector('[data-form-back]');
const formNext = document.querySelector('[data-form-next]');
const formSubmit = document.querySelector('[data-form-submit]');
const formProgress = document.querySelector('[data-progress]');
const formError = document.querySelector('[data-form-error]');
const stepLabel = document.querySelector('#step-label');
let currentStep = 0;

const showFormStep = (index, moveFocus = true) => {
  if (!formSteps.length) return;
  currentStep = Math.max(0, Math.min(index, formSteps.length - 1));
  formSteps.forEach((step, stepIndex) => {
    const active = stepIndex === currentStep;
    step.hidden = !active;
    step.classList.toggle('is-active', active);
  });
  if (formBack) formBack.hidden = currentStep === 0;
  if (formNext) formNext.hidden = currentStep === formSteps.length - 1;
  if (formSubmit) formSubmit.hidden = currentStep !== formSteps.length - 1;
  if (formProgress) formProgress.style.width = `${((currentStep + 1) / formSteps.length) * 100}%`;
  if (stepLabel) stepLabel.textContent = `Step ${String(currentStep + 1).padStart(2, '0')} of ${String(formSteps.length).padStart(2, '0')}`;
  if (formError) formError.textContent = '';
  if (moveFocus) formSteps[currentStep]?.querySelector('input, select, textarea')?.focus();
};

const validateCurrentStep = () => {
  const controls = [...(formSteps[currentStep]?.querySelectorAll('input, select, textarea') ?? [])];
  const invalid = controls.find((control) => !control.checkValidity());
  if (!invalid) return true;
  if (formError) formError.textContent = 'Complete the required fields before continuing.';
  invalid.reportValidity();
  invalid.focus();
  return false;
};

formNext?.addEventListener('click', () => {
  if (validateCurrentStep()) showFormStep(currentStep + 1);
});

formBack?.addEventListener('click', () => showFormStep(currentStep - 1));

applicationForm?.addEventListener('submit', (event) => {
  if (!validateCurrentStep()) event.preventDefault();
});

if (applicationForm) showFormStep(0, false);

const depthScene = document.querySelector('[data-depth-scene]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (depthScene) {
  const resetDepth = () => {
    depthScene.style.setProperty('--depth-x', '0px');
    depthScene.style.setProperty('--depth-y', '0px');
  };

  depthScene.addEventListener('pointermove', (event) => {
    if (reducedMotion.matches || event.pointerType === 'touch') return;
    const bounds = depthScene.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 14;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;
    depthScene.style.setProperty('--depth-x', `${x.toFixed(1)}px`);
    depthScene.style.setProperty('--depth-y', `${y.toFixed(1)}px`);
  });

  depthScene.addEventListener('pointerleave', resetDepth);
}
