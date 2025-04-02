// Main document ready function
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a, .hero a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add active class to current section in navigation
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all navigation links
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding navigation link
                const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Update active navigation link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Call once on page load
    updateActiveNavLink();
    
    // Add direct click handler for talk cards
    document.querySelectorAll('.talk-card').forEach(card => {
        card.addEventListener('click', function() {
            const parentLink = this.closest('a');
            if (parentLink && parentLink.href) {
                window.location.href = parentLink.href;
            }
        });
    });
    
    // Make sure talk links don't trigger parent card click
    document.querySelectorAll('.talk-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
});

// Add additional styles for scroll animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    /* Animation for section titles */
    .section-title.animation-ready {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .section-title.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Animation for talk cards */
    .talk-card.animation-ready {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .talk-card.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Staggered animation for talk cards */
    .talk-card.animation-ready:nth-child(1) {
        transition-delay: 0.1s;
    }
    
    .talk-card.animation-ready:nth-child(2) {
        transition-delay: 0.2s;
    }
    
    .talk-card.animation-ready:nth-child(3) {
        transition-delay: 0.3s;
    }
    
    /* Animation for join methods */
    .join-method.animation-ready {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .join-method.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .join-method.animation-ready:nth-child(1) {
        transition-delay: 0.1s;
    }
    
    .join-method.animation-ready:nth-child(2) {
        transition-delay: 0.2s;
    }
    
    /* Active navigation link */
    nav a.active {
        color: var(--accent-color);
    }
    
    nav a.active::after {
        width: 100%;
    }
    
    /* Success message for subscription */
    .subscribe-success {
        background-color: #d4edda;
        color: #155724;
        padding: 10px;
        border-radius: 4px;
        margin-top: 10px;
        text-align: center;
        opacity: 1;
        transition: opacity 0.3s ease;
    }
`;

document.head.appendChild(styleSheet); 