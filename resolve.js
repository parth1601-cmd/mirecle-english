document.addEventListener('DOMContentLoaded', () => {
    // Carousel Functionality
    const carousel = {
        currentIndex: 0,
        images: document.querySelector('.carousel-images'),
        imageCount: document.querySelectorAll('.carousel-images img').length,
        
        showImage(index) {
            this.images.style.transform = `translateX(-${index * 100}%)`;
        },
        
        nextImage() {
            this.currentIndex = (this.currentIndex + 1) % this.imageCount;
            this.showImage(this.currentIndex);
        },
        
        prevImage() {
            this.currentIndex = (this.currentIndex - 1 + this.imageCount) % this.imageCount;
            this.showImage(this.currentIndex);
        },
        
        init() {
            // Auto-slide every 4 seconds
            setInterval(() => this.nextImage(), 4000);
            
            // Add event listeners to control buttons
            const prevBtn = document.querySelector('.carousel-controls button:first-child');
            const nextBtn = document.querySelector('.carousel-controls button:last-child');
            
            prevBtn.addEventListener('click', () => this.prevImage());
            nextBtn.addEventListener('click', () => this.nextImage());
        }
    };
    
    // Mobile Navigation Menu
    const mobileMenu = {
        hamburger: document.querySelector('.hamburger'),
        navbarMenu: document.querySelector('.navbar-menu'),
        
        toggleMenu() {
            this.hamburger.classList.toggle('active');
            this.navbarMenu.classList.toggle('active');
        },
        
        init() {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
            
            // Close menu when clicking outside
            document.addEventListener('click', (event) => {
                if (!this.hamburger.contains(event.target) && 
                    !this.navbarMenu.contains(event.target)) {
                    this.hamburger.classList.remove('active');
                    this.navbarMenu.classList.remove('active');
                }
            });
        }
    };
    
    // Form Validation
    const formValidation = {
        contactForm: document.querySelector('.contact form'),
        
        validateForm(event) {
            event.preventDefault();
            const name = event.target.querySelector('input[type="text"]');
            const email = event.target.querySelector('input[type="email"]');
            const message = event.target.querySelector('textarea');
            
            // Basic validation
            const errors = [];
            
            if (!name.value.trim()) {
                errors.push('Please enter your name');
                name.classList.add('error');
            } else {
                name.classList.remove('error');
            }
            
            if (!email.value.trim() || !this.isValidEmail(email.value)) {
                errors.push('Please enter a valid email');
                email.classList.add('error');
            } else {
                email.classList.remove('error');
            }
            
            if (!message.value.trim()) {
                errors.push('Please enter a message');
                message.classList.add('error');
            } else {
                message.classList.remove('error');
            }
            
            // Display or process errors
            if (errors.length > 0) {
                this.displayErrors(errors);
            } else {
                this.submitForm(event.target);
            }
        },
        
        isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        
        displayErrors(errors) {
            // Remove existing error messages
            const existingErrors = document.querySelectorAll('.form-error');
            existingErrors.forEach(el => el.remove());
            
            // Create error message container
            const errorContainer = document.createElement('div');
            errorContainer.classList.add('form-error');
            
            errors.forEach(error => {
                const errorMsg = document.createElement('p');
                errorMsg.textContent = error;
                errorContainer.appendChild(errorMsg);
            });
            
            // Append error container before the form
            this.contactForm.insertBefore(errorContainer, this.contactForm.firstChild);
        },
        
        submitForm(form) {
            // Simulate form submission
            alert('Form submitted successfully!');
            form.reset();
        },
        
        init() {
            if (this.contactForm) {
                this.contactForm.addEventListener('submit', (event) => this.validateForm(event));
            }
        }
    };
    
    // Smooth Scrolling for Navigation
    const smoothScroll = {
        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({ 
                            behavior: 'smooth' 
                        });
                    }
                });
            });
        }
    };
    
    // Initialize all functionality
    function initializeWebsite() {
        carousel.init();
        mobileMenu.init();
        formValidation.init();
        smoothScroll.init();
    }
    
    // Run initialization
    initializeWebsite();
});