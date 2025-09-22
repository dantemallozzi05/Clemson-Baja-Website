// About Us tile logic

document.addEventListener('DOMContentLoaded', () => {
    const about = document.querySelector('.about')
    if (!about) return;

    const observer = new IntersectionObserver(
        (entries, obs) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    about.classList.add('is-visible');
                    obs.disconnect();
                }
            }
        },
        {
            root: null,
            rootMargin: '0px',
            threshold: 0.25
        }
    );


    observer.observe(about);
});