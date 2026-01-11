

// Slideshow Logic
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slideshow img");
    const prevBtn = document.querySelector(".slideshow .prev");
    const nextBtn = document.querySelector(".slideshow .next");
    const dotsContainer = document.querySelector(".slideshow .dots");
    if (!slides.length || !dotsContainer) return;

    let current = 0;
    let slideInterval;

    slides.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.className = "dot" + (index === 0 ? " active" : "");
        dot.addEventListener("click", () => showSlide(index));

        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".dot");

    function showSlide(index) {
        slides[current].classList.remove("active");
        dots[current].classList.remove("active");
        
        current = (index + slides.length) % slides.length;

        slides[current].classList.add("active");
        dots[current].classList.add("active");
        resetInterval();
    }

    function showNext() {
        showSlide(current + 1);
    }

    function showPrev() {
        showSlide(current - 1);
    }

    function startInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(showNext, 4000);
    }

    function resetInterval() {
        startInterval();
    }

    if (prevBtn) prevBtn.addEventListener("click", showPrev);
    if (nextBtn) nextBtn.addEventListener("click", showNext);

    slides[0].classList.add("active");
    startInterval();
});

// Competition Page animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.comp-section'); // select all content on comp page

    if (!sections.length) return;

    const io = new IntersectionObserver((entries) => {

        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('is-visible');
            else e.target.classList.remove('is-visible');
        });
    }, { root: document.querySelector(".comp-stack") || null, threshold: 0.55 });

    sections.forEach(s => io.observe(s));
});

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('nyCountdown');
  if (!root) return;

  const targetStr = root.getAttribute('data-target');
  const target = new Date(targetStr);

  const elDays = document.getElementById('nyDays');
  const elHours = document.getElementById('nyHours');
  const elMins = document.getElementById('nyMins');
  const elSecs = document.getElementById('nySecs');

  const pad2 = (n) => String(n).padStart(2, '0');
})


document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.page-hero');

    if (hero) {
        requestAnimationFrame(() => {
            hero.classList.add('is-inview');
        });
    }
});

// Gallery image loader
async function loadImageList(listUrl) {
    const res = await fetch(listUrl, { cache: "no-store" });
    const txt = await res.text();
    return txt
        .split(/\r?\n/)
        .map(s => s.trim())
        .filter(s => s && /\.(png|jpe?g|webp|gif)(\?.*)?$/i.test(s)); 
}


// Gallery Slideshow
// Gallery Slideshow (thumbs in grid, full in lightbox)
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('g6Grid');
  if (!grid) return;

  let msnry = null;

  function initMasonry() {
  if (!window.Masonry || !window.imagesLoaded) return;

  if (msnry) {
    msnry.destroy();
    msnry = null;
  }

  // Create Masonry immediately
  msnry = new Masonry(grid, {
    gutter: 14,
    itemSelector: '.g6-item',
    columnWidth: '.g6-item',
    percentPosition: true
  });

  // Re-layout AS EACH IMAGE LOADS
  imagesLoaded(grid)
    .on('progress', () => {
      if (msnry) msnry.layout();
    })
    .on('always', () => {
      if (msnry) msnry.layout();
    });
}



  // List filenames 
  const FILES = [
    'carolina-comp-01.webp',
    'carolina-comp-02.webp',
    'carolina-comp-03.webp',
    'carolina-comp-04.webp',
    'carolina-comp-05.webp',
    'carolina-comp-06.webp',
    'carolina-comp-07.webp',
    'carolina-comp-08.webp',
    'carolina-comp-09.webp',
    'carolina-comp-10.webp',
    'carolina-comp-11.webp',
    'carolina-comp-12.webp',
    'carolina-comp-13.webp',
    'carolina-comp-14.webp',
    'carolina-comp-15.webp',
    'carolina-comp-16.webp',
    'carolina-comp-17.webp',
    'carolina-comp-18.webp',
    'carolina-comp-19.webp',
    'carolina-comp-20.webp',
    'carolina-comp-21.webp',
    'carolina-comp-22.webp',
    'carolina-comp-23.webp',
    'carolina-comp-24.webp',
    'carolina-comp-25.webp',
    'carolina-comp-26.webp',
    'carolina-comp-27.webp',
    'carolina-comp-28.webp',
    'carolina-comp-29.webp',
    'carolina-comp-30.webp',
    'carolina-comp-31.webp',
    'carolina-comp-32.webp'
  ];

  const THUMB_BASE = '../assets/gallery/thumbs/';
  const FULL_BASE  = '../assets/gallery/full/';

  const PAGE_SIZE = 9;
  let page = 0;

  const prevBtn = document.querySelector('.g6-nav.prev');
  const nextBtn = document.querySelector('.g6-nav.next');

  // Lightbox refs
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbClose = lb?.querySelector('.lightbox-close');
  const lbPrev  = lb?.querySelector('.lightbox-prev');
  const lbNext  = lb?.querySelector('.lightbox-next');

  let lbIndex = 0;

  const pattern = ['is-big', 'is-tall', 'is-small', 'is-wide', 'is-small', 'is-tall'];

  function pages() {
    return Math.max(1, Math.ceil(FILES.length / PAGE_SIZE));
  }

  function thumbUrl(i) { return THUMB_BASE + FILES[i]; }
  function fullUrl(i)  { return FULL_BASE + FILES[i]; }

function mulberry32(seed) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickWeighted(rng, items) {
  const total = items.reduce((s, it) => s + it.w, 0);
  let r = rng() * total;
  for (const it of items) {
    r -= it.w;
    if (r <= 0) return it.v;
  }
  return items[items.length - 1].v;
}

  function renderPage(p) {
    const totalPages = pages();
    const start = (p % totalPages) * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, FILES.length);

    grid.innerHTML = '';

    const rng = mulberry32(12345 + p * 999); // stable per page
    const weights = [
      { v: 'is-big',  w: 1 },
      { v: 'is-wide', w: 2 },
      { v: 'is-tall', w: 2 },
      { v: 'is-small',w: 5 }
    ];


    for (let i = start; i < end; i++) {
      const cls = pickWeighted(rng, weights); // <-- you were missing this

      const btn = document.createElement('div');
      btn.className = `g6-item ${cls}`;
      btn.setAttribute('role', 'button');
      btn.tabIndex = 0;

      btn.dataset.full = fullUrl(i);
      btn.dataset.i = String(i);



      btn.innerHTML = `
        <img loading="eager" decoding="async"
             src="${thumbUrl(i)}"
             alt="Gallery image ${i + 1}">
      `;

      grid.appendChild(btn);
    }



    initMasonry();

  }

  grid.addEventListener('click', (e) => {
    const tile = e.target.closest('.g6-item');
    if (!tile) return;

    // This is the only truth that matters
    lbIndex = Number(tile.dataset.i);

    // Open the exact image you clicked
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('blurred');

    lbImg.src = tile.dataset.full;
  });





  function nextPage() { page = (page + 1) % pages(); renderPage(page); }
  function prevPage() { page = (page - 1 + pages()) % pages(); renderPage(page); }
  prevBtn?.addEventListener('click', prevPage);
  nextBtn?.addEventListener('click', nextPage);

  function openLightbox(i) {
    lbIndex = i;

    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('blurred');

    lbImg.src = fullUrl(lbIndex);
  }




  function closeLightbox() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('blurred');
  }

  function lbNextImg() {
    lbIndex = (lbIndex + 1) % FILES.length;
    lbImg.src = fullUrl(lbIndex);
  }

  function lbPrevImg() {
    lbIndex = (lbIndex - 1 + FILES.length) % FILES.length;
    lbImg.src = fullUrl(lbIndex);
  }

  lbClose?.addEventListener('click', closeLightbox);
  lbNext?.addEventListener('click', lbNextImg);
  lbPrev?.addEventListener('click', lbPrevImg);

  lb?.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });

  document.addEventListener('keydown', (e) => {
    if (!lb?.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') lbNextImg();
    if (e.key === 'ArrowLeft') lbPrevImg();
  });

  if (FILES.length === 0) {
    grid.innerHTML = '<p style="opacity:.7">Add filenames to FILES[] in script.js.</p>';
    return;
  }

  renderPage(page);
});

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.main-nav a');
  if (!links.length) return;

  const path = window.location.pathname.replace(/\/+$/, ''); // trim trailing /
  links.forEach(a => {
    a.removeAttribute('aria-current');
    const href = new URL(a.getAttribute('href'), window.location.origin)
      .pathname.replace(/\/+$/, '');

    if (href === path) a.setAttribute('aria-current', 'page');
  });
});

