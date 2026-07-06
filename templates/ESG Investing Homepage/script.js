// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== MOBILE NAVIGATION DRAWER =====
const hamburger = document.getElementById('hamburger');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileDrawer = document.getElementById('mobileDrawer');
const drawerClose = document.getElementById('drawerClose');

function openDrawer() {
    mobileOverlay.classList.add('active');
    mobileDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeDrawer() {
    mobileOverlay.classList.remove('active');
    mobileDrawer.classList.remove('active');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', openDrawer);
mobileOverlay.addEventListener('click', closeDrawer);
drawerClose.addEventListener('click', closeDrawer);
document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
});

// ===== ACTIVE NAVIGATION LINKS =====
const navLinks = document.querySelectorAll('.nav-link[data-section]');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const link = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
            if (link) link.classList.add('active');
        }
    });
}, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });

document.querySelectorAll('header[id], section[id]').forEach(section => observer.observe(section));

// ===== TOAST NOTIFICATION =====
let toastTimeout;
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    
    toast.classList.remove('hidden');
    // Force reflow for CSS animation
    toast.offsetHeight;
    toast.classList.add('show');
    
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 3000);
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    document.querySelectorAll('.card-small-metric[data-count]').forEach(card => {
        const target = parseFloat(card.dataset.count);
        const suffix = card.dataset.suffix || '';
        const valueEl = card.querySelector('.small-metric-val');
        const duration = 1500;
        const start = performance.now();
        
        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            
            const currentVal = target * eased;
            valueEl.textContent = (target % 1 === 0 ? Math.floor(currentVal) : currentVal.toFixed(1)) + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    });
}

// Trigger counters when hero section is in view
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const heroSection = document.getElementById('hero');
if (heroSection) heroObserver.observe(heroSection);

// ===== ESG PORTFOLIO SIMULATOR =====
const investAmountInput = document.getElementById('investAmount');
const investAmountVal = document.getElementById('investAmountVal');
const esgFocusSelect = document.getElementById('esgFocus');
const projBalanceEl = document.getElementById('projBalance');
const projYieldEl = document.getElementById('projYield');
const impactCarbonEl = document.getElementById('impactCarbon');
const impactWaterEl = document.getElementById('impactWater');
const impactTreesEl = document.getElementById('impactTrees');

let activeRisk = 'moderate';

// Risk tolerance selectors
document.querySelectorAll('.risk-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.risk-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeRisk = btn.dataset.risk;
        calculateProjections();
    });
});

investAmountInput.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    investAmountVal.textContent = `$${val.toLocaleString()}`;
    calculateProjections();
});

esgFocusSelect.addEventListener('change', calculateProjections);

// Impact Multipliers: [Yield, Carbon per $1k, Water per $1k, Trees per $1k]
const simMetrics = {
    energy: {
        low: [0.048, 2.5, 15000, 12],
        moderate: [0.068, 3.2, 18000, 15],
        high: [0.092, 4.4, 25000, 22]
    },
    reforestation: {
        low: [0.042, 3.8, 8000, 48],
        moderate: [0.074, 5.2, 11000, 64],
        high: [0.098, 6.8, 15000, 92]
    },
    water: {
        low: [0.052, 1.2, 58000, 8],
        moderate: [0.064, 1.6, 72000, 10],
        high: [0.086, 2.2, 95000, 15]
    }
};

function calculateProjections() {
    const amount = parseInt(investAmountInput.value);
    const focus = esgFocusSelect.value;
    
    const [yieldRate, co2PerK, waterPerK, treesPerK] = simMetrics[focus][activeRisk];
    
    // Calculate compound growth for 5 years: P * (1 + r)^5
    const projectedBalance = amount * Math.pow(1 + yieldRate, 5);
    
    // Calculate environmental metrics
    const carbonOffset = (amount / 1000) * co2PerK;
    const waterSaved = (amount / 1000) * waterPerK;
    const treesPlanted = (amount / 1000) * treesPerK;
    
    // Update DOM
    projBalanceEl.textContent = `$${Math.round(projectedBalance).toLocaleString()}`;
    projYieldEl.textContent = `${(yieldRate * 100).toFixed(1)}%`;
    
    impactCarbonEl.textContent = `${Math.round(carbonOffset).toLocaleString()} Tons`;
    impactWaterEl.textContent = `${Math.round(waterSaved).toLocaleString()} L`;
    impactTreesEl.textContent = `${Math.round(treesPlanted).toLocaleString()} Trees`;
}

// Initialize simulator values
calculateProjections();

// ===== MODAL MANAGER =====
function openModal(id) {
    closeAllModals();
    document.getElementById('modalBackdrop').classList.remove('hidden');
    document.getElementById(id).classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeAllModals() {
    document.getElementById('modalBackdrop').classList.add('hidden');
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    document.body.style.overflow = '';
}

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
});

// ===== AUTH MODAL HANDLER =====
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const tabLogin = document.getElementById('tabLogin');
const tabRegister = document.getElementById('tabRegister');

function switchAuthTab(tab) {
    if (tab === 'login') {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    } else {
        tabLogin.classList.remove('active');
        tabRegister.classList.add('active');
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    }
}

function handleAuthSubmit(event, mode) {
    event.preventDefault();
    const form = event.currentTarget;
    const btn = form.querySelector('button[type="submit"]');
    const textSpan = btn.querySelector('.btn-text');
    const spinnerSpan = btn.querySelector('.btn-spinner');
    
    // Show spinner state
    textSpan.classList.add('hidden');
    spinnerSpan.classList.remove('hidden');
    btn.disabled = true;
    
    setTimeout(() => {
        // Reset button state
        textSpan.classList.remove('hidden');
        spinnerSpan.classList.add('hidden');
        btn.disabled = false;
        
        closeAllModals();
        form.reset();
        
        if (mode === 'login') {
            showToast('Securely authenticated. Welcome back!');
        } else {
            showToast('Investor account registered successfully. Awaiting verification.');
        }
    }, 1500);
}

// ===== FUND MODALS & LOGIC =====
const fundDetails = {
    solar: {
        title: "Solar Horizon III",
        desc: "Direct equity allocation in tier-1 European utility-scale solar installations. This fund yields stable dividend profile locked under long-term power purchase agreements (PPAs). Ideal for low-risk capital conservation with highly measurable carbon offset parameters.",
        yield: 0.058,
        e: 98, s: 76, g: 88
    },
    biogrowth: {
        title: "BioGrowth Equity",
        desc: "High-growth venture fund scaling agricultural technology, soil regeneration systems, and biodiversity carbon-credit platforms. Capitalizes on regulatory offset demands. Perfect for moderate to high yield capital appreciation profiles.",
        yield: 0.082,
        e: 94, s: 92, g: 90
    },
    urban: {
        title: "Urban Bloom REIT",
        desc: "Invest in high-density green commercial buildings and affordable housing communities across rapidly growing metropolitan hubs. Vetted for LEED platinum status and local community wealth building benchmarks.",
        yield: 0.045,
        e: 91, s: 95, g: 92
    }
};

let activeFundKey = 'solar';
const fundSimInput = document.getElementById('fundSimInput');
const fundSimYield = document.getElementById('fundSimYield');
const fundSimGrowth = document.getElementById('fundSimGrowth');

function openFundModal(fundKey) {
    const fund = fundDetails[fundKey];
    if (!fund) return;
    
    activeFundKey = fundKey;
    
    // Set text elements
    document.getElementById('modalFundTitle').textContent = fund.title;
    document.getElementById('modalFundDesc').textContent = fund.desc;
    
    // Set pillar bars
    document.getElementById('pillarE').style.width = `${fund.e}%`;
    document.getElementById('pillarValE').textContent = `${fund.e}%`;
    document.getElementById('pillarS').style.width = `${fund.s}%`;
    document.getElementById('pillarValS').textContent = `${fund.s}%`;
    document.getElementById('pillarG').style.width = `${fund.g}%`;
    document.getElementById('pillarValG').textContent = `${fund.g}%`;
    
    // Update simulation
    updateFundSimulation();
    
    openModal('fundModal');
}

function updateFundSimulation() {
    const fund = fundDetails[activeFundKey];
    const amount = parseFloat(fundSimInput.value) || 0;
    
    const projectedBalance = amount * Math.pow(1 + fund.yield, 5);
    
    fundSimYield.textContent = `${(fund.yield * 100).toFixed(1)}%`;
    fundSimGrowth.textContent = `$${Math.round(projectedBalance).toLocaleString()}`;
}

fundSimInput.addEventListener('input', updateFundSimulation);

// ===== SHAREHOLDER BALLOT VOTING =====
function handleBallotSubmit(event) {
    event.preventDefault();
    closeAllModals();
    showToast('Ballot cast successfully. Your 124 voting shares have been compiled.');
}

// ===== HERO PARTICLES ACCENT =====
function createHeroParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.style.cssText = `
            position: absolute;
            width: ${2 + Math.random() * 5}px;
            height: ${2 + Math.random() * 5}px;
            background: rgba(5, 150, 105, 0.08);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatParticle ${8 + Math.random() * 12}s ease-in-out infinite;
            animation-delay: ${-Math.random() * 10}s;
        `;
        container.appendChild(p);
    }
    
    // Inject particle style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.3; }
            50% { transform: translateY(-40px) translateX(20px) scale(1.3); opacity: 0.7; }
        }
    `;
    document.head.appendChild(style);
}

createHeroParticles();
