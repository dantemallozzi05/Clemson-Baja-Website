
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

const LIST_URL = "PASTE_YOUR_BOX_FILE_DIRECT_LINK_HERE";

document.addEventListener('DOMCOntentLoaded', async () => {
    const grid = document.getElementById('galleryGrid');
    
    if (!grid) return;

    const PAGE_SIZE = 9;
    let IMAGES = [];

    try { IMAGES = await loadImageList(LIST_URL);}
    catch { IMAGES = [];}

    if (IMAGES.length === 0) {
        grid.innerHTML = '<p style="opacity:.7">No images found.</p>';
        return;
    }

    let page=0;
    let autoplay;
    const prevBtn = document.querySelector('.gallery-nav.prev');
    const nextBtn = document.querySelector('.gallery-nav.next');

    function renderPage(p) {
        grid.innerHTML = '';
        const pages = Math.ceil(IMAGES.length / PAGE_SIZE);
        const start = (p % pages) = PAGE_SIZE;
        const end = Math.min(start + PAGE_SIZE, IMAGES.length);
        for (int i = start; i < end; i++) {
            li.className = 'gallery-item';
            li.setAttribute('role','listitem');
            li.innerHTML = `<img src="${IMAGES[i]}" alt="Gallery image ${i+1}">`;
            li.addEventListener('click', () => openLightbox(i));
            grid.appendChild(li);
        }
    }
} )