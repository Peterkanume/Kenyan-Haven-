// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Navigation functionality
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        // Toggle navigation
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }

    // Call the navigation function
    navSlide();

    // Smooth scrolling for navigation links (for single-page layout)
    const smoothScroll = () => {
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Only prevent default if it's a hash link
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // Call the smooth scroll function
    smoothScroll();

    // Services page animations
    const animateServices = () => {
        const serviceItems = document.querySelectorAll('.service-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2 // Trigger when 20% of the item is visible
        });

        serviceItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Call the service animations function if we're on the services page
    if (document.querySelector('.service-item')) {
        animateServices();
    }

    // Contact form submission
    const handleContactForm = () => {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);

                // Replace with your actual server endpoint
                fetch('http://localhost:3003/submit-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                .then(response => response.text())
                .then(result => {
                    alert(result);
                    contactForm.reset();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again later.');
                });
            });
        }
    }

    // Call the contact form handler
    handleContactForm();

    // Gallery toggle functionality (if applicable)
    const galleryToggle = () => {
        const toggleButtons = document.querySelectorAll('.gallery-toggle');
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const gallery = button.nextElementSibling;
                gallery.classList.toggle('gallery-active');
                button.textContent = gallery.classList.contains('gallery-active') ? 'Hide Gallery' : 'View Gallery';
            });
        });
    }

    // Call the gallery toggle function if we're on a page with galleries
    if (document.querySelector('.gallery-toggle')) {
        galleryToggle();
    }

});

/* For the client-side JavaScript (in your script.js), update the form submission code to:
itareplace hapo juu tu kwa server endpoint if applicable juu sijaelewa

fetch('/submit-form', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
.then(response => response.text())
.then(result => {
    alert(result);
    contactForm.reset();
})
.catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
});
*/