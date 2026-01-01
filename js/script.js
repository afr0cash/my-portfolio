// ============================================
// Navigation
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            if (navLink) navLink.classList.add('active');
        } else {
            if (navLink) navLink.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ============================================
// Typing Animation
// ============================================
const typingText = document.getElementById('typing-text');
const texts = [
    'Web Applications',
    'Mobile Apps',
    'REST APIs',
    'Cloud Solutions',
    'Full Stack Systems'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; // Pause before typing next
    }

    setTimeout(typeText, typeSpeed);
}

// Start typing animation
setTimeout(typeText, 1000);

// ============================================
// Counter Animation
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const steps = 60; // Number of animation steps
    const increment = target / steps;
    const stepDuration = duration / steps;
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            setTimeout(updateCounter, stepDuration);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Function to trigger counter animation
function triggerCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        if (!stat.classList.contains('animated')) {
            const target = parseInt(stat.getAttribute('data-target'));
            stat.classList.add('animated');
            animateCounter(stat, target);
        }
    });
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            triggerCounters();
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Initialize counters when DOM is ready
function initCounters() {
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        observer.observe(statsSection);
        
        // Check if section is already visible on page load
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
            // Small delay to ensure DOM is ready
            setTimeout(triggerCounters, 500);
        }
    } else {
        // Fallback: try again after a short delay
        setTimeout(initCounters, 100);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
} else {
    initCounters();
}

// ============================================
// Smooth Scroll
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Scroll Animations
// ============================================
const scrollElements = document.querySelectorAll('.skill-card, .project-card, .contact-item');

const elementInView = (el, offset = 0) => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return elementTop <= (windowHeight * 0.8) - offset;
};

const displayScrollElement = (element) => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
};

const hideScrollElement = (element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        }
    });
};

// Initialize scroll elements
scrollElements.forEach((el) => {
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    hideScrollElement(el);
});

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Initial check
handleScrollAnimation();

// ============================================
// Page Load Animation
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

