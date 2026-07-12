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

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    // 4. Academy Tabs Logic
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            btn.classList.add('active');
            const activePane = document.getElementById(targetTab);
            if (activePane) {
                activePane.classList.add('active');
            }
        });
    });

    // 5. Pricelist Modal & Slider Logic
    const praisModal = document.getElementById('praisModal');
    const openPraisBtn = document.getElementById('openPraisBtn');
    const closePraisBtn = document.getElementById('closePraisBtn');
    const prevPraisBtn = document.getElementById('prevPraisBtn');
    const nextPraisBtn = document.getElementById('nextPraisBtn');
    const currentSlideNum = document.getElementById('currentSlideNum');
    const modalSlides = document.querySelectorAll('.modal-slide');

    if (praisModal && openPraisBtn) {
        let currentSlideIdx = 0;

        const showSlide = (idx) => {
            modalSlides.forEach(slide => slide.classList.remove('active'));
            if (modalSlides[idx]) {
                modalSlides[idx].classList.add('active');
            }
            currentSlideNum.textContent = idx + 1;
        };

        openPraisBtn.addEventListener('click', () => {
            praisModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Запретить прокрутку страницы под модалкой
            currentSlideIdx = 0;
            showSlide(currentSlideIdx);
        });

        const closeModal = () => {
            praisModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        closePraisBtn.addEventListener('click', closeModal);

        praisModal.addEventListener('click', (e) => {
            if (e.target === praisModal) {
                closeModal();
            }
        });

        // Клавиатура (Esc, Стрелки)
        document.addEventListener('keydown', (e) => {
            if (praisModal.classList.contains('active')) {
                if (e.key === 'Escape') closeModal();
                if (e.key === 'ArrowRight') nextSlide();
                if (e.key === 'ArrowLeft') prevSlide();
            }
        });

        const nextSlide = () => {
            currentSlideIdx = (currentSlideIdx + 1) % modalSlides.length;
            showSlide(currentSlideIdx);
        };

        const prevSlide = () => {
            currentSlideIdx = (currentSlideIdx - 1 + modalSlides.length) % modalSlides.length;
            showSlide(currentSlideIdx);
        };

        nextPraisBtn.addEventListener('click', nextSlide);
        prevPraisBtn.addEventListener('click', prevSlide);
    }
});
