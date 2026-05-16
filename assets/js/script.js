
    document.addEventListener('DOMContentLoaded', () => {
      const navbar = document.getElementById('navbar');
      const hamburger = document.getElementById('hamburger');
      const mobileMenu = document.getElementById('mobileMenu');
      const mobileLinks = document.querySelectorAll('.mobile-link');

      // AOS dibuat aman agar tidak mematikan script lain jika CDN gagal dimuat.
      if (window.AOS) {
        AOS.init({
          duration: 850,
          once: false,
          mirror: true,
          offset: 90,
          easing: 'ease-out-cubic',
        });
      }

      // Lucide dibuat aman agar hamburger tetap bisa diklik meskipun icon CDN bermasalah.
      function refreshIcons() {
        if (window.lucide) {
          lucide.createIcons();
        }
      }

      refreshIcons();

      // GSAP dibuat aman. Area hero dibuat stabil, jadi animasi konten dimulai dari section Tentang ke bawah.
      if (window.gsap) {
        if (window.ScrollTrigger) {
          gsap.registerPlugin(window.ScrollTrigger);
        }

        gsap.to('.floating-light', {
          x: 18,
          y: -22,
          scale: 1.08,
          duration: 5.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.45
        });

        gsap.to('.glow-orb', {
          x: 26,
          y: -24,
          scale: 1.05,
          opacity: 0.48,
          duration: 6.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.5
        });

        gsap.to('.float-card', {
            y: -12,
            duration: 2.8,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            stagger: 0.35
            });

        if (window.ScrollTrigger) {
          window.ScrollTrigger.refresh();
        }
      }

      // Navbar scroll effect.
      if (navbar) {
        window.addEventListener('scroll', () => {
          if (window.scrollY > 20) {
            navbar.classList.add('nav-scrolled');
          } else {
            navbar.classList.remove('nav-scrolled');
          }
        }, { passive: true });
      }

      // Hamburger menu fix.
      function setHamburgerIcon(isOpen) {
        if (!hamburger) return;
        hamburger.innerHTML = isOpen
          ? '<i data-lucide="x" class="h-6 w-6"></i>'
          : '<i data-lucide="menu" class="h-6 w-6"></i>';
        hamburger.setAttribute('aria-expanded', String(isOpen));
        refreshIcons();
      }

      function closeMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.add('hidden');
        setHamburgerIcon(false);
      }

      function toggleMobileMenu() {
        if (!mobileMenu) return;
        const willOpen = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        setHamburgerIcon(willOpen);
      }

      if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', (event) => {
          event.stopPropagation();
          toggleMobileMenu();
        });
      }

      mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
          closeMobileMenu();
        });
      });

      document.addEventListener('click', (event) => {
        if (!navbar || !mobileMenu) return;
        const isClickInsideNavbar = navbar.contains(event.target);
        if (!isClickInsideNavbar && !mobileMenu.classList.contains('hidden')) {
          closeMobileMenu();
        }
      });

      window.addEventListener('load', () => {
        if (window.AOS) {
          AOS.refreshHard();
        }
        if (window.ScrollTrigger) {
          window.ScrollTrigger.refresh();
        }
      });
    });

    const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}