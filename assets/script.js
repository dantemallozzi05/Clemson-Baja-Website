
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
        dot.addEventListener("click", () => showSlide(i));

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

const LIST_URL = ;

// --- 3x2 Gallery Slider fed by Box direct links ---
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('g6Grid');
  if (!grid) return;

  // Paste your Box *direct* image URLs here.
  // Tip: add as many as you like; the slider paginates by 6.
  const IMAGES = [
    'https://clemson.box.com/shared/static/lqh7frdpvlrsi5j1gdtqn56e2pzygty0.jpg',
    'https://clemson.box.com/shared/static/etmq2221jd486fd555p8tp3x05x9gev6.jpg',
    'https://clemson.box.com/shared/static/3hzshoj556hw8dcvvvg33rb38alac774.jpg',
    'https://clemson.box.com/shared/static/kczt93sqvu15zn34iiqhpe5tcnrs4t54.jpg',
    'https://clemson.box.com/shared/static/9qgbbuglygf6iemv3526bwfiw38rfh0o.jpg',
    'https://clemson.box.com/shared/static/w2xjd6zu3thoihhd43b2x86vwvge9i0d.jpg'
  ];

  const PAGE_SIZE = 6;
  let page = 0;
  let timer;

  const prevBtn = document.querySelector('.g6-nav.prev');
  const nextBtn = document.querySelector('.g6-nav.next');

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
      grid.appendChild(btn);
    }
  }

  function nextPage(){ page = (page + 1) % pages(); renderPage(page); restart(); }
  function prevPage(){ page = (page - 1 + pages()) % pages(); renderPage(page); restart(); }

  function start(){ stop(); timer = setInterval(nextPage, 5000); } // 5s autoplay
  function stop(){ if (timer) clearInterval(timer); }
  function restart(){ start(); }

  prevBtn?.addEventListener('click', prevPage);
  nextBtn?.addEventListener('click', nextPage);

  if (IMAGES.length === 0) {
    grid.innerHTML = '<p style="opacity:.7">Add Box direct image URLs to IMAGES[] in script.js.</p>';
    return;
  }

  renderPage(page);
  start();
});
