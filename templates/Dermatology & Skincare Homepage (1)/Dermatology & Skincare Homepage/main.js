document.addEventListener('DOMContentLoaded', () => {
    // 1. Build and Inject Booking Modal
    const modalHTML = `
    <div id="bookingModal" class="modal-overlay">
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2 style="font-family: var(--font-heading); color: var(--color-dark-blue); margin-bottom: 0.5rem; font-size: 2rem;">Book a Consultation</h2>
            <p style="color: var(--color-text-muted); margin-bottom: 2rem;">Schedule your personalized skincare experience with our experts.</p>
            <form id="bookingForm">
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="Enter your name" required>
                </div>
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="Enter your email" required>
                </div>
                <div class="form-group">
                    <label>Service Type</label>
                    <select required>
                        <option value="" disabled selected>Select a treatment</option>
                        <option>Signature Glow Facial</option>
                        <option>Advanced PDRN Repair</option>
                        <option>Acne Clarifying Treatment</option>
                        <option>Anti-Aging Consultation</option>
                    </select>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Preferred Date</label>
                        <input type="date" required>
                    </div>
                    <div class="form-group">
                        <label>Time</label>
                        <input type="time" required>
                    </div>
                </div>
                <button type="submit" class="btn-solid-blue" style="width: 100%; margin-top: 1rem; padding: 1rem;">Confirm Booking</button>
                <div id="bookingSuccess" style="display: none; text-align: center; margin-top: 2rem;">
                    <h3 style="color: var(--color-dark-blue); font-size: 1.5rem; margin-bottom: 1rem;">Booking Request Sent!</h3>
                    <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">How would you prefer our team to follow up with you?</p>
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <a href="https://wa.me/1234567890" target="_blank" style="display: flex; align-items: center; justify-content: center; width: 45px; height: 45px; border-radius: 50%; background-color: #25D366; color: white; text-decoration: none; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                        </a>
                        <a href="mailto:hello@aurabeauty.com" style="display: flex; align-items: center; justify-content: center; width: 45px; height: 45px; border-radius: 50%; background-color: var(--color-blue); color: white; text-decoration: none; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </a>
                    </div>
                </div>
            </form>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const bookingModal = document.getElementById('bookingModal');
    const closeBtn = document.querySelector('.modal-close');
    const bookButtons = document.querySelectorAll('a.btn-outline-blue'); // Targets "Book Facial" buttons in nav

    // Handle Opening Modal
    bookButtons.forEach(btn => {
        if(btn.textContent.includes('Book')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                bookingModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });

    const bookingForm = document.getElementById('bookingForm');
    const bookingSuccess = document.getElementById('bookingSuccess');
    const formInputs = bookingForm.querySelectorAll('.form-group, .form-row, button[type="submit"]');

    const resetBookingModal = () => {
        bookingModal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            bookingForm.reset();
            formInputs.forEach(el => el.style.display = '');
            bookingSuccess.style.display = 'none';
        }, 300); // Reset after modal fades out
    };

    // Handle Closing Modal
    closeBtn.addEventListener('click', resetBookingModal);
    bookingModal.addEventListener('click', (e) => {
        if(e.target === bookingModal) resetBookingModal();
    });

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Hide form fields
        formInputs.forEach(el => el.style.display = 'none');
        // Show success options
        bookingSuccess.style.display = 'block';
    });

    // 2. Handle Sign In Logic
    const authHTML = `
    <style>
        .profile-dropdown {
            position: absolute;
            top: 70px;
            right: 48px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            width: 200px;
            display: none;
            flex-direction: column;
            border: 1px solid var(--border-color);
            z-index: 200;
        }
        .profile-dropdown.active {
            display: flex;
        }
        .profile-dropdown a {
            padding: 12px 20px;
            color: var(--color-text-main);
            font-size: 14px;
            text-decoration: none;
            border-bottom: 1px solid #f0f0f0;
            transition: background 0.2s;
        }
        .profile-dropdown a:hover {
            background: #fdfbf7;
            color: var(--color-blue);
        }
        .profile-dropdown a:last-child {
            border-bottom: none;
            color: #d9534f;
        }
        .profile-dropdown a:last-child:hover {
            background: #fff5f5;
        }
        .profile-icon {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--color-light-blue);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--color-dark-blue);
            transition: all 0.2s;
        }
        .profile-icon:hover {
            background: var(--color-blue);
            color: white;
        }
    </style>
    <div id="authModal" class="modal-overlay">
        <div class="modal-content">
            <button class="auth-close modal-close">&times;</button>
            <h2 style="font-family: var(--font-heading); color: var(--color-dark-blue); margin-bottom: 0.5rem; font-size: 2rem;">Welcome Back</h2>
            <p style="color: var(--color-text-muted); margin-bottom: 2rem;">Sign in to access your curated skincare journey.</p>
            <form id="authForm">
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="Enter your email" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" required>
                </div>
                <button type="submit" class="btn-solid-blue" style="width: 100%; margin-top: 1rem; padding: 1rem;">Sign In</button>
            </form>
        </div>
    </div>
    <div id="profileDropdown" class="profile-dropdown">
        <a href="profile.html">My Profile</a>
        <a href="bookings.html">My Bookings</a>
        <a href="#" id="logoutBtn">Logout</a>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', authHTML);

    const authModal = document.getElementById('authModal');
    const authForm = document.getElementById('authForm');
    const authCloseBtn = document.querySelector('.auth-close');
    const profileDropdown = document.getElementById('profileDropdown');
    const logoutBtn = document.getElementById('logoutBtn');

    authCloseBtn.addEventListener('click', () => {
        authModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    authModal.addEventListener('click', (e) => {
        if(e.target === authModal) {
            authModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem('auraSignedIn', 'true');
        authModal.classList.remove('active');
        document.body.style.overflow = '';
        renderAuthUI();
    });

    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('auraSignedIn');
        location.reload();
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.profile-icon') && !e.target.closest('.profile-dropdown')) {
            profileDropdown.classList.remove('active');
        }
    });

    const renderAuthUI = () => {
        const isSignedIn = localStorage.getItem('auraSignedIn') === 'true';
        const navRight = document.querySelector('.nav-right');
        if (!navRight) return;

        let signInBtn = navRight.querySelector('.btn-solid-blue');
        
        if (isSignedIn) {
            if (signInBtn) {
                const profileIcon = document.createElement('div');
                profileIcon.className = 'profile-icon';
                profileIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
                profileIcon.title = "Profile Menu";
                
                profileIcon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    profileDropdown.classList.toggle('active');
                });

                signInBtn.replaceWith(profileIcon);
            }
        } else {
            if (signInBtn) {
                signInBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    authModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            }
        }
    };

    renderAuthUI();
});
