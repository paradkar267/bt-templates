document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animations on Scroll
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // Product Data (Mock DB)
    const products = {
        1: { title: "Elite Hydrolyzed Whey Isolate", price: 54.99, img: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=400&auto=format&fit=crop", cat: "Muscle & Power" },
        2: { title: "Bio-Active Men's Multivitamin", price: 32.00, img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=400&auto=format&fit=crop", cat: "Daily Wellness" },
        3: { title: "Neuro-Focus Pre-Workout", price: 44.50, img: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?q=80&w=400&auto=format&fit=crop", cat: "Energy & Focus" },
        4: { title: "Phyto-Nutrient Daily Greens", price: 39.99, img: "https://images.unsplash.com/photo-1599818815152-a38f328fbd4b?q=80&w=400&auto=format&fit=crop", cat: "Plant-Based" }
    };

    // State
    let cart = [];

    // DOM Elements
    const toast = document.getElementById('toast');
    
    // Toast fn
    const showToast = (msg) => {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    };

    // --- Tab Filtering ---
    const filterTabs = document.querySelectorAll('#filter-tabs button');
    const productCards = document.querySelectorAll('.product-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active state
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');
            
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    card.classList.remove('hidden-product');
                } else {
                    card.classList.add('hidden-product');
                }
            });
        });
    });

    // --- Cart Drawer ---
    const cartOverlay = document.getElementById('cart-overlay');
    const cartDrawer = document.getElementById('cart-drawer');
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartSubtotal = document.getElementById('cart-subtotal');

    const toggleCart = (show) => {
        if(show) {
            cartOverlay.classList.add('active');
            cartDrawer.classList.add('active');
            renderCart();
        } else {
            cartOverlay.classList.remove('active');
            cartDrawer.classList.remove('active');
        }
    };

    openCartBtn.addEventListener('click', () => toggleCart(true));
    closeCartBtn.addEventListener('click', () => toggleCart(false));
    cartOverlay.addEventListener('click', () => toggleCart(false));

    const addToCart = (id) => {
        const item = cart.find(i => i.id === id);
        if (item) item.qty++;
        else cart.push({ id, qty: 1 });
        updateCartCount();
        showToast('Added to Cart!');
    };

    const removeFromCart = (id) => {
        cart = cart.filter(i => i.id !== id);
        updateCartCount();
        renderCart();
    };

    const updateCartCount = () => {
        const count = cart.reduce((sum, item) => sum + item.qty, 0);
        cartCount.textContent = count;
    };

    const renderCart = () => {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your stack is currently empty.</div>';
            cartSubtotal.textContent = '$0.00';
            return;
        }

        let total = 0;
        cartItemsContainer.innerHTML = cart.map(item => {
            const prod = products[item.id];
            // Safe fallback if product doesn't exist in our mock db
            if(!prod) return '';
            total += prod.price * item.qty;
            return `
                <div class="cart-item">
                    <img src="${prod.img}" alt="${prod.title}">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${prod.title}</div>
                        <div class="cart-item-price">$${prod.price.toFixed(2)}</div>
                        <div class="qty-controls">
                            Qty: ${item.qty}
                            <button class="remove-btn" onclick="document.dispatchEvent(new CustomEvent('remove-cart', {detail: ${item.id}}))">Remove</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        cartSubtotal.textContent = `$${total.toFixed(2)}`;
    };

    document.addEventListener('remove-cart', (e) => removeFromCart(e.detail));

    // --- Quick View Modal ---
    const qvOverlay = document.getElementById('quickview-overlay');
    const qvModal = document.getElementById('quickview-modal');
    const closeQvBtn = document.getElementById('close-quickview-btn');
    const qvAddToCartBtn = document.getElementById('qv-add-to-cart');
    let currentQvId = null;

    const openQuickView = (id) => {
        const prod = products[id];
        if(!prod) return;
        currentQvId = id;
        
        document.getElementById('qv-image').src = prod.img;
        document.getElementById('qv-title').textContent = prod.title;
        document.getElementById('qv-price').textContent = `$${prod.price.toFixed(2)}`;
        document.getElementById('qv-category').textContent = prod.cat;

        qvOverlay.classList.add('active');
        qvModal.classList.add('active');
    };

    const closeQuickView = () => {
        qvOverlay.classList.remove('active');
        qvModal.classList.remove('active');
    };

    closeQvBtn.addEventListener('click', closeQuickView);
    qvOverlay.addEventListener('click', closeQuickView);
    
    qvAddToCartBtn.addEventListener('click', () => {
        if(currentQvId) addToCart(currentQvId);
        closeQuickView();
    });

    // Attach to product cards
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const id = card.getAttribute('data-id');
            openQuickView(parseInt(id));
        });
    });

    // --- Wellness Quiz Modal ---
    const quizOverlay = document.getElementById('quiz-overlay');
    const quizModal = document.getElementById('quiz-modal');
    const openQuizBtn = document.getElementById('open-quiz-btn');
    const closeQuizBtn = document.getElementById('close-quiz-btn');
    
    const step1 = document.getElementById('quiz-step-1');
    const step2 = document.getElementById('quiz-step-2');
    const resultStep = document.getElementById('quiz-result');
    const progressBar = document.getElementById('quiz-progress-bar');
    const addStackBtn = document.getElementById('quiz-add-stack');

    const resetQuiz = () => {
        step1.classList.add('active');
        step2.classList.add('hidden');
        step2.classList.remove('active');
        resultStep.classList.add('hidden');
        resultStep.classList.remove('active');
        progressBar.style.width = '33%';
    };

    const toggleQuiz = (show) => {
        if(show) {
            resetQuiz();
            quizOverlay.classList.add('active');
            quizModal.classList.add('active');
        } else {
            quizOverlay.classList.remove('active');
            quizModal.classList.remove('active');
        }
    };

    openQuizBtn.addEventListener('click', () => toggleQuiz(true));
    closeQuizBtn.addEventListener('click', () => toggleQuiz(false));
    quizOverlay.addEventListener('click', () => toggleQuiz(false));

    // Quiz flow
    const s1Opts = step1.querySelectorAll('.quiz-opt');
    s1Opts.forEach(btn => {
        btn.addEventListener('click', () => {
            step1.classList.remove('active');
            step1.classList.add('hidden');
            step2.classList.remove('hidden');
            step2.classList.add('active');
            progressBar.style.width = '66%';
        });
    });

    const s2Opts = step2.querySelectorAll('.quiz-opt');
    s2Opts.forEach(btn => {
        btn.addEventListener('click', () => {
            step2.classList.remove('active');
            step2.classList.add('hidden');
            resultStep.classList.remove('hidden');
            resultStep.classList.add('active');
            progressBar.style.width = '100%';
        });
    });

    addStackBtn.addEventListener('click', () => {
        showToast("Stack Added to Cart!");
        toggleQuiz(false);
    });
});