const whatsappUrl = (message) => `https://wa.me/5538991281610?text=${encodeURIComponent(message)}`;

// Menu do celular.
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

function setMenu(open) {
  mainNav.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}

menuToggle.addEventListener('click', () => setMenu(!mainNav.classList.contains('open')));
mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

// Links "Pedir orcamento" ja abrem o WhatsApp com o servico escrito.
document.querySelectorAll('[data-service]').forEach((link) => {
  link.href = whatsappUrl(`Olá, vim pelo site e gostaria de um orçamento de ${link.dataset.service}.`);
});

// Mostra os elementos uma vez, quando entram na tela.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.section-heading, .service-card, .steps li, .work, .contact-info, .contact-form').forEach((item) => {
  // Atraso pequeno entre itens vizinhos da mesma grade.
  const index = Array.from(item.parentElement.children).indexOf(item);
  item.style.transitionDelay = `${(index % 4) * 70}ms`;
  item.classList.add('reveal');
  revealObserver.observe(item);
});

// Galeria dos projetos: abre as fotos e o video de cada card em tela cheia.
const lightbox = document.querySelector('#lightbox');
const stage = lightbox.querySelector('.lightbox-stage');
const [captionTitle, captionCount] = lightbox.querySelectorAll('.lightbox-caption > *');
const prevButton = lightbox.querySelector('.lightbox-prev');
const nextButton = lightbox.querySelector('.lightbox-next');
let gallery = [];
let current = 0;

function showMedia(index) {
  current = (index + gallery.length) % gallery.length;
  const src = gallery[current];
  const media = document.createElement(src.endsWith('.mp4') ? 'video' : 'img');
  media.src = src;
  if (media.tagName === 'VIDEO') {
    media.controls = true;
    media.autoplay = true;
    media.playsInline = true;
  } else {
    media.alt = captionTitle.textContent;
  }
  stage.replaceChildren(media);
  captionCount.textContent = gallery.length > 1 ? `${current + 1} de ${gallery.length}` : '';
}

document.querySelectorAll('.work-open').forEach((button) => {
  button.addEventListener('click', () => {
    gallery = button.dataset.media.split(' ');
    captionTitle.textContent = button.querySelector('strong').textContent;
    prevButton.hidden = nextButton.hidden = gallery.length < 2;
    showMedia(0);
    lightbox.showModal();
  });
});

prevButton.addEventListener('click', () => showMedia(current - 1));
nextButton.addEventListener('click', () => showMedia(current + 1));
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
// Fecha ao clicar fora da foto e para o video ao fechar.
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox || event.target === stage) lightbox.close();
});
lightbox.addEventListener('close', () => stage.replaceChildren());
lightbox.addEventListener('keydown', (event) => {
  if (gallery.length < 2) return;
  if (event.key === 'ArrowLeft') showMedia(current - 1);
  if (event.key === 'ArrowRight') showMedia(current + 1);
});

// Formulario: valida e abre a conversa no WhatsApp.
const contactForm = document.querySelector('#contact-form');
const formNote = document.querySelector('#form-note');
const fields = contactForm.elements;

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const required = [fields.name, fields.service];
  const missing = required.filter((field) => !field.value.trim());

  required.forEach((field) => field.classList.toggle('invalid', missing.includes(field)));
  formNote.classList.toggle('error', missing.length > 0);
  if (missing.length) {
    formNote.textContent = 'Preencha seu nome e escolha um serviço.';
    missing[0].focus();
    return;
  }

  const car = fields.car.value.trim();
  const extra = fields.message.value.trim();
  let text = `Olá, sou ${fields.name.value.trim()}. Tenho interesse em ${fields.service.value}.`;
  if (car) text += ` Meu carro: ${car}.`;
  if (extra) text += ` ${extra}`;

  formNote.textContent = 'Abrindo o WhatsApp...';
  const url = whatsappUrl(text);
  // Se o navegador bloquear a nova aba, abre na mesma.
  if (!window.open(url, '_blank')) window.location.href = url;
});

contactForm.addEventListener('input', (event) => event.target.classList.remove('invalid'));

document.querySelector('#year').textContent = new Date().getFullYear();
