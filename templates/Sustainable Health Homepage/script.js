document.addEventListener('DOMContentLoaded', () => {
    
    // --- Hero Animation ---
    setTimeout(() => {
        document.getElementById('hero-bg').classList.add('loaded');
        document.querySelector('.hero-content').classList.add('loaded');
    }, 100);

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Toast Notifications ---
    const toastContainer = document.getElementById('toast-container');
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toastContainer.appendChild(toast);
        
        // Trigger reflow
        void toast.offsetWidth;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // --- Shop Drawer ---
    const btnOpenShop = document.getElementById('btn-open-shop');
    const btnHeroShop = document.getElementById('btn-hero-shop');
    const shopDrawer = document.getElementById('shop-drawer');
    const drawerBackdrop = document.getElementById('shop-drawer-backdrop');
    const btnCloseDrawer = document.getElementById('close-drawer');
    const cartCountEl = document.getElementById('cart-count');
    const navCartBadge = document.getElementById('nav-cart-badge');
    
    let cartCount = 0;

    function openDrawer() {
        shopDrawer.classList.add('open');
        drawerBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        shopDrawer.classList.remove('open');
        drawerBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    btnOpenShop.addEventListener('click', (e) => { e.preventDefault(); openDrawer(); });
    btnHeroShop.addEventListener('click', (e) => { e.preventDefault(); openDrawer(); });
    btnCloseDrawer.addEventListener('click', closeDrawer);
    drawerBackdrop.addEventListener('click', closeDrawer);

    document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemName = e.target.getAttribute('data-name');
            cartCount++;
            cartCountEl.textContent = cartCount;
            navCartBadge.textContent = cartCount;
            showToast(`Added ${itemName} to your tote`);
            e.target.textContent = "Added ✓";
            e.target.style.background = "var(--color-green)";
            e.target.style.color = "white";
            e.target.style.borderColor = "var(--color-green)";
            setTimeout(() => {
                e.target.textContent = "Add to Tote";
                e.target.style.background = "";
                e.target.style.color = "";
                e.target.style.borderColor = "";
            }, 2000);
        });
    });

    // --- Refill Modal (Multi-step Form) ---
    const btnHeroRefill = document.getElementById('btn-hero-refill');
    const refillModal = document.getElementById('refill-modal');
    const closeRefillModal = document.getElementById('close-modal');
    
    const btnNext = document.getElementById('btn-next');
    const btnBack = document.getElementById('btn-back');
    const modalProgress = document.getElementById('modal-progress');
    const steps = [
        document.getElementById('step-1'),
        document.getElementById('step-2'),
        document.getElementById('step-3')
    ];
    let currentStep = 0;

    function openModal() {
        refillModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        currentStep = 0;
        updateSteps();
    }
    
    function closeModal() {
        refillModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    btnHeroRefill.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    closeRefillModal.addEventListener('click', closeModal);
    
    // Close on click outside
    refillModal.addEventListener('click', (e) => {
        if (e.target === refillModal) closeModal();
    });

    function updateSteps() {
        steps.forEach((step, idx) => {
            step.classList.toggle('active', idx === currentStep);
        });
        
        modalProgress.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
        
        if (currentStep === 0) {
            btnBack.classList.add('hidden');
            btnNext.textContent = 'Next Step';
            btnNext.classList.remove('hidden');
        } else if (currentStep === steps.length - 1) {
            btnBack.classList.add('hidden');
            btnNext.textContent = 'Done';
        } else {
            btnBack.classList.remove('hidden');
            btnNext.textContent = 'Confirm Subscription';
            btnNext.classList.remove('hidden');
        }
    }

    btnNext.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            updateSteps();
            if (currentStep === steps.length - 1) {
                showToast("Subscription successfully created!");
            }
        } else {
            closeModal();
        }
    });

    btnBack.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            updateSteps();
        }
    });

    // --- Interactive Carbon Calculator ---
    const sliderRefills = document.getElementById('slider-refills');
    const sliderMonths = document.getElementById('slider-months');
    
    const valRefills = document.getElementById('val-refills');
    const valMonths = document.getElementById('val-months');
    
    const metricCo2 = document.getElementById('metric-co2');
    const metricBottles = document.getElementById('metric-bottles');
    const metricTrees = document.getElementById('metric-trees');
    
    const progressRingFill = document.getElementById('progress-ring-fill');
    const ecoTierName = document.getElementById('eco-tier-name');

    // Circle config
    const radius = 130;
    const circumference = radius * 2 * Math.PI; // ~816.8
    progressRingFill.style.strokeDasharray = `${circumference} ${circumference}`;
    progressRingFill.style.strokeDashoffset = circumference;

    function calculateImpact() {
        const refills = parseInt(sliderRefills.value);
        const months = parseInt(sliderMonths.value);
        
        valRefills.textContent = `${refills} ${refills === 1 ? 'bottle' : 'bottles'}`;
        valMonths.textContent = `${months} ${months === 1 ? 'month' : 'months'}`;
        
        // Math Models
        const totalBottles = refills * months;
        // 0.3kg CO2 per plastic bottle not manufactured
        const co2Saved = (totalBottles * 0.3).toFixed(1); 
        // 1 tree planted per 24 bottles refilled
        const treesPlanted = Math.floor(totalBottles / 24);

        // Animate numbers (simple instantaneous update here, could use requestAnimationFrame for counting up)
        metricBottles.textContent = totalBottles;
        metricCo2.textContent = co2Saved;
        metricTrees.textContent = treesPlanted;

        // Tier Logic based on total bottles
        let tier = "Seedling";
        let color = "#059669"; // Green
        let progress = 0; // 0 to 1

        if (totalBottles < 48) {
            tier = "Seedling";
            color = "#059669";
            progress = totalBottles / 48; // up to 100% of tier 1
        } else if (totalBottles < 120) {
            tier = "Sprout";
            color = "#10b981";
            progress = totalBottles / 120;
        } else if (totalBottles < 300) {
            tier = "Sapling";
            color = "#34d399";
            progress = totalBottles / 300;
        } else {
            tier = "Forest";
            color = "#047857";
            progress = Math.min(totalBottles / 600, 1);
        }

        ecoTierName.textContent = tier;
        ecoTierName.style.color = color;
        
        // Update SVG circle
        // Keep between 5% and 100% visually
        const visualProgress = Math.max(0.05, progress);
        const offset = circumference - (visualProgress * circumference);
        progressRingFill.style.strokeDashoffset = offset;
        progressRingFill.style.stroke = color;
    }

    sliderRefills.addEventListener('input', calculateImpact);
    sliderMonths.addEventListener('input', calculateImpact);
    
    // Initial Calc
    setTimeout(calculateImpact, 500); // slight delay so ring animation is visible on load
});