/* ============================================
   PORTFOLIO WEBSITE JAVASCRIPT
   - Smooth Navigation
   - Mobile Menu Toggle
   - Scroll Animations
   - Form Handling
   ============================================ */

// ============================================
// DOM ELEMENTS
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');
const contactForm = document.getElementById('contactForm');

// ============================================
// HAMBURGER MENU TOGGLE
// ============================================
/**
 * Toggle mobile navigation menu
 */
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(span => {
        span.style.transition = 'all 0.3s ease';
    });
    
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// ============================================
// NAV LINK CLICK - CLOSE MENU & SMOOTH SCROLL
// ============================================
/**
 * Close mobile menu when a nav link is clicked
 */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Reset hamburger animation
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================
/**
 * Add subtle background change to navbar when scrolled
 */
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// FADE IN ON SCROLL ANIMATION
// ============================================
/**
 * Intersection Observer untuk fade-in animation saat elemen masuk viewport
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe semua elemen dengan class fade-in
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ============================================
// FORM SUBMISSION
// ============================================
/**
 * Handle contact form submission
 */
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values by name
        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const subject = contactForm.querySelector('input[name="subject"]').value.trim();
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();

        // Simple validation
        if (name && email && subject && message) {
            const to = '247006111181@student.unsil.ac.id';
            const mailSubject = subject || 'Pesan dari Website Portofolio';
            const body = `Nama: ${name}\nEmail: ${email}\n\n${message}`;
            const mailto = `mailto:${to}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;

            // Open user's email client with pre-filled message
            window.location.href = mailto;

            // Show success feedback and reset form
            showSuccessMessage();
            contactForm.reset();
        } else {
            showErrorMessage();
        }
    });
}

/**
 * Show success message
 */
function showSuccessMessage() {
    const btn = contactForm.querySelector('.btn-send');
    const originalText = btn.textContent;
    
    btn.textContent = '✓ Pesan Terkirim!';
    btn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 3000);
}

/**
 * Show error message
 */
function showErrorMessage() {
    const btn = contactForm.querySelector('.btn-send');
    const originalText = btn.textContent;
    
    btn.textContent = '⚠ Lengkapi Semua Field!';
    btn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 3000);
}

// ============================================
// SCROLL TO TOP FUNCTIONALITY
// ============================================
/**
 * Smooth scroll to specific section
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// PORTFOLIO ITEMS CLICK HANDLER
// ============================================
/**
 * Handle portfolio item clicks - Open image in modal
 */
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.portfolio-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get the image from the portfolio card
        const portfolioCard = link.closest('.portfolio-card');
        const img = portfolioCard.querySelector('.portfolio-image img');
        
        if (img) {
            // Set the modal image source and alt
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            
            // Show the modal
            imageModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = e.clientX - link.offsetLeft + 'px';
        ripple.style.top = e.clientY - link.offsetTop + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';
        
        link.parentElement.style.position = 'relative';
        link.parentElement.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ============================================
// MODAL CLOSE HANDLER
// ============================================
/**
 * Close modal when close button is clicked
 */
modalClose.addEventListener('click', () => {
    imageModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
});

/**
 * Close modal when clicking outside the image
 */
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        imageModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
});

/**
 * Close modal when pressing Escape key
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal.classList.contains('active')) {
        imageModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
});

// ============================================
// PAGE LOAD ANIMATION
// ============================================
/**
 * Add animation when page loads
 */
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Stagger animation untuk multiple elements
    const cards = document.querySelectorAll('.skill-card, .portfolio-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `fadeInOnScroll 0.6s ease ${index * 0.1}s forwards`;
    });
});

// ============================================
// ACTIVE NAV LINK INDICATOR
// ============================================
/**
 * Update active nav link based on scroll position
 */
window.addEventListener('scroll', () => {
    let currentSection = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================
/**
 * Handle keyboard shortcuts
 * Esc - close mobile menu or modal
 * Arrow keys - scroll between sections
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
        // Close modal if open (handled in modal close handler)
    }
});

// ============================================
// LAZY LOADING SIMULATION
// ============================================
/**
 * Simulate image loading dengan skeleton
 */
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.style.animation = 'fadeInOnScroll 0.6s ease';
    });
    
    // Fallback jika gabar tidak load
    img.addEventListener('error', () => {
        img.style.background = 'linear-gradient(135deg, #FF6A00, #1E3A8A)';
        img.style.display = 'flex';
        img.style.alignItems = 'center';
        img.style.justifyContent = 'center';
        img.style.color = 'white';
        img.textContent = '📷';
    });
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🔥 Portofolio M. Gibran Fajar 🔥', 
    'color: #FF6A00; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px rgba(255, 106, 0, 0.5);');
console.log('%cNPM: 247006111181', 
    'color: #1E3A8A; font-size: 14px; font-weight: bold;');
console.log('%cMahasiswa Informatika - Universitas Siliwangi', 
    'color: #555; font-size: 12px;');
console.log('%cTerima kasih sudah mengunjungi portofolio saya!', 
    'color: #FF6A00; font-size: 12px; font-style: italic;');