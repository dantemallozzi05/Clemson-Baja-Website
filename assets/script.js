
// About Us tile logic

document.addEventListener('DOMContentLoaded', () => {
    const about = document.querySelector('.about')
    if (!about) {
        console.warn('[about] IntersectionObservation not supported - revealing immediate');
        return;
    }
    const reveal = () => {
        about.classList.add('is-visible');
        console.log('[about] revealed');
    };

    if (!('IntersectionObserver' in window)) {
        console.warn('[about] IntersectionObservers not working');
        reveal();
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    reveal();
                    obs.disconnect();
                    break;
                }
            }
        },
        {
            root: null,
            rootMargin: '0px 0px -40% 0px',
            threshold: 0
        }
    );


    observer.observe(about);
});

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
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('g6Grid');
  if (!grid) return;

  const IMAGES = [
    'https://clemson.box.com/shared/static/lqh7frdpvlrsi5j1gdtqn56e2pzygty0.jpg',
    'https://clemson.box.com/shared/static/etmq2221jd486fd555p8tp3x05x9gev6.jpg',
    'https://clemson.box.com/shared/static/3hzshoj556hw8dcvvvg33rb38alac774.jpg',
    'https://clemson.box.com/shared/static/kczt93sqvu15zn34iiqhpe5tcnrs4t54.jpg',
    'https://clemson.box.com/shared/static/9qgbbuglygf6iemv3526bwfiw38rfh0o.jpg',
    'https://clemson.box.com/shared/static/w2xjd6zu3thoihhd43b2x86vwvge9i0d.jpg',
    'https://clemson.box.com/shared/static/93sclmfhroetlpxrc5b4wrdsum2dkm9f.jpg'
  ];

  const PAGE_SIZE = 6;  // 2 x 3
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

  function pages() { return Math.max(1, Math.ceil(IMAGES.length / PAGE_SIZE)); }

  function renderPage(p) {
    const totalPages = pages();
    const start = (p % totalPages) * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, IMAGES.length);
    grid.innerHTML = '';

    for (let i = start; i < end; i++) {
      const btn = document.createElement('button');
      btn.className = 'g6-item';
      btn.setAttribute('role','listitem');
      btn.innerHTML = `<img loading="lazy" src="${IMAGES[i]}" alt="Gallery image ${i+1}">`;
      btn.addEventListener('click', () => openLightbox(i));
      grid.appendChild(btn);
    }
  }

  // Manual nav only
  function nextPage(){ page = (page + 1) % pages(); renderPage(page); }
  function prevPage(){ page = (page - 1 + pages()) % pages(); renderPage(page); }
  prevBtn?.addEventListener('click', prevPage);
  nextBtn?.addEventListener('click', nextPage);

  // Lightbox behaviors with page blur and zoom/fade handled by CSS
  function openLightbox(i){
    lbIndex = i;
    lbImg.onload = null;
    lbImg.onerror = null;

    lbImg.onload = () => {
        lb.classList.add('open');
        lb.setAttribute('aria-hidden', 'false');
        document.body.classList.add('blurred');
    };

    lbImg.onerror = () => {
        console.error('Lightbox failed to load');
    };

    lbImg.src = IMAGES[lbIndex];
   
  }
  function closeLightbox(){
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden','true');
    document.body.classList.remove('blurred');
  }
  function lbNextImg(){ lbIndex = (lbIndex + 1) % IMAGES.length; lbImg.src = IMAGES[lbIndex]; }
  function lbPrevImg(){ lbIndex = (lbIndex - 1 + IMAGES.length) % IMAGES.length; lbImg.src = IMAGES[lbIndex]; }

  lbClose?.addEventListener('click', closeLightbox);
  lbNext?.addEventListener('click', lbNextImg);
  lbPrev?.addEventListener('click', lbPrevImg);
  lb?.addEventListener('click', (e)=>{ if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') lbNextImg();
    if (e.key === 'ArrowLeft') lbPrevImg();
  });

  if (IMAGES.length === 0) {
    grid.innerHTML = '<p style="opacity:.7">Add image URLs to IMAGES[] in script.js.</p>';
    return;
  }
  renderPage(page);
});

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.main-nav a');
  if (!links.length) return;

  const here = new URL(window.location.href);
  links.forEach(a => a.removeAttribute('aria-current'));

  const match = Array.from(links).find(a => {
    const url = new URL(a.getAttribute('href'), here.origin);
    return url.pathname.replace(/\/+$/, '') === here.pathname.replace(/\/+$/, '');
  });

  if (match) match.setAttribute('aria-current', 'page');
});

// document.addEventListener('DOMContentLoaded', () => {
//     const links = document.querySelectorAll('.main-nav a, .nav-list a');

//     if (!links.length) return;

//     const here = new URL(location.href);
//     const norm = p => p.replace(/index\.html$/,'').replace(/\/+$/,'');
//     links.forEach(a => a.removeAttribute('aria-current'));

//     const match = Array.from(links).find(a => {
//         const url new URL(a.getAttribute('href'), here.origin);
//         return norm(url.pathname) === norm(here.pathname);
//     });

//     if (match) match.setAttribute('aria-current', 'page');
// });