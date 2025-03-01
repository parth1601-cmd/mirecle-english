document.addEventListener('DOMContentLoaded', () => {
    const svg = document.querySelector('svg');
    const form = document.querySelector('.form-container');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subscribeCheckbox = document.getElementById('subscribe');
    const submitButton = document.querySelector('input[type="submit"]');

    // Form Validation
    function validateForm() {
        let isValid = true;

        // Name validation
        if (!nameInput.value.trim()) {
            nameInput.classList.add('error');
            isValid = false;
        } else {
            nameInput.classList.remove('error');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
            emailInput.classList.add('error');
            isValid = false;
        } else {
            emailInput.classList.remove('error');
        }

        // Checkbox validation
        if (!subscribeCheckbox.checked) {
            subscribeCheckbox.classList.add('error');
            isValid = false;
        } else {
            subscribeCheckbox.classList.remove('error');
        }

        return isValid;
    }

    // GSAP Animations
    function initializeAnimations() {
        // Grabbing Hand Animation
        const grabHandGroup = svg.querySelector('.grabbing-hand');
        const pullSystem = svg.querySelector('.pull-system');
        const gears = svg.querySelector('.gears');

        // Create a timeline for complex animations
        const tl = gsap.timeline({ repeat: -1, yoyo: true });

        // Animate grabbing hand fingers
        tl.fromTo('.grabbing-hand-finger-open', 
            { scaleY: 1 }, 
            { scaleY: 0.5, duration: 0.5, stagger: 0.1 }
        )
        .to('.grabbing-hand-finger-open', {
            scaleY: 1, 
            duration: 0.5, 
            stagger: 0.1
        });

        // Spray hand animation
        const sprayHandContainer = svg.querySelector('.spray-hand-container');
        gsap.fromTo(sprayHandContainer, 
            { rotation: -5, transformOrigin: 'center' },
            { rotation: 5, duration: 1, repeat: -1, yoyo: true }
        );

        // Form Submission Interaction
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (validateForm()) {
                // Trigger SVG animation on successful validation
                gsap.to('.grabbing-hand', {
                    x: 50,
                    rotation: 15,
                    duration: 0.5,
                    onComplete: () => {
                        gsap.to('.grabbing-hand', {
                            x: 0,
                            rotation: 0,
                            duration: 0.5
                        });
                    }
                });
            }
        });
    }

    // Initialize animations
    initializeAnimations();

    // Add error state styles
    const style = document.createElement('style');
    style.textContent = `
        .error {
            border: 2px solid red !important;
            animation: shake 0.3s;
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 90% { transform: translateX(-5px); }
            20%, 80% { transform: translateX(5px); }
            30%, 50%, 70% { transform: translateX(-5px); }
            40%, 60% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});