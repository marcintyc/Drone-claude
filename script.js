// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const videoItems = document.querySelectorAll('.video-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            videoItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                } else {
                    if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        item.classList.remove('hidden');
                    } else {
                        item.style.display = 'none';
                        item.classList.add('hidden');
                    }
                }
            });

            // Add animation effect
            videoItems.forEach((item, index) => {
                if (!item.classList.contains('hidden')) {
                    setTimeout(() => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100);
                }
            });
        });
    });
});

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Adjust for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Fade In Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements we want to animate
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .video-item, .stat');
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Wysyłanie...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                showMessage('Dziękujemy! Wiadomość została wysłana pomyślnie.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
});

// Message Display Function
function showMessage(message, type = 'info') {
    // Remove existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        ">
            ${message}
        </div>
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            messageDiv.remove();
            style.remove();
        }, 300);
    }, 5000);
}

// Subtle parallax effect for hero content only (not affecting video)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && window.innerWidth > 768) {
        const rate = scrolled * -0.3;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Video Thumbnail Hover Effect Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const videoItems = document.querySelectorAll('.video-item');
    
    videoItems.forEach(item => {
        const thumbnail = item.querySelector('.video-thumbnail');
        const playButton = item.querySelector('.play-button');
        
        item.addEventListener('mouseenter', function() {
            playButton.style.transform = 'translate(-50%, -50%) scale(1.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            playButton.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
});

// Loading Animation for Page
window.addEventListener('load', function() {
    // Hide loading if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
    
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Initialize hero video
    initializeHeroVideo();
});

// Hero Video Initialization
function initializeHeroVideo() {
    const video = document.querySelector('.hero-background-video');
    
    if (video) {
        // Ensure video plays on mobile devices that support it
        video.addEventListener('loadeddata', function() {
            console.log('Hero video loaded successfully');
        });
        
        // Fallback for video loading issues
        video.addEventListener('error', function() {
            console.log('Video failed to load, falling back to gradient background');
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }
        });
        
        // Optimize video playback
        video.addEventListener('canplay', function() {
            video.play().catch(function(error) {
                console.log('Auto-play prevented:', error);
                // Fallback to gradient if autoplay is blocked
                const hero = document.querySelector('.hero');
                if (hero) {
                    hero.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                }
            });
        });
    }
}

// Typing Effect for Hero Title (Optional Enhancement)
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle && window.innerWidth > 768) { // Only on desktop
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid #00d4ff';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    }
});

// Statistics Counter Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, 20);
    });
}

// Trigger stats animation when section is visible
const statsSection = document.querySelector('.about');
if (statsSection) {
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Enhanced Mobile Experience
if (window.innerWidth <= 768) {
    // Disable parallax on mobile for better performance
    window.removeEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Optimize animations for mobile
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.transition = 'all 0.3s ease';
    });
}