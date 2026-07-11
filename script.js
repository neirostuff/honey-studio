document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Reveal on Scroll Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15, // Элемент появляется, когда 15% его видно
        rootMargin: "0px 0px -50px 0px" // Небольшой отступ снизу
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Анимируем только один раз
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Sound Toggle Logic
    const bgVideo = document.getElementById('bgVideo');
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    const iconMuted = document.getElementById('icon-muted');
    const iconUnmuted = document.getElementById('icon-unmuted');

    if (bgVideo && soundToggleBtn) {
        soundToggleBtn.addEventListener('click', () => {
            bgVideo.muted = !bgVideo.muted;
            if (bgVideo.muted) {
                iconMuted.style.display = 'block';
                iconUnmuted.style.display = 'none';
            } else {
                iconMuted.style.display = 'none';
                iconUnmuted.style.display = 'block';
            }
        });
    }

    // 3. Mobile Menu Toggle (Basic setup)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    // Add mobile menu logic here later
});
