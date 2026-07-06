// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    scrollTop.classList.toggle('hidden', window.scrollY < 400);
});

// ===== MOBILE DRAWER =====
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

// ===== NAV ACTIVE LINK =====
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

document.querySelectorAll('section[id]').forEach(section => observer.observe(section));

// ===== SEARCH TABS =====
const searchTabs = document.querySelectorAll('.search-tab');
const searchPharmacy = document.getElementById('searchPharmacy');
const searchMedication = document.getElementById('searchMedication');
const searchResults = document.getElementById('searchResults');

searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        searchTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        searchResults.classList.add('hidden');
        
        if (tab.dataset.tab === 'pharmacy') {
            searchPharmacy.classList.remove('hidden');
            searchMedication.classList.add('hidden');
        } else {
            searchPharmacy.classList.add('hidden');
            searchMedication.classList.remove('hidden');
        }
    });
});

// ===== FILTER CHIPS =====
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
        chip.classList.toggle('active');
    });
});

// ===== PHARMACY SEARCH =====
const searchBtn = document.getElementById('searchBtn');
const zipInput = document.getElementById('zipInput');

searchBtn.addEventListener('click', () => {
    const btnText = searchBtn.querySelector('.btn-text-inner');
    const btnLoader = searchBtn.querySelector('.btn-loader');
    
    btnText.style.display = 'none';
    btnLoader.style.display = 'flex';
    searchBtn.disabled = true;
    
    setTimeout(() => {
        btnText.style.display = '';
        btnLoader.style.display = 'none';
        searchBtn.disabled = false;
        searchResults.classList.remove('hidden');
        searchResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1200);
});

zipInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});

// ===== MEDICATION SEARCH =====
const medSearchBtn = document.getElementById('medSearchBtn');
const medInput = document.getElementById('medInput');
const medResults = document.getElementById('medResults');
const medName = document.getElementById('medName');
const medInfo = document.getElementById('medInfo');

const medications = {
    'amoxicillin': { name: 'Amoxicillin 500mg', info: 'Available at 12 pharmacies near you. Generic alternative saves up to 80%.' },
    'lisinopril': { name: 'Lisinopril 10mg', info: 'In stock at all locations. $4 generic available with most insurance plans.' },
    'metformin': { name: 'Metformin 500mg', info: 'Available at 15 pharmacies. Extended release formula also available.' },
    'ibuprofen': { name: 'Ibuprofen 200mg', info: 'Over-the-counter. Available at all locations without prescription.' },
};

medSearchBtn.addEventListener('click', () => {
    const query = medInput.value.toLowerCase().trim();
    const med = medications[query] || { name: query || 'Medication', info: 'Available at multiple pharmacies near you. Ask our pharmacist for alternatives.' };
    medName.textContent = med.name;
    medInfo.textContent = med.info;
    medResults.classList.remove('hidden');
});

medInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') medSearchBtn.click();
});

// ===== PHARMACY SELECTION =====
function selectPharmacy(el) {
    document.querySelectorAll('.pharmacy-item').forEach(item => item.classList.remove('selected'));
    el.classList.add('selected');
    
    const pins = document.querySelectorAll('.map-pin');
    const items = document.querySelectorAll('.pharmacy-item');
    const index = Array.from(items).indexOf(el);
    pins.forEach(p => p.classList.remove('active'));
    if (pins[index]) pins[index].classList.add('active');
}

// View All Locations
document.getElementById('viewAllBtn').addEventListener('click', () => {
    showToast('Showing all 15 pharmacy locations on the map');
});

// ===== FAQ ACCORDION =====
function toggleFaq(el) {
    const wasOpen = el.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('open'));
    if (!wasOpen) el.classList.add('open');
}

// ===== NEWSLETTER =====
function handleNewsletter(e) {
    e.preventDefault();
    const form = document.getElementById('newsletterForm');
    const success = document.getElementById('newsletterSuccess');
    const inputGroup = form.querySelector('.newsletter-input-group');
    
    inputGroup.style.display = 'none';
    success.classList.remove('hidden');
    success.style.display = 'flex';
    
    setTimeout(() => {
        inputGroup.style.display = '';
        success.classList.add('hidden');
        success.style.display = '';
        form.reset();
    }, 4000);
}

// ===== CHAT =====
const chatResponses = [
    "That's a great question! Let me look into that for you.",
    "Based on your description, I'd recommend consulting with your prescribing physician. However, generally speaking...",
    "I understand your concern. Here's what you should know about that medication.",
    "For safety, I'd suggest coming into our nearest location so we can review your full medication profile.",
    "That's very common and usually not a cause for concern. Keep monitoring and contact us if symptoms persist.",
];

function handleChat(e) {
    e.preventDefault();
    const input = document.getElementById('chatInput');
    const chatWindow = document.getElementById('chatWindow');
    const msg = input.value.trim();
    if (!msg) return;
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg outgoing';
    userMsg.innerHTML = `<div class="chat-avatar">Y</div><div class="chat-text">${escapeHtml(msg)}</div>`;
    chatWindow.appendChild(userMsg);
    input.value = '';
    chatWindow.scrollTop = chatWindow.scrollHeight;
    
    // Simulate pharmacist response
    setTimeout(() => {
        const response = chatResponses[Math.floor(Math.random() * chatResponses.length)];
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-msg incoming';
        botMsg.innerHTML = `<div class="chat-avatar">P</div><div class="chat-text">${response}</div>`;
        chatWindow.appendChild(botMsg);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 1000 + Math.random() * 1000);
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ===== FILE UPLOAD =====
function handleFileUpload(input) {
    if (input.files.length > 0) {
        document.getElementById('uploadArea').classList.add('hidden');
        document.getElementById('uploadSuccess').classList.remove('hidden');
    }
}

// ===== MODALS =====
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

// Close modals on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
});

// ===== TOAST =====
let toastTimeout;
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').textContent = message;
    toast.classList.remove('hidden');
    
    // Force reflow for animation
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
    document.querySelectorAll('.stat-card[data-count]').forEach(card => {
        const target = parseInt(card.dataset.count);
        const suffix = card.dataset.suffix || '';
        const valueEl = card.querySelector('.stat-value');
        const duration = 2000;
        const start = performance.now();
        
        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            valueEl.textContent = Math.floor(target * eased).toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

// Trigger counters when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.getElementById('hero');
if (heroSection) heroObserver.observe(heroSection);

// ===== HERO PARTICLES =====
function createParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${3 + Math.random() * 6}px;
            height: ${3 + Math.random() * 6}px;
            background: ${Math.random() > 0.5 ? 'rgba(37,99,235,0.1)' : 'rgba(16,185,129,0.1)'};
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${-Math.random() * 10}s;
        `;
        container.appendChild(particle);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
            25% { transform: translate(20px, -30px) scale(1.2); opacity: 0.7; }
            50% { transform: translate(-10px, -50px) scale(0.8); opacity: 0.5; }
            75% { transform: translate(30px, -20px) scale(1.1); opacity: 0.6; }
        }
    `;
    document.head.appendChild(style);
}

createParticles();

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.bento-card, .team-card, .faq-item, .metric-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animObserver.observe(el);
});