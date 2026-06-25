/* ===================================================
   Zapillo Habitaciones — script.js
   Módulos:
   1. Init
   2. Cursor personalizado
   3. Header scroll + menú móvil + nav activa
   4. Animaciones de entrada (IntersectionObserver)
   5. Filtros de habitaciones
   6. Galería strip + lightbox
   7. Acordeón FAQ
   8. Sticky CTA móvil
   9. Campos condicionales del formulario
   10. Validaciones del formulario
   11. Envío del formulario
   12. ROOMS_DATA — datos y fotos de cada estancia
   13. Modal de estancia
   =================================================== */

'use strict';

// ===== INICIO INIT =====
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  initCursor();
  initHeader();
  initScrollAnimations();
  initRoomFilters();
  initLightbox();
  initFAQ();
  initStickyCTA();
  initFormConditionals();
  initFormValidation();
  initSmoothAnchors();
  initParallax();
  initLang();
  initRoomModal();   // ← nuevo
});

const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
// ===== FIN INIT =====


// ===== INICIO ROOMS_DATA =====
/*
  CÓMO EDITAR FOTOS Y DESCRIPCIONES:
  - Cada entrada tiene un "id" que coincide con data-room="..." en el HTML
  - "cover" = foto portada de la tarjeta
  - "photos" = array con TODAS las fotos del modal, en orden de preferencia
  - "desc" = descripción visible en el modal
  - "specs" = lista de iconos Lucide + texto
  - "price"/"priceNote" = precio (solo habitaciones)
  - Para añadir/quitar fotos: edita el array photos[]
*/
const ROOMS_DATA = {

  // ── HABITACIONES ──────────────────────────────────────────────

  boris: {
    type: 'room',
    label: 'Habitación',
    name: 'Habitación Boris',
    price: '300€',
    priceNote: '/mes',
    cover: 'fotos/hab_boris.jpg',
    photos: [
      'fotos/hab_boris.jpg',
      'fotos/hab_boris_2.jpg',
      'fotos/hab_boris_3.jpg',
      'fotos/hab_boris_4.jpg',
      'fotos/hab_boris_5.jpg',
      'fotos/hab_boris_6.jpg',
      'fotos/hab_boris_7.jpg',
    ],
    desc: 'Habitación luminosa con vistas al mar y a la playa de El Zapillo. Cama de 90 cm, escritorio con lámpara, armario con espejo y ventana de doble acristalamiento. Llave propia incluida.',
    specs: [
      { icon: 'bed-single', text: 'Cama 90 cm' },
      { icon: 'monitor',    text: 'Escritorio + lámpara' },
      { icon: 'archive',    text: 'Armario con espejo' },
      { icon: 'waves',      text: 'Vistas al mar · Ventana climalit' },
      { icon: 'key',        text: 'Llave propia' },
      { icon: 'sun',        text: 'Mucha luz natural' },
    ],
  },

  mette: {
    type: 'room',
    label: 'Habitación',
    name: 'Habitación Mette',
    price: '325€',
    priceNote: '/mes',
    cover: 'fotos/hab_mette.jpg',
    photos: [
      'fotos/Habitacion_Mette.jpg',
      'fotos/Habitacion_Mette2.jpg',
      'fotos/Habitacion_Mette3.jpg',
    ],
    desc: 'Habitación tranquila con cama de 135 cm, armario espacioso y escritorio. Ideal para estancias largas. Buena luz y ventana exterior climalit. Llave propia incluida.',
    specs: [
      { icon: 'bed-double', text: 'Cama 135 cm' },
      { icon: 'archive',    text: 'Armario con espejo' },
      { icon: 'monitor',    text: 'Escritorio + lámpara' },
      { icon: 'sun',        text: 'Ventana climalit exterior' },
      { icon: 'key',        text: 'Llave propia' },
    ],
  },

  freddy: {
    type: 'room',
    label: 'Habitación',
    name: 'Habitación Freddy',
    price: '300€',
    priceNote: '/mes',
    cover: 'fotos/hab_freddy.jpg',
    photos: [
      'fotos/hab_freddy.jpg',
      'fotos/hab_freddy_2.jpg',
      'fotos/hab_freddy_3.jpg',
      'fotos/hab_freddy_4.jpg',
      'fotos/hab_freddy_5.jpg',
      'fotos/hab_freddy_6.jpg',
      'fotos/hab_freddy_7.jpg',
    ],
    desc: 'Habitación con vistas al mar, cama de 90 cm y escritorio con lámpara. Tranquila, bien orientada y con armario con espejo. Llave propia incluida.',
    specs: [
      { icon: 'bed-single', text: 'Cama 90 cm' },
      { icon: 'monitor',    text: 'Escritorio con lámpara' },
      { icon: 'archive',    text: 'Armario con espejo' },
      { icon: 'waves',      text: 'Vistas al mar · Ventana climalit' },
      { icon: 'key',        text: 'Llave propia' },
    ],
  },

  margaux: {
    type: 'room',
    label: 'Habitación',
    name: 'Habitación Margaux',
    price: '325€',
    priceNote: '/mes',
    cover: 'fotos/hab_margaux.jpg',
    photos: [
      'fotos/hab_margaux.jpg',
      'fotos/hab_margaux_2.jpg',
      'fotos/hab_margaux_3.jpg',
      'fotos/hab_margaux_4.jpg',
      'fotos/hab_margaux_5.jpg',
      'fotos/hab_margaux_6.jpg',
      'fotos/hab_margaux_7.jpg',
      'fotos/hab_margaux_8.jpg',
      'fotos/hab_margaux_9.jpg',
      'fotos/hab_margaux_10.jpg',
      'fotos/hab_margaux_11.jpg',
    ],
    desc: 'La habitación más grande del piso. Cama de 135 cm, vistas al mar, escritorio y armario con espejo. Perfecta para quien quiere espacio y comodidad. Llave propia incluida.',
    specs: [
      { icon: 'bed-double', text: 'Cama 135 cm' },
      { icon: 'monitor',    text: 'Escritorio + lámpara' },
      { icon: 'archive',    text: 'Armario con espejo' },
      { icon: 'waves',      text: 'Vistas al mar · Ventana climalit' },
      { icon: 'key',        text: 'Llave propia' },
    ],
  },

  // ── ZONAS COMUNES ─────────────────────────────────────────────

  salon: {
    type: 'common',
    label: 'Zona común',
    name: 'Salón',
    cover: 'fotos/salon_2.jpg',
    photos: [
      'fotos/salon_2.jpg',
      'fotos/salon.jpg',
      'fotos/salon_3.jpg',
      'fotos/salon_4.jpg',
    ],
    desc: 'Salón comedor con mesa, sofá y TV. Acceso directo a la terraza con vistas al mar. Buena luz natural y espacio para estar cómodo con los compañeros de piso.',
    specs: [
      { icon: 'sofa',    text: 'Sofá + mesa de comedor' },
      { icon: 'tv',      text: 'Televisión' },
      { icon: 'waves',   text: 'Acceso a terraza con vistas al mar' },
      { icon: 'sun',     text: 'Mucha luz natural' },
    ],
  },

  cocina: {
    type: 'common',
    label: 'Zona común',
    name: 'Cocina',
    cover: 'fotos/cocina.jpg',
    photos: [
      'fotos/cocina.jpg',
      'fotos/cocina_2.jpg',
      'fotos/cocina_3.jpg',
      'fotos/cocina_4.jpg',
      'fotos/cocina_5.jpg',
      'fotos/cocina_6.jpg',
    ],
    desc: 'Cocina totalmente equipada con todo lo necesario para el día a día: nevera grande, cocina de inducción, lavavajillas, microondas y utensilios completos.',
    specs: [
      { icon: 'zap',      text: 'Cocina de inducción' },
      { icon: 'sparkles', text: 'Lavavajillas' },
      { icon: 'utensils', text: 'Microondas + utensilios' },
      { icon: 'archive',  text: 'Nevera grande' },
    ],
  },

  'bano-pasillo': {
    type: 'common',
    label: 'Baño',
    name: 'Baño Pasillo',
    cover: 'fotos/bano_pasillo.jpg',
    photos: [
      'fotos/bano_pasillo.jpg',
      'fotos/bano_pasillo_2.jpg',
      'fotos/bano_pasillo_3.jpg',
    ],
    desc: 'Baño completo situado en el pasillo, accesible desde todas las habitaciones. Ducha, lavabo, inodoro y espejo. Bien ventilado y mantenido.',
    specs: [
      { icon: 'droplets', text: 'Ducha · Lavabo · Espejo' },
      { icon: 'wind',     text: 'Bien ventilado' },
      { icon: 'users',    text: 'Acceso desde todas las habitaciones' },
    ],
  },

  bano: {
    type: 'common',
    label: 'Baño',
    name: 'Baño',
    cover: 'fotos/bano.jpg',
    photos: [
      'fotos/bano.jpg',
      'fotos/bano_2.jpg',
      'fotos/bano_3.jpg',
    ],
    desc: 'Segundo baño del piso. Completo con ducha, lavabo, inodoro y espejo. Dos baños para cuatro personas significa menos esperas y más comodidad en el día a día.',
    specs: [
      { icon: 'droplets', text: 'Ducha · Lavabo · Espejo' },
      { icon: 'users',    text: '2 baños para 4 personas' },
      { icon: 'wind',     text: 'Bien ventilado' },
    ],
  },

  terraza: {
    type: 'common',
    label: 'Exterior',
    name: 'Terraza',
    cover: 'fotos/Vistas_tarde.jpg',
    photos: [
      'fotos/Vistas_tarde.jpg',
      'fotos/Playa_avenida.jpg',
      'fotos/vistas_playa.jpg',
      'fotos/vistas4.jpg',
      'fotos/Vistas6.jpg',
      'fotos/Terraza.jpg',
      'fotos/Terraza1.jpg',
    ],
    desc: 'Terraza con vistas directas al mar y a la playa de El Zapillo. El sitio perfecto para desconectar, tomar el sol o estudiar al aire libre. La playa está literalmente enfrente.',
    specs: [
      { icon: 'waves',  text: 'Vistas al mar · Playa enfrente' },
      { icon: 'sun',    text: 'Soleada · Orientación sur' },
      { icon: 'wind',   text: 'Brisa mediterránea' },
    ],
  },

}; // fin ROOMS_DATA
// ===== FIN ROOMS_DATA =====


// ===== INICIO MODAL DE ESTANCIA =====
function initRoomModal() {
  const modal     = qs('#roomModal');
  const backdrop  = qs('#roomModalBackdrop');
  const closeBtn  = qs('#roomModalClose');
  if (!modal) return;

  let currentPhotos = [];
  let currentIdx    = 0;

  // Abrir modal desde tarjetas de habitación (botón "Ver fotos y detalles")
  qsa('[data-room]').forEach(trigger => {
    trigger.addEventListener('click', e => {
      // Solo si es botón .room-cta-gallery o .space-card (no los links de solicitar)
      if (trigger.classList.contains('room-cta-gallery') || trigger.classList.contains('space-card')) {
        e.preventDefault();
        openModal(trigger.dataset.room);
      }
    });
  });

  // Cerrar con botón, backdrop o Escape
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  qs('#roomModalPrev').addEventListener('click', () => navigate(-1));
  qs('#roomModalNext').addEventListener('click', () => navigate(1));

  function openModal(roomId) {
    const data = ROOMS_DATA[roomId];
    if (!data) return;

    // Rellenar info
    qs('#roomModalEyebrow').textContent = data.label;
    qs('#roomModalTitle').textContent   = data.name;
    qs('#roomModalDesc').textContent    = data.desc;

    // Precio (solo si es habitación)
    const priceWrap = qs('#roomModalPriceWrap');
    if (data.price) {
      priceWrap.innerHTML = `<div class="price-tag-modal">${data.price}<span>${data.priceNote}</span></div>`;
      priceWrap.style.display = 'block';
    } else {
      priceWrap.style.display = 'none';
    }

    // Specs
    const specsList = qs('#roomModalSpecs');
    specsList.innerHTML = data.specs.map(s =>
      `<li>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <use href="#icon-${s.icon}"/>
        </svg>
        ${s.text}
      </li>`
    ).join('');
    // Re-render Lucide icons inside modal
    if (window.lucide) lucide.createIcons({ nodes: [specsList] });

    // Fotos
    currentPhotos = data.photos || [data.cover];
    currentIdx    = 0;
    renderPhoto();
    renderThumbs();

    // CTA link
    qs('#roomModalCta').href = '#formulario';
    if (data.type === 'common') {
      qs('#roomModalCta').textContent = 'Preguntar por el piso →';
    } else {
      qs('#roomModalCta').textContent = 'Solicitar esta habitación →';
    }

    modal.removeAttribute('aria-hidden');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Cerrar modal al clickar el CTA (va al formulario)
    qs('#roomModalCta').addEventListener('click', closeModal, { once: true });
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function renderPhoto() {
    const img     = qs('#roomModalMainImg');
    const counter = qs('#roomModalCounter');
    img.src = currentPhotos[currentIdx];
    img.alt = `Foto ${currentIdx + 1}`;
    counter.textContent = `${currentIdx + 1} / ${currentPhotos.length}`;

    // Actualizar miniatura activa
    qsa('.room-modal-thumb').forEach((t, i) => {
      t.classList.toggle('active', i === currentIdx);
    });

    // Ocultar flechas si solo hay 1 foto
    const showNav = currentPhotos.length > 1;
    qs('#roomModalPrev').style.display = showNav ? '' : 'none';
    qs('#roomModalNext').style.display = showNav ? '' : 'none';
  }

  function renderThumbs() {
    const thumbsWrap = qs('#roomModalThumbs');
    thumbsWrap.innerHTML = currentPhotos.map((src, i) =>
      `<img src="${src}" alt="Miniatura ${i+1}" class="room-modal-thumb${i === 0 ? ' active' : ''}" data-idx="${i}" loading="lazy"/>`
    ).join('');
    thumbsWrap.querySelectorAll('.room-modal-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        currentIdx = parseInt(thumb.dataset.idx);
        renderPhoto();
      });
    });
  }

  function navigate(dir) {
    currentIdx = (currentIdx + dir + currentPhotos.length) % currentPhotos.length;
    renderPhoto();
  }
}
// ===== FIN MODAL DE ESTANCIA =====




// ===== INICIO CURSOR PERSONALIZADO =====
function initCursor() {
  const cursor   = qs('#cursor');
  const follower = qs('#cursorFollower');
  if (!cursor || !follower) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  // Follower con lag suave
  function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Expandir cursor en elementos interactivos
  const hoverEls = qsa('a, button, .room-card, .gallery-img, .gallery-strip-item, .filt, .faq-q');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
  });
}
// ===== FIN CURSOR =====


// ===== INICIO HEADER =====
function initHeader() {
  const header    = qs('.site-header');
  const toggle    = qs('#menuToggle');
  const mobileMenu = qs('#mobileMenu');
  const mobLinks  = qsa('.mob-link');
  const navLinks  = qsa('.nav-link');

  // Scroll: clase scrolled + actualizar nav activa
  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNav();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menú hamburguesa
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
      mobileMenu.setAttribute('aria-hidden', !open);
    });
    mobLinks.forEach(l => l.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    }));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        toggle.focus();
      }
    });
  }

  // Enlace activo según sección
  function updateActiveNav() {
    const sections = qsa('section[id]');
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 80 && top > -sec.offsetHeight) {
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + sec.id));
      }
    });
  }
}
// ===== FIN HEADER =====


// ===== INICIO SMOOTH ANCHORS =====
function initSmoothAnchors() {
  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = qs(href);
      if (!target) return;
      e.preventDefault();
      const offset = (qs('.site-header')?.offsetHeight ?? 64) + 16;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });
}
// ===== FIN SMOOTH ANCHORS =====


// ===== INICIO SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const els = qsa('[data-animate]');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}
// ===== FIN SCROLL ANIMATIONS =====


// ===== INICIO FILTROS HABITACIONES =====
function initRoomFilters() {
  const btns  = qsa('.filt');
  const cards = qsa('.room-card');
  if (!btns.length) return;

  btns.forEach(btn => btn.addEventListener('click', () => {
    btns.forEach(b => { b.classList.toggle('active', b === btn); b.setAttribute('aria-selected', b === btn); });
    const f = btn.dataset.filter;
    cards.forEach(c => c.classList.toggle('hidden', f !== 'all' && c.dataset.type !== f));
  }));
}
// ===== FIN FILTROS =====


// ===== INICIO LIGHTBOX =====
// Fotos del piso en el orden en que aparecen en las galerías
const galleryImages = [
  { src: 'fotos/Playa_avenida.jpg',        alt: 'Playa del Zapillo — panorámica' },
  { src: 'fotos/Playa.jpg',                alt: 'Playa del Zapillo' },
  { src: 'fotos/Playa_palmeral.jpg',       alt: 'Playa con palmeral' },
  { src: 'fotos/playa_1.jpg',              alt: 'Playa con velero' },
  { src: 'fotos/Terraza1.jpg',             alt: 'Terraza con vistas al mar' },
  { src: 'fotos/Vistas1.jpg',              alt: 'Mar desde la terraza' },
  { src: 'fotos/vistas2.jpg',              alt: 'Vistas al mar desde la ventana' },
  { src: 'fotos/vistas_playa.jpg',         alt: 'El mar al lado' },
  { src: 'fotos/Puerto_Almeria.jpeg',      alt: 'Puerto de Almería al amanecer' },
  { src: 'fotos/IMG-20180903-WA0063.jpg',  alt: 'Salón comedor' },
  { src: 'fotos/IMG-20180903-WA0042.jpg',  alt: 'Salón con decoración' },
  { src: 'fotos/IMG-20180903-WA0010.jpg',  alt: 'Salón con terraza' },
  { src: 'fotos/IMG-20180903-WA0050.jpg',  alt: 'Baño moderno' },
  { src: 'fotos/IMG-20180903-WA0031.jpg',  alt: 'Baño principal' },
  { src: 'fotos/IMG-20180903-WA0055.jpg',  alt: 'Cocina equipada' },
  { src: 'fotos/IMG-20180903-WA0049.jpg',  alt: 'Habitación Mette' },
  { src: 'fotos/IMG-20180903-WA0023.jpg',  alt: 'Habitación Boris' },
  { src: 'fotos/IMG-20180903-WA0000.jpg',  alt: 'Habitación Freddy' },
  { src: 'fotos/IMG-20180903-WA0001.jpg',  alt: 'Habitación Margaux' },
];

let currentIdx = 0;

function initLightbox() {
  const lb      = qs('#lightbox');
  const img     = qs('#lightboxImg');
  const closeBtn = qs('#lightboxClose');
  const prevBtn = qs('#lightboxPrev');
  const nextBtn = qs('#lightboxNext');
  if (!lb) return;

  function openLightbox(idx) {
    currentIdx = Math.max(0, Math.min(idx, galleryImages.length - 1));
    img.src = galleryImages[currentIdx].src;
    img.alt = galleryImages[currentIdx].alt;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    currentIdx = (currentIdx + dir + galleryImages.length) % galleryImages.length;
    img.src = galleryImages[currentIdx].src;
    img.alt = galleryImages[currentIdx].alt;
  }

  // Click en imágenes de galería
  qsa('.gallery-img, .gallery-strip-item img').forEach((el, i) => {
    el.addEventListener('click', () => openLightbox(i));
  });

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', () => navigate(-1));
  nextBtn?.addEventListener('click', () => navigate(1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
}
// ===== FIN LIGHTBOX =====


// ===== INICIO ACORDEÓN FAQ =====
function initFAQ() {
  qsa('.faq-item').forEach(item => {
    const q = qs('.faq-q', item);
    const a = qs('.faq-a', item);
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const open = q.getAttribute('aria-expanded') === 'true';
      // Cerrar todos
      qsa('.faq-item').forEach(other => {
        const oq = qs('.faq-q', other);
        const oa = qs('.faq-a', other);
        if (oq && oa && oq !== q) { oq.setAttribute('aria-expanded', 'false'); oa.hidden = true; }
      });
      q.setAttribute('aria-expanded', !open);
      a.hidden = open;
    });
  });
}
// ===== FIN FAQ =====


// ===== INICIO STICKY CTA MÓVIL =====
function initStickyCTA() {
  const cta  = qs('#stickyCta');
  const hero = qs('#hero');
  const form = qs('#formulario');
  if (!cta || !hero) return;

  const update = () => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) { cta.classList.remove('show'); return; }
    const heroPast = hero.getBoundingClientRect().bottom < 0;
    const formVis  = form ? form.getBoundingClientRect().top > window.innerHeight : true;
    cta.classList.toggle('show', heroPast && formVis);
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}
// ===== FIN STICKY CTA MÓVIL =====




// ===== INICIO CAMPOS CONDICIONALES =====
function initFormConditionals() {
  const radios = qsa('input[name="viaje"]');
  const group  = qs('#acompanantesGroup');
  const numEl  = qs('#acompanantes');
  if (!radios.length || !group) return;

  radios.forEach(r => r.addEventListener('change', () => {
    const withFriends = r.value === 'amigos' && r.checked;
    group.hidden = !withFriends;
    if (numEl) {
      numEl.required = withFriends;
      numEl.setAttribute('aria-required', withFriends);
      if (withFriends) numEl.focus();
      else { numEl.value = ''; clearErr(numEl); }
    }
  }));
}
// ===== FIN CAMPOS CONDICIONALES =====


// ===== INICIO VALIDACIONES =====

function showErr(input, msg) {
  const err = qs(`#${input.id}-err`);
  input.classList.add('error'); input.classList.remove('valid');
  if (err) err.textContent = msg;
}
function showOk(input) {
  const err = qs(`#${input.id}-err`);
  input.classList.remove('error'); input.classList.add('valid');
  if (err) err.textContent = '';
}
function clearErr(input) {
  const err = input.id ? qs(`#${input.id}-err`) : null;
  input.classList.remove('error', 'valid');
  if (err) err.textContent = '';
}
const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const isPhone = v => /^\d{7,15}$/.test(v.replace(/[\s\-().]/g, ''));

function vRequired(el, label) {
  if (!el.value.trim()) { showErr(el, `${label} es obligatorio.`); return false; }
  showOk(el); return true;
}
function vEmail(el, label = 'El email') {
  if (!el.value.trim()) { showErr(el, `${label} es obligatorio.`); return false; }
  if (!isEmail(el.value)) { showErr(el, 'Introduce un email válido.'); return false; }
  showOk(el); return true;
}
function vEmailOpt(el) {
  if (!el.value.trim()) { clearErr(el); return true; }
  if (!isEmail(el.value)) { showErr(el, 'Email institucional inválido (ej: ori@uni.edu).'); return false; }
  showOk(el); return true;
}
function vPhone(el) {
  if (!el.value.trim()) { showErr(el, 'El teléfono es obligatorio.'); return false; }
  if (!isPhone(el.value)) { showErr(el, 'Solo dígitos, mínimo 7 (sin espacios ni prefijo).'); return false; }
  showOk(el); return true;
}
function vSelect(el, label) {
  if (!el.value) { showErr(el, `Selecciona ${label}.`); return false; }
  showOk(el); return true;
}
function vDates(llegada, salida) {
  if (!llegada.value) { showErr(llegada, 'La fecha de llegada es obligatoria.'); return false; }
  showOk(llegada);
  if (!salida.value) { showErr(salida, 'La fecha de salida es obligatoria.'); return false; }
  if (new Date(salida.value) <= new Date(llegada.value)) { showErr(salida, 'La salida debe ser posterior a la llegada.'); return false; }
  showOk(llegada); showOk(salida); return true;
}
function vPresupuesto(el) {
  const v = Number(el.value);
  if (!el.value.trim()) { showErr(el, 'Indica tu presupuesto mensual.'); return false; }
  if (isNaN(v) || v <= 0) { showErr(el, 'Introduce un número positivo en euros.'); return false; }
  showOk(el); return true;
}
function vRadioViaje() {
  const checked = qsa('input[name="viaje"]').find(r => r.checked);
  const err = qs('#viaje-err');
  if (!checked) { if (err) err.textContent = 'Indica si viajas solo o acompañado.'; return false; }
  if (err) err.textContent = ''; return true;
}
function vAcompanantes() {
  const g = qs('#acompanantesGroup');
  const el = qs('#acompanantes');
  if (!g || g.hidden) return true;
  if (!el.value || Number(el.value) < 1) { showErr(el, 'Indica cuántos amigos te acompañan.'); return false; }
  showOk(el); return true;
}
function vPrivacidad() {
  const cb = qs('#privacidad');
  const err = qs('#privacidad-err');
  if (!cb.checked) { if (err) err.textContent = 'Debes aceptar la política de privacidad.'; return false; }
  if (err) err.textContent = ''; return true;
}
// ===== FIN VALIDACIONES =====


// ===== INICIO FORMULARIO =====
function initFormValidation() {
  const form = qs('#leadForm');
  if (!form) return;

  // Validación en tiempo real al salir del campo
  form.addEventListener('focusout', e => {
    const el = e.target;
    if (!el || el.tagName === 'FIELDSET') return;
    liveValidate(el);
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    handleSubmit(form);
  });
}

function liveValidate(el) {
  switch (el.id) {
    case 'nombre':        vRequired(el, 'El nombre'); break;
    case 'apellidos':     vRequired(el, 'Los apellidos'); break;
    case 'email':         vEmail(el); break;
    case 'pais':          vRequired(el, 'El país'); break;
    case 'universidadOrigen': vRequired(el, 'La universidad de origen'); break;
    case 'facultad':      vRequired(el, 'La carrera'); break;
    case 'emailRRII':     vEmailOpt(el); break;
    case 'universidadDestino': vSelect(el, 'la universidad'); break;
    case 'cursoAcademico':     vSelect(el, 'el curso'); break;
    case 'fechaLlegada': {
      if (!el.value) showErr(el, 'La fecha de llegada es obligatoria.'); else showOk(el);
      break;
    }
    case 'duracion':      vSelect(el, 'la duración'); break;
    case 'acompanantes':  vAcompanantes(); break;
  }
}

function handleSubmit(form) {
  const errs = [
    vRequired(qs('#nombre'), 'El nombre'),
    vRequired(qs('#apellidos'), 'Los apellidos'),
    vEmail(qs('#email')),
    vRequired(qs('#pais'), 'El país'),
    vRequired(qs('#universidadOrigen'), 'La universidad'),
    vRequired(qs('#facultad'), 'La carrera'),
    vEmailOpt(qs('#emailRRII')),
    vSelect(qs('#universidadDestino'), 'la universidad'),
    vSelect(qs('#cursoAcademico'), 'el curso'),
    vRequired(qs('#fechaLlegada'), 'La fecha de llegada'),
    vSelect(qs('#duracion'), 'la duración'),
    vRadioViaje(),
    vAcompanantes(),
    vPrivacidad(),
  ];

  const hasErrors = errs.includes(false);

  const summary = qs('#errorSummary');
  const errList = qs('#errorList');

  if (hasErrors) {
    if (summary && errList) {
      errList.innerHTML = '';
      qsa('[role="alert"]', form).forEach(el => {
        if (el.textContent.trim()) {
          const li = document.createElement('li');
          li.textContent = el.textContent.trim();
          errList.appendChild(li);
        }
      });
      if (errList.children.length) {
        summary.hidden = false;
        summary.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    return;
  }

  if (summary) summary.hidden = true;

  const btn = qs('#submitBtn');
  if (btn) { btn.disabled = true; qs('.btn-submit-text', btn).textContent = 'Enviando...'; }

  const data = Object.fromEntries(new FormData(form).entries());

  /*
  ============================================================
  CONECTAR CON TU BACKEND AQUÍ:
  Ejemplo básico con fetch:

  fetch('/api/reserva', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(r => r.json())
  .then(() => onSuccess(form, btn))
  .catch(err => onError(btn, err));

  También puedes usar:
  - Formspree (gratis): action="https://formspree.io/f/XXXX"
  - Zapier Webhooks
  - EmailJS
  ============================================================
  */

  console.log('Solicitud:', data); // Quitar en producción

  // Simulación de envío exitoso (reemplaza con el fetch real)
  setTimeout(() => onSuccess(form, btn), 1200);
}

function onSuccess(form, btn) {
  form.classList.add('form-hidden');
  const msg = qs('#successMessage');
  if (msg) { msg.hidden = false; msg.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  if (btn) { btn.disabled = false; qs('.btn-submit-text', btn).textContent = 'Enviar solicitud'; }
  if (window.lucide) lucide.createIcons();
}

function onError(btn, err) {
  console.error(err);
  if (btn) { btn.disabled = false; qs('.btn-submit-text', btn).textContent = 'Enviar solicitud'; }
  alert('Ha ocurrido un error. Por favor, escríbenos directamente por WhatsApp.');
}
// ===== FIN FORMULARIO =====


// ===== Re-init iconos al cargar =====
window.addEventListener('load', () => {
  if (window.lucide) lucide.createIcons();
  setTimeout(() => { if (window.lucide) lucide.createIcons(); }, 300);
});


// ===== INICIO PARALLAX =====
function initParallax() {
  const img = qs('.hero-img');
  if (!img) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight) return;
    img.style.transform = `translateY(${window.scrollY * 0.12}px) scale(1.04)`;
  }, { passive: true });
}
// ===== FIN PARALLAX =====


// ===== INICIO MULTIIDIOMA =====
const TRANSLATIONS = {
  es: {
    'nav.rooms':      'Habitaciones',
    'nav.flat':       'El piso',
    'nav.costs':      'Gastos',
    'nav.book':       'Reservar',
    'nav.faq':        'FAQ',
    'hero.pill':      'Solo quedan <strong>2 habitaciones</strong> para septiembre',
    'hero.title':     'Tu piso en<br/><span class="hero-title-highlight">El Zapillo</span><br/>te espera',
    'hero.sub':       'Habitaciones para estudiantes en Almería. Equipadas, a 10 min de la UAL en bus, ambiente tranquilo. Sin sorpresas.',
    'hero.cta1':      'Pedir información',
    'hero.cta2':      'Ver habitaciones ↓',
    'rooms.eyebrow':  'Las habitaciones',
    'rooms.title':    'Elige la tuya',
    'rooms.sub':      'Todas amuebladas con escritorio, armario y luz natural. Revisa disponibilidad antes de contactar.',
    'filter.all':     'Todas',
    'filter.single':  'Cama 90',
    'filter.double':  'Cama 135',
    'apt.eyebrow':    'El piso',
    'apt.title':      'Lo que hay, claro',
    'apt.sub':        'Sin adornos. Aquí tienes exactamente lo que ves.',
    'costs.eyebrow':  'Transparencia total',
    'costs.title':    'Los gastos, sin letra pequeña',
    'loc.eyebrow':    'Dónde estamos',
    'loc.title':      'El Zapillo, Almería',
    'loc.sub':        'Uno de los barrios más cómodos para estudiantes de la UAL. Cerca de todo.',
    'proc.eyebrow':   'Sin complicaciones',
    'proc.title':     'Así se reserva',
    'living.eyebrow': 'El ambiente',
    'living.title':   '¿Encajas aquí?',
    'faq.eyebrow':    'Preguntas frecuentes',
    'faq.title':      'Todo lo que quieres saber',
    'form.eyebrow':   'Solicitar información',
    'form.title':     'Cuéntanos<br/>quién eres',
    'btn.request':    'Solicitar',
    'btn.waitlist':   'Apuntarse a lista de espera',
    'available':      'Disponible',
    'reserved':       'Reservada',
  },
  en: {
    'nav.rooms':      'Rooms',
    'nav.flat':       'The flat',
    'nav.costs':      'Costs',
    'nav.book':       'Book',
    'nav.faq':        'FAQ',
    'hero.pill':      'Only <strong>2 rooms</strong> left for September',
    'hero.title':     'Your flat in<br/><span class="hero-title-highlight">El Zapillo</span><br/>is waiting',
    'hero.sub':       'Student rooms in Almería. Fully furnished, 10 min by bus to UAL, quiet atmosphere. No surprises.',
    'hero.cta1':      'Request info',
    'hero.cta2':      'View rooms ↓',
    'rooms.eyebrow':  'The rooms',
    'rooms.title':    'Choose yours',
    'rooms.sub':      'All furnished with desk, wardrobe and natural light. Check availability before contacting.',
    'filter.all':     'All',
    'filter.single':  '90 cm bed',
    'filter.double':  '135 cm bed',
    'apt.eyebrow':    'The flat',
    'apt.title':      'What you get, plain and simple',
    'apt.sub':        'No frills. This is exactly what you see.',
    'costs.eyebrow':  'Full transparency',
    'costs.title':    'Costs, no small print',
    'loc.eyebrow':    'Where we are',
    'loc.title':      'El Zapillo, Almería',
    'loc.sub':        'One of the most convenient neighbourhoods for UAL students. Close to everything.',
    'proc.eyebrow':   'No hassle',
    'proc.title':     'How to book',
    'living.eyebrow': 'The vibe',
    'living.title':   'Do you fit in here?',
    'faq.eyebrow':    'Frequently asked questions',
    'faq.title':      'Everything you want to know',
    'form.eyebrow':   'Request information',
    'form.title':     'Tell us<br/>who you are',
    'btn.request':    'Request',
    'btn.waitlist':   'Join waiting list',
    'available':      'Available',
    'reserved':       'Reserved',
  },
  fr: {
    'nav.rooms':      'Chambres',
    'nav.flat':       "L'appartement",
    'nav.costs':      'Charges',
    'nav.book':       'Réserver',
    'nav.faq':        'FAQ',
    'hero.pill':      'Seulement <strong>2 chambres</strong> disponibles pour septembre',
    'hero.title':     'Ton appartement à<br/><span class="hero-title-highlight">El Zapillo</span><br/>t\'attend',
    'hero.sub':       'Chambres pour étudiants à Almería. Tout équipées, 10 min en bus de l\'UAL, ambiance calme. Sans surprises.',
    'hero.cta1':      'Demander infos',
    'hero.cta2':      'Voir les chambres ↓',
    'rooms.eyebrow':  'Les chambres',
    'rooms.title':    'Choisissez la vôtre',
    'rooms.sub':      'Toutes meublées avec bureau, armoire et lumière naturelle. Vérifiez la disponibilité avant de contacter.',
    'filter.all':     'Toutes',
    'filter.single':  'Lit 90',
    'filter.double':  'Lit 135',
    'apt.eyebrow':    "L'appartement",
    'apt.title':      'Ce qu\'il y a, clairement',
    'apt.sub':        'Sans fioritures. Voici exactement ce que vous voyez.',
    'costs.eyebrow':  'Transparence totale',
    'costs.title':    'Les charges, sans petits caractères',
    'loc.eyebrow':    'Où nous sommes',
    'loc.title':      'El Zapillo, Almería',
    'loc.sub':        "L'un des quartiers les plus pratiques pour les étudiants de l'UAL. Proche de tout.",
    'proc.eyebrow':   'Sans complications',
    'proc.title':     'Comment réserver',
    'living.eyebrow': "L'ambiance",
    'living.title':   'Vous correspondez ?',
    'faq.eyebrow':    'Questions fréquentes',
    'faq.title':      'Tout ce que vous voulez savoir',
    'form.eyebrow':   'Demande d\'information',
    'form.title':     'Dites-nous<br/>qui vous êtes',
    'btn.request':    'Demander',
    'btn.waitlist':   "S'inscrire sur liste d'attente",
    'available':      'Disponible',
    'reserved':       'Réservée',
  },
  de: {
    'nav.rooms':      'Zimmer',
    'nav.flat':       'Die Wohnung',
    'nav.costs':      'Kosten',
    'nav.book':       'Buchen',
    'nav.faq':        'FAQ',
    'hero.pill':      'Nur noch <strong>2 Zimmer</strong> für September verfügbar',
    'hero.title':     'Deine Wohnung in<br/><span class="hero-title-highlight">El Zapillo</span><br/>wartet auf dich',
    'hero.sub':       'Studentenzimmer in Almería. Vollmöbliert, 10 Min. mit dem Bus zur UAL, ruhige Atmosphäre. Keine Überraschungen.',
    'hero.cta1':      'Info anfragen',
    'hero.cta2':      'Zimmer ansehen ↓',
    'rooms.eyebrow':  'Die Zimmer',
    'rooms.title':    'Wähle deins',
    'rooms.sub':      'Alle möbliert mit Schreibtisch, Schrank und natürlichem Licht. Verfügbarkeit vor Kontaktaufnahme prüfen.',
    'filter.all':     'Alle',
    'filter.single':  '90 cm Bett',
    'filter.double':  '135 cm Bett',
    'apt.eyebrow':    'Die Wohnung',
    'apt.title':      'Was es gibt, klar und deutlich',
    'apt.sub':        'Kein Schnickschnack. Das siehst du genau so.',
    'costs.eyebrow':  'Volle Transparenz',
    'costs.title':    'Kosten, kein Kleingedrucktes',
    'loc.eyebrow':    'Wo wir sind',
    'loc.title':      'El Zapillo, Almería',
    'loc.sub':        'Einer der praktischsten Stadtteile für UAL-Studenten. In der Nähe von allem.',
    'proc.eyebrow':   'Unkompliziert',
    'proc.title':     'So buchst du',
    'living.eyebrow': 'Die Atmosphäre',
    'living.title':   'Passt du hierher?',
    'faq.eyebrow':    'Häufige Fragen',
    'faq.title':      'Alles, was du wissen möchtest',
    'form.eyebrow':   'Information anfragen',
    'form.title':     'Erzähl uns<br/>wer du bist',
    'btn.request':    'Anfragen',
    'btn.waitlist':   'Auf Warteliste setzen',
    'available':      'Verfügbar',
    'reserved':       'Reserviert',
  },
  it: {
    'nav.rooms':      'Camere',
    'nav.flat':       "L'appartamento",
    'nav.costs':      'Spese',
    'nav.book':       'Prenotare',
    'nav.faq':        'FAQ',
    'hero.pill':      'Solo <strong>2 camere</strong> disponibili per settembre',
    'hero.title':     'Il tuo appartamento a<br/><span class="hero-title-highlight">El Zapillo</span><br/>ti aspetta',
    'hero.sub':       'Camere per studenti ad Almería. Completamente arredate, 10 min in autobus alla UAL, ambiente tranquillo. Nessuna sorpresa.',
    'hero.cta1':      'Richiedi info',
    'hero.cta2':      'Vedi le camere ↓',
    'rooms.eyebrow':  'Le camere',
    'rooms.title':    'Scegli la tua',
    'rooms.sub':      'Tutte arredate con scrivania, armadio e luce naturale. Controlla la disponibilità prima di contattare.',
    'filter.all':     'Tutte',
    'filter.single':  'Letto 90',
    'filter.double':  'Letto 135',
    'apt.eyebrow':    "L'appartamento",
    'apt.title':      'Quello che c\'è, chiaro e semplice',
    'apt.sub':        'Senza fronzoli. Questo è esattamente quello che vedi.',
    'costs.eyebrow':  'Massima trasparenza',
    'costs.title':    'Le spese, senza sorprese',
    'loc.eyebrow':    'Dove siamo',
    'loc.title':      'El Zapillo, Almería',
    'loc.sub':        'Uno dei quartieri più comodi per gli studenti della UAL. Vicino a tutto.',
    'proc.eyebrow':   'Senza complicazioni',
    'proc.title':     'Come prenotare',
    'living.eyebrow': "L'atmosfera",
    'living.title':   'Fai al caso nostro?',
    'faq.eyebrow':    'Domande frequenti',
    'faq.title':      'Tutto quello che vuoi sapere',
    'form.eyebrow':   'Richiesta di informazioni',
    'form.title':     'Raccontaci<br/>chi sei',
    'btn.request':    'Richiedi',
    'btn.waitlist':   'Iscriviti alla lista d\'attesa',
    'available':      'Disponibile',
    'reserved':       'Riservata',
  }
};

let currentLang = 'es';

function initLang() {
  const saved = localStorage.getItem('piso18-lang');
  if (saved && TRANSLATIONS[saved]) setLang(saved, false);

  qsa('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang, true));
  });
}

function setLang(lang, save) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  if (save) localStorage.setItem('piso18-lang', lang);

  const t = TRANSLATIONS[lang];

  // Nav
  const navLinks = qsa('.nav-link');
  const keys = ['nav.rooms','nav.flat','nav.costs','nav.book','nav.faq'];
  navLinks.forEach((el, i) => { if (keys[i]) el.textContent = t[keys[i]]; });

  // Sections con data-i18n
  qsa('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Botón activo
  qsa('.lang-btn').forEach(btn => btn.classList.toggle('lang-active', btn.dataset.lang === lang));

  // Reinit iconos por si acaso
  if (window.lucide) setTimeout(() => lucide.createIcons(), 50);
}
// ===== FIN MULTIIDIOMA =====
