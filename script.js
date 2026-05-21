// script.js - Interactive features and functionality

(function() {
    // ============================================
    // IMAGE SOURCES - REPLACE THESE WITH YOUR ACTUAL IMAGE PATHS
    // ============================================
    // For local images, create an "images" folder and put your images there
    const PROFILE_IMAGE_SRC = "images/profile.jpg";
    const UPDATE_IMAGE_SRC = "images/update.png";
    
    // Load components into the main page
    function loadComponents() {
        // Load navigation
        fetch('nav.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('nav-container').innerHTML = data;
            })
            .catch(error => console.error('Error loading nav.html:', error));
        
        // Load body content
        fetch('body.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('body-container').innerHTML = data;
                // Set image sources after body is loaded
                setImageSources();
                // Bind events after content is loaded
                setTimeout(bindEvents, 100);
            })
            .catch(error => console.error('Error loading body.html:', error));
        
        // Load footer
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer-container').innerHTML = data;
            })
            .catch(error => console.error('Error loading footer.html:', error));
    }
    
    // Set image sources for profile and update images
    function setImageSources() {
        const profileImg = document.getElementById('profileImage');
        if (profileImg) profileImg.src = PROFILE_IMAGE_SRC;
        
        const updateImg = document.getElementById('updatePhotoImg');
        if (updateImg) updateImg.src = UPDATE_IMAGE_SRC;
    }
    
    // Bind all interactive events
    function bindEvents() {
        // Navigation smooth scroll
        document.querySelectorAll('.nav-link-item').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('data-nav');
                document.querySelectorAll('.nav-link-item').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                const sections = { 
                    home: 'homeSection', 
                    projects: 'projectsSection', 
                    skills: 'skillsSection', 
                    testimonials: 'testimonialsSection', 
                    contact: 'contactSection' 
                };
                const element = document.getElementById(sections[target]);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            });
        });
        
        // Search overlay functionality
        const searchOverlay = document.getElementById('searchOverlayGlobal');
        const openSearchBtns = [document.getElementById('navSearchBtnGlobal'), document.getElementById('footerSearchBtnGlobal')];
        const closeSearchBtn = document.getElementById('closeSearchDialogBtn');
        
        openSearchBtns.forEach(btn => {
            if (btn) btn.addEventListener('click', () => {
                if (searchOverlay) searchOverlay.classList.add('search-active');
            });
        });
        
        if (closeSearchBtn) {
            closeSearchBtn.addEventListener('click', () => {
                if (searchOverlay) searchOverlay.classList.remove('search-active');
            });
        }
        
        if (searchOverlay) {
            searchOverlay.addEventListener('click', (e) => {
                if (e.target === searchOverlay) searchOverlay.classList.remove('search-active');
            });
        }
        
        // Search functionality
        const searchInput = document.getElementById('globalSearchField');
        const resultsDiv = document.getElementById('searchResultsArea');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                if (term.length < 2) {
                    resultsDiv.innerHTML = '<p class="search-initial-hint">🔍 Type at least 2 characters...</p>';
                    return;
                }
                const items = document.querySelectorAll('.project-photo-card, .skill-single, .testimonial-card, .update-item-modern');
                let matches = [];
                items.forEach(el => {
                    if (el.innerText.toLowerCase().includes(term)) {
                        matches.push(el.innerText.substring(0, 100));
                    }
                });
                if (matches.length > 0) {
                    resultsDiv.innerHTML = `<ul style="list-style:none;">${matches.slice(0, 5).map(m => `<li style="padding:8px 0;">🔎 ${m}</li>`).join('')}</ul>`;
                } else {
                    resultsDiv.innerHTML = '<p>No results found</p>';
                }
            });
        }
        
        // Hero buttons
        const heroContactBtn = document.getElementById('heroContactBtnMain');
        const heroProjectsBtn = document.getElementById('heroProjectsBtnMain');
        if (heroContactBtn) {
            heroContactBtn.addEventListener('click', () => {
                document.getElementById('contactSection')?.scrollIntoView({ behavior: 'smooth' });
            });
        }
        if (heroProjectsBtn) {
            heroProjectsBtn.addEventListener('click', () => {
                document.getElementById('projectsSection')?.scrollIntoView({ behavior: 'smooth' });
            });
        }
        
        // Download CV button
        const downloadBtn = document.getElementById('downloadCvBtnMain');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => showToast("📄 Downloading CV - Tyler_Jones_Resume.pdf"));
        }
        
        // Social media buttons
        const linkedinBtn = document.getElementById('linkedInBtnMain');
        const twitterBtn = document.getElementById('twitterBtnMain');
        if (linkedinBtn) {
            linkedinBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showToast("🔗 LinkedIn Profile (demo)");
            });
        }
        if (twitterBtn) {
            twitterBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showToast("🐦 Twitter/X feed demo");
            });
        }
        
        // Contact form submission
        const contactForm = document.getElementById('contactFormMain');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                showToast("✅ Message sent! Tyler will reply soon.");
                contactForm.reset();
            });
        }
        
        // Footer social links
        document.querySelectorAll('.footer-social-link-item').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showToast("🌐 Social media demo");
            });
        });
        
        // Mobile menu toggle
        const mobileBtn = document.getElementById('mobileMenuToggleBtn');
        const navWrap = document.getElementById('navLinksWrapper');
        if (mobileBtn && navWrap) {
            mobileBtn.addEventListener('click', () => {
                navWrap.classList.toggle('mobile-nav-open');
            });
        }
    }
    
    // Toast notification function
    function showToast(message) {
        const toast = document.getElementById('globalToast');
        if (toast) {
            toast.textContent = message;
            toast.classList.add('toast-show');
            setTimeout(() => toast.classList.remove('toast-show'), 2500);
        }
    }
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', loadComponents);
})();