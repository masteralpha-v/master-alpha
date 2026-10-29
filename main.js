// Master Alpha Web Interactivity
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Menu Toggle
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // Smooth hash scroll offset handling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // App Showcase Interactive Slider
  const slides = document.querySelectorAll('.slider-slide');
  const tabs = document.querySelectorAll('.slider-tab');
  const prevBtn = document.getElementById('sliderPrevBtn');
  const nextBtn = document.getElementById('sliderNextBtn');
  const sliderContainer = document.querySelector('.app-slider-container');

  if (slides.length > 0) {
    let currentSlide = 0;
    let autoPlayTimer = null;

    function goToSlide(index) {
      slides[currentSlide].classList.remove('active');
      tabs[currentSlide].classList.remove('active');
      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      tabs[currentSlide].classList.add('active');
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 4500);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentSlide - 1);
        startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentSlide + 1);
        startAutoPlay();
      });
    }

    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(idx);
        startAutoPlay();
      });
    });

    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', stopAutoPlay);
      sliderContainer.addEventListener('mouseleave', startAutoPlay);
    }

    startAutoPlay();
  }

  // Smart OS Detection for Download Buttons
  const downloadBtn = document.getElementById('hero-download-btn');
  const downloadLabel = document.getElementById('hero-download-label');

  if (downloadBtn && downloadLabel) {
    const userAgent = navigator.userAgent;
    const GITHUB_DOWNLOAD = 'https://github.com/masteralpha-v/master-journal-releases/releases/latest/download';

    if (userAgent.includes('Win')) {
      downloadBtn.href = GITHUB_DOWNLOAD + '/MasterJournal.exe';
      downloadLabel.textContent = 'Download Windows Portable App';
    } else if (userAgent.includes('Mac')) {
      downloadBtn.href = GITHUB_DOWNLOAD + '/MasterJournal.dmg';
      downloadLabel.textContent = 'Download macOS Portable App';
    } else if (userAgent.includes('Linux')) {
      downloadBtn.href = GITHUB_DOWNLOAD + '/MasterJournal.AppImage';
      downloadLabel.textContent = 'Download Linux Portable App';
    } else {
      downloadBtn.href = GITHUB_DOWNLOAD + '/MasterJournal.exe';
      downloadLabel.textContent = 'Download Master Journal Portable';
    }
  }

  // Dynamic Card Recommendation based on OS
  const cardWin = document.getElementById('card-windows');
  const cardLinux = document.getElementById('card-linux');
  const tagWin = document.getElementById('tag-windows');
  const tagLinux = document.getElementById('tag-linux');

  if (cardWin && cardLinux) {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Linux')) {
      cardLinux.classList.add('featured');
      cardWin.classList.remove('featured');
      if (tagLinux) tagLinux.textContent = 'Recommended for Linux';
      if (tagWin) tagWin.textContent = 'Windows Executable';
    } else {
      cardWin.classList.add('featured');
      cardLinux.classList.remove('featured');
      if (tagWin) tagWin.textContent = 'Recommended for Windows';
      if (tagLinux) tagLinux.textContent = 'Linux AppImage';
    }
  }
});
