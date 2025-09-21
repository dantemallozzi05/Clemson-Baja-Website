// About Us tile logic

document.addEventListener('DOMContentLoaded', () => {
    const about = document.querySelector('.about')
    if (!about) return;

    const reveal = () => about.classList.add('is-visible');

    if (!('IntersectionObserver' in window)) {
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