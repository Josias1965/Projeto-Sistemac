// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMobile = document.querySelector('.nav-mobile');
const navOverlay = document.querySelector('.nav-overlay');
const navMobileLinks = document.querySelectorAll('.nav-mobile a');

const toggleMenu = () => {
    navMobile.classList.toggle('active');
    navOverlay.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (navMobile.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
};

mobileToggle.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);

navMobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Select elements to animate
// Note: We need to add the .reveal class in CSS or just use data-reveal
document.querySelectorAll('[data-reveal]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});

// Add custom logic for reveal
const revealOnScroll = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
};

const revealObserver = new IntersectionObserver(revealOnScroll, observerOptions);
document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        console.log('Form data:', data);
        
        // Show success message
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Obrigado! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.');
            contactForm.reset();
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
