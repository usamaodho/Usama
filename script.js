// active hamburger menu 
// Replaced with a clean guarded implementation to fix previous syntax errors
// Safe, guarded script for the portfolio site
console.info('script.js loaded');

// Active hamburger menu (guarded)
const menuIcon = document.querySelector('.menu-icon');
const navlist = document.querySelector('.navlist');
if (menuIcon && navlist) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        navlist.classList.toggle('active');
        document.body.classList.toggle('open');
    });
    navlist.addEventListener('click', () => {
        navlist.classList.remove('active');
        menuIcon.classList.remove('active');
        document.body.classList.remove('open');
    });
}

// Rotating text (only if element exists)
const rotatingText = document.querySelector('.text p');
if (rotatingText) {
    rotatingText.innerHTML = rotatingText.innerHTML
        .split('')
        .map((char, i) => `<b style="transform:rotate(${i * 6.3}deg)">${char}</b>`)
        .join('');
}

// Switch between about buttons (guarded)
const buttons = document.querySelectorAll('.about-btn button');
const contents = document.querySelectorAll('.content');
if (buttons.length && contents.length) {
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            contents.forEach(content => (content.style.display = 'none'));
            if (contents[index]) contents[index].style.display = 'block';
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// Portfolio filter (mixitup) - initialize only if library is present
if (typeof mixitup !== 'undefined' && document.querySelector('.portfolio-gallery')) {
    mixitup('.portfolio-gallery', {
        selectors: { target: '.portfolio-box' },
        animation: { duration: 500 }
    });
}

// Initialize Swiper only if available
if (typeof Swiper !== 'undefined' && document.querySelector('.mySwiper')) {
    new Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: { el: '.swiper-pagination', clickable: true },
        autoplay: { delay: 3000, disableOnInteraction: false },
        breakpoints: { 576: { slidesPerView: 2, spaceBetween: 10 }, 1200: { slidesPerView: 3, spaceBetween: 20 } }
    });
}

// Skills counters and progress (guarded)
const first_skill = document.querySelector('.skill:first-child');
const sk_counters = document.querySelectorAll('.counter span');
const progress_bars = document.querySelectorAll('.skills svg circle');
let skillsPlayed = false;

function hasReached(el) {
    if (!el) return false;
    const topPosition = el.getBoundingClientRect().top;
    return window.innerHeight >= topPosition + el.offsetHeight;
}

function updateCount(num, maxNum) {
    let currentNum = +num.innerText;
    if (currentNum < maxNum) {
        num.innerText = currentNum + 1;
        setTimeout(() => updateCount(num, maxNum), 12);
    }
}

function skillsCounter() {
    if (!first_skill) return;
    if (!hasReached(first_skill)) return;
    if (skillsPlayed) return;
    skillsPlayed = true;
    sk_counters.forEach((counter, i) => {
        const target = +counter.dataset.target || 0;
        const strokeValue = 465 - 465 * (target / 100);
        if (progress_bars[i]) progress_bars[i].style.setProperty('--target', strokeValue);
        setTimeout(() => updateCount(counter, target), 400);
    });
    progress_bars.forEach(p => (p.style.animation = 'progress 2s ease-in-out forwards'));
}

if (first_skill && sk_counters.length && progress_bars.length) {
    window.addEventListener('scroll', () => { if (!skillsPlayed) skillsCounter(); });
    window.addEventListener('load', skillsCounter);
}

// Side progress button
const calcScrollValue = () => {
    const scrollProgress = document.getElementById('progress');
    if (!scrollProgress) return;
    const pos = document.documentElement.scrollTop;
    const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollValue = Math.round((pos * 100) / calcHeight);
    scrollProgress.style.display = pos > 100 ? 'grid' : 'none';
    scrollProgress.addEventListener('click', () => (document.documentElement.scrollTop = 0));
    scrollProgress.style.background = `conic-gradient(#fff ${scrollValue}%,#e6006d ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// Active menu highlighting
const menuLi = document.querySelectorAll('header ul li a');
const sections = document.querySelectorAll('section');
function activeMenu() {
    if (!menuLi.length || !sections.length) return;
    let len = sections.length;
    while (--len && window.scrollY + 97 < sections[len].offsetTop) {}
    menuLi.forEach(sec => sec.classList.remove('active'));
    if (menuLi[len]) menuLi[len].classList.add('active');
}
activeMenu();
window.addEventListener('scroll', activeMenu);

// ScrollReveal (guarded)
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal({ distance: '90px', duration: 2000, delay: 200 });
    ScrollReveal().reveal('.hero-info,.main-text,.proposal,.heading', { origin: 'top' });
    ScrollReveal().reveal('.about-img,.fillter-buttons,.contact-info', { origin: 'left' });
    ScrollReveal().reveal('.about-content,.skills', { origin: 'right' });
    ScrollReveal().reveal('.allServices,.portfolio-gallery,.blog-box,footer,.img-hero', { origin: 'bottom' });
}


