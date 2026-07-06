document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animations & Navbar State
    const navbar = document.getElementById('main-nav');
    const animatedElements = document.querySelectorAll('.animate-up');
    const heroBg = document.getElementById('hero-bg');

    // Trigger hero background zoom effect on load
    setTimeout(() => {
        if(heroBg) heroBg.classList.add('loaded');
    }, 100);

    const checkScroll = () => {
        // Navbar glassmorphism
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('scrolled'); // Force glassmorphism to show text if bg is light? Wait, let's keep logic:
            if(window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Animate elements in view
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                el.classList.add('in-view');
            }
        });
    };
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check

    // 2. Product Database
    const products = {
        'hydration-trio': {
            title: 'The Hydration Trio',
            price: 124.00,
            type: 'Dry & Dehydrated Skin',
            img: 'https://images.unsplash.com/photo-1571781564344-935fb31d4791?q=80&w=600&auto=format&fit=crop',
            desc: 'A complete three-step system designed to flood the skin with molecular hydration, lock in moisture, and restore the lipid barrier.',
            ingredients: ['Hyaluronic Acid Complex', 'Ceramide NP', 'Squalane']
        },
        'clarifying-ritual': {
            title: 'Clarifying Ritual',
            price: 98.00,
            type: 'Oily & Blemish-Prone',
            img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600&auto=format&fit=crop',
            desc: 'A balancing regimen that deeply decongests pores, regulates sebum production, and calms inflammation without stripping.',
            ingredients: ['2% Salicylic Acid', 'Niacinamide', 'Centella Asiatica']
        },
        'renewal-system': {
            title: 'Renewal System',
            price: 210.00,
            type: 'Advanced Aging',
            img: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=600&auto=format&fit=crop',
            desc: 'Our most potent age-defying protocol. Accelerates cellular turnover and boosts collagen synthesis for visibly firmer skin.',
            ingredients: ['Encapsulated Retinol', 'Matrixyl 3000', 'Vitamin C']
        },
        'elixir': {
            title: 'Peptide Rejuvenating Elixir',
            price: 145.00,
            type: 'All Skin Types',
            img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
            desc: 'A lightweight serum packed with 5 distinct peptides to instantly plump, lift, and sculpt the facial contours.',
            ingredients: ['Copper Peptides', 'Argireline', 'Glycerin']
        }
    };

    // 3. Cart State Management
    let cart = [];
    const cartDrawer = document.getElementById('cart-drawer');
    const cartBackdrop = document.getElementById('cart-drawer-backdrop');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const cartBadge = document.getElementById('nav-cart-badge');

    const toggleCart = (show) => {
        if (show) {
            cartDrawer.classList.add('open');
            cartBackdrop.classList.add('active');
            renderCart();
        } else {
            cartDrawer.classList.remove('open');
            cartBackdrop.classList.remove('active');
        }
    };

    document.getElementById('btn-open-cart').addEventListener('click', () => toggleCart(true));
    document.getElementById('close-cart').addEventListener('click', () => toggleCart(false));
    cartBackdrop.addEventListener('click', () => toggleCart(false));

    const addToCart = (productId) => {
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.qty += 1;
        } else {
            cart.push({ id: productId, qty: 1 });
        }
        showToast(`${products[productId].title} added to bag.`);
        renderCart();
    };

    const updateQty = (productId, delta) => {
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.qty += delta;
            if (item.qty <= 0) {
                cart = cart.filter(i => i.id !== productId);
            }
        }
        renderCart();
    };

    const renderCart = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let count = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your bag is currently empty.</div>';
        } else {
            cart.forEach(item => {
                const product = products[item.id];
                total += product.price * item.qty;
                count += item.qty;

                const el = document.createElement('div');
                el.className = 'cart-item';
                el.innerHTML = `
                    <img src="${product.img}" alt="${product.title}">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${product.title}</div>
                        <div class="cart-item-price">$${product.price.toFixed(2)}</div>
                        <div class="cart-item-actions">
                            <div class="qty-control">
                                <button class="qty-btn" onclick="window.updateCartQty('${item.id}', -1)">-</button>
                                <span>${item.qty}</span>
                                <button class="qty-btn" onclick="window.updateCartQty('${item.id}', 1)">+</button>
                            </div>
                            <button class="btn-remove" onclick="window.updateCartQty('${item.id}', -${item.qty})">Remove</button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(el);
            });
        }

        cartSubtotalEl.textContent = `$${total.toFixed(2)}`;
        cartBadge.textContent = count;
    };
    
    // Expose for inline onclick
    window.updateCartQty = updateQty;

    // 4. Quick View Modal
    const qvModal = document.getElementById('quickview-modal');
    let currentQvProduct = null;

    const openQuickView = (productId) => {
        currentQvProduct = productId;
        const p = products[productId];
        document.getElementById('qv-img').src = p.img;
        document.getElementById('qv-title').textContent = p.title;
        document.getElementById('qv-type').textContent = p.type;
        document.getElementById('qv-price').textContent = `$${p.price.toFixed(2)}`;
        document.getElementById('qv-description').textContent = p.desc;
        
        const list = document.getElementById('qv-ingredients-list');
        list.innerHTML = '';
        p.ingredients.forEach(i => {
            const li = document.createElement('li');
            li.textContent = i;
            list.appendChild(li);
        });

        qvModal.classList.add('active');
    };

    document.querySelectorAll('.btn-quickview').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent card click
            openQuickView(btn.getAttribute('data-id'));
        });
    });

    document.getElementById('close-quickview').addEventListener('click', () => qvModal.classList.remove('active'));
    document.getElementById('btn-qv-add').addEventListener('click', () => {
        if(currentQvProduct) {
            addToCart(currentQvProduct);
            qvModal.classList.remove('active');
        }
    });

    // 5. Skin Quiz Logic
    const quizModal = document.getElementById('quiz-modal');
    const steps = [
        document.getElementById('q-step-1'),
        document.getElementById('q-step-2'),
        document.getElementById('q-step-3')
    ];
    let currentStep = 0;
    
    const btnQuizNext = document.getElementById('btn-quiz-next');
    const btnQuizBack = document.getElementById('btn-quiz-back');
    const progressBar = document.getElementById('quiz-progress');

    const updateQuizUI = () => {
        steps.forEach((s, i) => {
            s.classList.toggle('active', i === currentStep);
        });
        
        progressBar.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
        
        if (currentStep === 0) {
            btnQuizBack.classList.add('hidden');
        } else {
            btnQuizBack.classList.remove('hidden');
        }

        if (currentStep === steps.length - 1) {
            btnQuizNext.classList.add('hidden');
            btnQuizBack.classList.add('hidden');
            calculateResult();
        } else {
            btnQuizNext.classList.remove('hidden');
        }
    };

    const calculateResult = () => {
        // Simple logic for demo
        const concern = document.querySelector('input[name="concern"]:checked')?.value;
        let recommended = 'hydration-trio';
        
        if(concern === 'Acne') recommended = 'clarifying-ritual';
        if(concern === 'Aging') recommended = 'renewal-system';
        
        const p = products[recommended];
        document.getElementById('result-title').textContent = p.title;
        document.getElementById('result-desc').textContent = p.type;
        document.getElementById('result-img').src = p.img;
        document.getElementById('result-price').textContent = `$${p.price.toFixed(2)}`;
        
        // Attach add to cart action for result
        document.getElementById('btn-result-add').onclick = () => {
            addToCart(recommended);
            quizModal.classList.remove('active');
            toggleCart(true);
        };
    };

    document.querySelectorAll('.btn-open-quiz').forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep = 0;
            // reset radios
            document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
            updateQuizUI();
            quizModal.classList.add('active');
        });
    });

    document.getElementById('close-quiz').addEventListener('click', () => quizModal.classList.remove('active'));

    btnQuizNext.addEventListener('click', () => {
        // Validation
        if(currentStep === 0 && !document.querySelector('input[name="skinType"]:checked')) {
            showToast('Please select your skin type.');
            return;
        }
        if(currentStep === 1 && !document.querySelector('input[name="concern"]:checked')) {
            showToast('Please select your primary concern.');
            return;
        }
        if (currentStep < steps.length - 1) {
            currentStep++;
            updateQuizUI();
        }
    });

    btnQuizBack.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            updateQuizUI();
        }
    });

    // 6. Toasts
    const toastContainer = document.getElementById('toast-container');
    const showToast = (msg) => {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = msg;
        toastContainer.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    };

    // Newsletter submit intercept
    document.getElementById('newsletter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Welcome to the collective. Check your email.');
        e.target.reset();
    });
});