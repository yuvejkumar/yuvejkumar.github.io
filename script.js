document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Skill Bar Animation on Scroll
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Enhanced Intersection Observer with staggered animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                // Animate all cards within the section
                const cards = entry.target.querySelectorAll('.skill-category, .achievement-card, .language-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animated');
                    }, index * 100);
                });
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Form Submission
    // Add form validation before submission
    document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
        const form = e.target;
        const name = form.querySelector('[name="name"]');
        const email = form.querySelector('[name="email"]');
        const message = form.querySelector('[name="message"]');
        
        // Simple validation
        if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
            e.preventDefault();
            alert('Please fill all required fields');
            return;
        }
        
        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            e.preventDefault();
            alert('Please enter a valid email address');
            return;
        }
    
    // If everything is valid, the form will submit to FormSubmit
});
    
    // Sticky Navigation on Scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.padding = '15px 0';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.padding = '20px 0';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Add subtle floating animation to hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        setInterval(() => {
            heroImage.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 5}px)`;
        }, 50);
    }
});

// Add 3D tilt effect to cards
function addTiltEffect() {
    const cards = document.querySelectorAll('.detail-item, .skill-category, .achievement-card, .language-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Call this function at the end of your DOMContentLoaded event
addTiltEffect();

// Add active class to current section in navigation
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY + 100;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Add jelly effect to buttons on click
function addJellyClickEffect() {
    const buttons = document.querySelectorAll('.btn, .nav-links a');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// Call these functions in your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Run once on load
    addJellyClickEffect();
    
    // Enhanced wave animation for headings
    const headings = document.querySelectorAll('.section-title, .hero-content h1');
    headings.forEach((heading, index) => {
        heading.style.animationDelay = `${index * 0.1}s`;
    });
});
// Add to script.js
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 2;
        this.color = `hsl(${Math.random() * 60 + 190}, 100%, 50%)`;
        this.hasBeenMoved = false; // Track if particle has been moved
    }
    
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    
    update(mouse) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDistance = 100;
        
        if (distance < maxDistance) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let force = (maxDistance - distance) / maxDistance;
            
            this.x -= forceDirectionX * force * 5; // Reduced density effect
            this.y -= forceDirectionY * force * 5;
            this.hasBeenMoved = true; // Mark as moved
        }
        // Removed the else clause that made particles return to original position
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];
    const mouse = { x: null, y: null };
    const particleCount = 30;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        ));
    }
    
    // Main ball properties
    const ball = {
        x: 0,
        y: 0,
        size: 15,
        color: 'hsl(200, 100%, 60%)',
        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            
            // Add glow effect
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 15;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    };
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update(mouse);
            particle.draw(ctx);
        });
        
        // Draw main ball (after particles so it appears on top)
        ball.draw(ctx);
        
        requestAnimationFrame(animate);
    }
    animate();
    
    // Track mouse
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
        ball.x = e.x;
        ball.y = e.y;
    });
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Interactive elements effect
    document.querySelectorAll('a, button, .card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            ball.color = 'hsl(40, 100%, 60%)';
            ball.size = 20;
        });
        el.addEventListener('mouseleave', () => {
            ball.color = 'hsl(200, 100%, 60%)';
            ball.size = 15;
        });
    });
});

