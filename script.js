// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';   
        follower.style.opacity = '0';
    });

    // Hover effect on interactive elements
    const hoverables = document.querySelectorAll('a, button, .program-card, .faculty-card, .campus-card');
    
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.borderColor = 'var(--secondary)';
            follower.style.backgroundColor = 'rgba(255,102,0,0.1)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.borderColor = 'var(--secondary)';
            follower.style.backgroundColor = 'transparent';
        });
    });
}

// Loader
window.addEventListener('load', function() {
    setTimeout(function() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.style.display = 'none';
            }, 800);
        }
    }, 2000);
});

// Navigation
const nav = document.getElementById('mainNav');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Back to top button
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// Start counters when in view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat-number[data-target]');
            stats.forEach(stat => {
                const target = parseInt(stat.dataset.target);
                animateCounter(stat, target);
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    counterObserver.observe(statsSection);
}

// Programs Data
function togglePrograms(id){

    var program = document.getElementById(id);

    if(program.style.display === "block"){
        program.style.display = "none";
    }else{
        program.style.display = "block";
    }

}

// Load Programs
const programsGrid = document.getElementById('programsGrid');

function loadPrograms(filter = 'all') {
    if (!programsGrid) return;
    
    const filtered = filter === 'all' 
        ? programsData 
        : programsData.filter(p => p.level === filter);
    
    programsGrid.innerHTML = filtered.map(program => `
        <div class="program-card" data-category="${program.level}">
            <div class="program-icon">
                <i class="fas ${program.icon}"></i>
            </div>
            <h4>${program.title}</h4>
            <p>${program.description}</p>
            <span class="program-level">${program.level.charAt(0).toUpperCase() + program.level.slice(1)}</span>
        </div>
    `).join('');
}

// Program Filters
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        loadPrograms(filter);
    });
});

// Load initial programs
loadPrograms();

// Faculty Data
const facultyData = [
    {
        image: 'https://www.icuzambia.net/includes/img/events/eventsthumb2.jpg',
        name: 'Dr. Oliver Silumbe',
        position: 'Dean, School of Engineering',
        qualification: ' Researcher'
    },
    {
        image: 'images/MrKaleji.jpeg',
        name: 'Mr Moses Kaleji',
        position: 'Program Coordinator',
        qualification: ' Experienced Lecturer'
    },
    {
        image: 'images/dean.jpeg',
        name: 'Mr Lameck Nsama',
        position: 'Principle',
        qualification: 'Professional Systems Engineer'
    },
    {
        image: 'https://www.icuzambia.net/includes/img/events/eventsthumb4.jpg',
        name: 'Mr Saina Temba',
        position: 'Web Developer/Designer',
        qualification: 'Experienced Web Developer'
    }
];

// Load Faculty Slider
const facultySlider = document.getElementById('facultySlider');
const sliderDots = document.querySelector('.slider-dots');
const prevBtn = document.querySelector('.slider-arrow.prev');
const nextBtn = document.querySelector('.slider-arrow.next');

let currentSlide = 0;
let slideCount = 0;

function loadFacultySlider() {
    if (!facultySlider) return;
    
    facultySlider.innerHTML = facultyData.map(faculty => `
        <div class="faculty-card">
            <div class="faculty-image">
                <img src="${faculty.image}" alt="${faculty.name}" loading="lazy">
            </div>
            <div class="faculty-info">
                <h5>${faculty.name}</h5>
                <div class="position">${faculty.position}</div>
                <div class="qualification">${faculty.qualification}</div>
            </div>
        </div>
    `).join('');
    
    slideCount = facultyData.length;
    
    // Create dots
    if (sliderDots) {
        sliderDots.innerHTML = Array(slideCount).fill(0).map((_, i) => `
            <span class="slider-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>
        `).join('');
    }
    
    updateSliderControls();
}

function updateSliderControls() {
    if (!facultySlider) return;
    
    const slideWidth = facultySlider.querySelector('.faculty-card')?.offsetWidth || 0;
    const gap = 30;
    facultySlider.scrollTo({
        left: currentSlide * (slideWidth + gap),
        behavior: 'smooth'
    });
    
    // Update dots
    document.querySelectorAll('.slider-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
    
    // Update arrows
    if (prevBtn) prevBtn.disabled = currentSlide === 0;
    if (nextBtn) nextBtn.disabled = currentSlide === slideCount - 1;
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSliderControls();
        }
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (currentSlide < slideCount - 1) {
            currentSlide++;
            updateSliderControls();
        }
    });
}

if (sliderDots) {
    sliderDots.addEventListener('click', (e) => {
        if (e.target.classList.contains('slider-dot')) {
            currentSlide = parseInt(e.target.dataset.index);
            updateSliderControls();
        }
    });
}

// Load faculty
loadFacultySlider();

// Campus Gallery Data
const campusData = [
    {
        image: 'images/LABS.jpeg',
        title: 'Science Labs',
        description: 'Designed for safety, precision and organization'
    },
    {
        image: 'images/SPORTS.jpeg',
        title: 'Sports',
        description: 'Stay fit and health'
    },
    {
        image: 'images/EXTENSION.jpeg',
        title: 'Extension Hall',
        description: 'Relax, study and collaborate'
    }
];

// Load Campus Gallery
const campusGallery = document.getElementById('campusGallery');

if (campusGallery) {
    campusGallery.innerHTML = campusData.map(item => `
        <div class="gallery-item">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="gallery-overlay">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        </div>
    `).join('');
}



// Testimonials Data
const testimonialsData = [
    {
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
        name: 'Peter Chanda',
        class: 'Class of 2022',
        position: 'Software Engineer',
        text: 'ICU Zambia gave me the skills I needed to succeed in the tech industry. The hands-on approach to learning and industry connections made all the difference.'
    },
    {
        image: 'https://randomuser.me/api/portraits/women/3.jpg',
        name: 'Grace Mwansa',
        class: 'Class of 2023',
        position: 'Network Administrator',
        text: 'The faculty at ICU Zambia are not just teachers but mentors. They guided me through my journey and helped me land my dream job.'
    },
    {
        image: 'https://randomuser.me/api/portraits/men/4.jpg',
        name: 'James Banda',
        class: 'Class of 2021',
        position: 'IT Consultant',
        text: 'Studying at ICU Zambia was a transformative experience. The curriculum is up-to-date with industry demands.'
    }
];

// Load Testimonials Slider
const testimonialsSlider = document.getElementById('testimonialsSlider');
const progressLine = document.querySelector('.progress-line');
let testimonialIndex = 0;

function loadTestimonials() {
    if (!testimonialsSlider) return;
    
    testimonialsSlider.innerHTML = testimonialsData.map(testimonial => `
        <div class="testimonial-card">
            <p class="testimonial-text">"${testimonial.text}"</p>
            <div class="testimonial-author">
                <img src="${testimonial.image}" alt="${testimonial.name}">
                <div class="author-info">
                    <h6>${testimonial.name}</h6>
                    <p>${testimonial.class}, ${testimonial.position}</p>
                </div>
            </div>
        </div>
    `).join('');
    
    startTestimonialAutoPlay();
}

function startTestimonialAutoPlay() {
    setInterval(() => {
        if (!testimonialsSlider) return;
        
        testimonialIndex = (testimonialIndex + 1) % testimonialsData.length;
        const slideWidth = testimonialsSlider.querySelector('.testimonial-card')?.offsetWidth || 0;
        const gap = 30;
        
        testimonialsSlider.scrollTo({
            left: testimonialIndex * (slideWidth + gap),
            behavior: 'smooth'
        });
        
        if (progressLine) {
            progressLine.style.width = `${((testimonialIndex + 1) / testimonialsData.length) * 100}%`;
        }
    }, 5000);
}

loadTestimonials();

// Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message
        alert('✅ Thank you for your message! Our admissions team will contact you soon.');
        contactForm.reset();
    });
}

// Application Modal
const modal = document.getElementById('applicationModal');
const modalClose = document.querySelector('.modal-close');
const applicationForm = document.getElementById('applicationForm');

window.openApplication = function() {
    if (modal) {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }
};

if (modalClose) {
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
});

if (applicationForm) {
    applicationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✅ Your application has been submitted! We will contact you soon.');
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        applicationForm.reset();
    });
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('📧 Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

// Back to Top
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #FF6600, #003366);
    z-index: 10001;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or menus
        const navbarCollapse = document.querySelector('.navbar-collapse.show');
        if (navbarCollapse) {
            navbarToggler.click();
        }
    }
});

// Add to home screen prompt (for mobile)
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button
    const installBtn = document.createElement('button');
    installBtn.innerHTML = '<i class="fas fa-download"></i> Install App';
    installBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: #FF6600;
        color: white;
        border: none;
        padding: 15px 30px;
        border-radius: 50px;
        font-weight: bold;
        cursor: pointer;
        z-index: 999;
        box-shadow: 0 5px 20px rgba(255,102,0,0.3);
        animation: pulse 2s infinite;
    `;
    
    installBtn.onclick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to install: ${outcome}`);
            deferredPrompt = null;
            installBtn.remove();
        }
    };
    
    document.body.appendChild(installBtn);
});

// Service worker registration (for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// Current Year in Footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Reveal Animations on Scroll
const revealElements = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.2, rootMargin: '0px' });

revealElements.forEach(el => revealObserver.observe(el));

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero-bg');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Video Player (Placeholder)
const playVideo = document.getElementById('playVideo');

video.addEventListener('play', () => {
    console.log('Video started playing');
});

video.addEventListener('pause', () => {
    console.log('Video paused');
});

video.addEventListener('ended', () => {
    console.log('Video ended');
});

video.addEventListener('loadedmetadata', () => {
    console.log('Video duration:', video.duration);
});

// Console Welcome
console.log('%c🎓 Welcome to ICU Zambia', 'font-size: 20px; color: #003366; font-weight: bold;');
console.log('%cInformation and Communication University', 'font-size: 16px; color: #FF6600;');
console.log('%cUpgraded Version - Modern UI/UX', 'font-size: 14px; color: #00A651;');
    
// Touch Device Detection
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (isTouchDevice) {
    document.body.classList.add('touch-device');

    // Disable custom cursor on touch devices
    if (cursor && follower) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
    }
}

// Performance Optimization
if ('connection' in navigator && navigator.connection.saveData) {
    // Reduce animations for data saver mode
    document.body.classList.add('reduce-motion');
}

// Lazy Loading Images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.loading = 'lazy';
    });
}