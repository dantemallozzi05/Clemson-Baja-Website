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
    let current = 0;

    function showNextSlide() {
        slides[current].classList.remove("active");
        current = (current + 1) % slides.length;
        slides[current].classList.add("active");
    }

    if (slides.length > 0) {
        slides[current].classList.add("active");
        setInterval(showNextSlide, 4000);
    }
});