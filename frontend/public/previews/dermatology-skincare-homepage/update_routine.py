import re

html_file = 'treatments.html'

with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

new_routine = '''    <!-- Curated Routine Section -->
    <section class="routine-section">
        <div class="routine-scroller-wrapper" style="max-width: 1200px; margin: 0 auto; position: relative;">
            <div id="routineScroller" style="display: flex; flex-direction: column; height: 650px; overflow-y: auto; scroll-behavior: smooth; padding-right: 1rem; border-radius: 12px; background: #fafafa; border: 1px solid #eae1d8;">
'''

concerns = [
    {
        "title": "Dehydration",
        "cause": "Damaged skin barrier.",
        "details": "Flaky, tight skin.",
        "solution": "Comprehensive hydration barrier-repair protocol.",
        "icon1": '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
        "title1": "Gentle Cleansing",
        "desc1": "Removes impurities while retaining essential natural oils.",
        "icon2": '<circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path>',
        "title2": "Hyaluronic Matrix",
        "desc2": "Plumps and draws moisture deep into the skin layers.",
        "btn": "Add Hydration Combo - $185",
        "imgs": ["prod1.png", "prod2.png", "prod3.png"]
    },
    {
        "title": "Anti-Aging",
        "cause": "Decreased collagen production.",
        "details": "Fine lines, loss of elasticity.",
        "solution": "Advanced collagen-boosting and firming regimen.",
        "icon1": '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
        "title1": "Retinol Renewal",
        "desc1": "Encapsulated retinol to reduce fine lines without irritation.",
        "icon2": '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>',
        "title2": "Peptide Firming",
        "desc2": "Boosts elasticity and restores a youthful, bouncy texture.",
        "btn": "Add Firming Combo - $210",
        "imgs": ["prod3.png", "prod1.png", "prod2.png"]
    },
    {
        "title": "Acne & Blemishes",
        "cause": "Excess sebum and clogged pores.",
        "details": "Active breakouts, blackheads.",
        "solution": "Targeted clarifying and sebum-balancing protocol.",
        "icon1": '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>',
        "title1": "BHA Clarifier",
        "desc1": "Unclogs pores and minimizes active breakouts.",
        "icon2": '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>',
        "title2": "Niacinamide Balance",
        "desc2": "Regulates sebum production and soothes inflammation.",
        "btn": "Add Clarifying Combo - $165",
        "imgs": ["prod2.png", "prod3.png", "prod1.png"]
    },
    {
        "title": "Hyperpigmentation",
        "cause": "Excess melanin production.",
        "details": "Dark spots, uneven tone, sun damage.",
        "solution": "Brightening protocol for dark spots and uneven tone.",
        "icon1": '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line>',
        "title1": "Vitamin C Boost",
        "desc1": "Potent antioxidants to fade dark spots and boost radiance.",
        "icon2": '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>',
        "title2": "Tranexamic Acid",
        "desc2": "Prevents melanin transfer and evens skin complexion.",
        "btn": "Add Brightening Combo - $195",
        "imgs": ["prod1.png", "prod3.png", "prod2.png"]
    },
    {
        "title": "Sensitive Skin",
        "cause": "Compromised skin lipid barrier.",
        "details": "Redness, irritation, sensitivity.",
        "solution": "Calming and barrier-strengthening regimen.",
        "icon1": '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>',
        "title1": "CICA Soothing Balm",
        "desc1": "Instantly reduces redness and comforts irritated skin.",
        "icon2": '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>',
        "title2": "Ceramide Shield",
        "desc2": "Rebuilds the compromised protective lipid barrier.",
        "btn": "Add Soothing Combo - $175",
        "imgs": ["prod2.png", "prod1.png", "prod3.png"]
    },
    {
        "title": "Uneven Texture",
        "cause": "Build-up of dead skin cells.",
        "details": "Rough patches, dullness.",
        "solution": "Smoothing and resurfacing protocol for rough patches.",
        "icon1": '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line>',
        "title1": "AHA/BHA Peel",
        "desc1": "Dissolves dead skin cells and improves overall texture.",
        "icon2": '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
        "title2": "Squalane Hydrator",
        "desc2": "Restores moisture without clogging pores after exfoliation.",
        "btn": "Add Resurfacing Combo - $190",
        "imgs": ["prod3.png", "prod2.png", "prod1.png"]
    }
]

for c in concerns:
    new_routine += f'''
                <!-- Row: {c["title"]} -->
                <div class="routine-row" style="display: flex; align-items: center; gap: 4rem; min-height: 650px; padding: 2rem;">
                    <div class="routine-left" style="flex: 1;">
                        <h3 style="font-size: 2.5rem; margin-bottom: 0.5rem; font-family: var(--font-heading); color: var(--color-dark-blue);">{c["title"]}</h3>
                        <p style="margin-bottom: 2rem; font-size: 1rem; color: #555; line-height: 1.6;">
                            <strong>Cause:</strong> {c["cause"]}<br>
                            <strong>Details:</strong> {c["details"]}<br>
                            <strong>Solution:</strong> {c["solution"]}
                        </p>
                        <div class="routine-steps">
                            <div style="display: flex; align-items: flex-start; gap: 1.5rem; padding: 1.5rem; border: 1px solid #eae1d8; border-radius: 8px; margin-bottom: 1rem; background: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="flex-shrink: 0; margin-top: 2px;">{c["icon1"]}</svg>
                                <div>
                                    <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 0.5rem 0;">{c["title1"]}</h4>
                                    <p style="margin: 0; font-size: 0.95rem; color: #555;">{c["desc1"]}</p>
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start; gap: 1.5rem; padding: 1.5rem; border: 1px solid #eae1d8; border-radius: 8px; margin-bottom: 1rem; background: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="flex-shrink: 0; margin-top: 2px;">{c["icon2"]}</svg>
                                <div>
                                    <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 0.5rem 0;">{c["title2"]}</h4>
                                    <p style="margin: 0; font-size: 0.95rem; color: #555;">{c["desc2"]}</p>
                                </div>
                            </div>
                        </div>
                        <a href="#" class="btn-solid-blue large mt-4" style="margin-top: 1rem; display: inline-block;">{c["btn"]}</a>
                    </div>
                    
                    <div class="routine-right" style="flex: 1; position: relative; height: 500px; display: flex; align-items: center; justify-content: center;">
                        <div style="position: absolute; top: 0; left: 15%; width: 70%; height: 50%; opacity: 0.5; border-radius: 8px; overflow: hidden; transform: translateY(10%); box-shadow: 0 10px 30px rgba(0,0,0,0.1); z-index: 1;">
                            <img src="{c["imgs"][1]}" alt="Ingredient 1" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div style="position: absolute; bottom: 0; left: 15%; width: 70%; height: 50%; opacity: 0.5; border-radius: 8px; overflow: hidden; transform: translateY(-10%); box-shadow: 0 10px 30px rgba(0,0,0,0.1); z-index: 1;">
                            <img src="{c["imgs"][2]}" alt="Ingredient 2" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div style="position: relative; width: 80%; height: 70%; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.3); z-index: 2; border: 4px solid #fff;">
                            <img src="{c["imgs"][0]}" alt="Main Product" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                    </div>
                </div>
'''

new_routine += '''            </div>
        </div>
    </section>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const scroller = document.getElementById('routineScroller');
            if(!scroller) return;
            let isPaused = false;
            let scrollSpeed = 1;

            function autoScroll() {
                if(!isPaused) {
                    scroller.scrollTop += scrollSpeed;
                    
                    // Reset if reached bottom
                    if(scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1) {
                        scroller.scrollTop = 0;
                    }
                }
                requestAnimationFrame(autoScroll);
            }

            scroller.addEventListener('mouseenter', () => isPaused = true);
            scroller.addEventListener('mouseleave', () => isPaused = false);
            
            // Allow manual scroll interaction
            scroller.addEventListener('wheel', () => isPaused = true);
            scroller.addEventListener('touchstart', () => isPaused = true);
            
            let resumeTimeout;
            function resumeAutoScroll() {
                clearTimeout(resumeTimeout);
                resumeTimeout = setTimeout(() => {
                    if(!scroller.matches(':hover')) {
                        isPaused = false;
                    }
                }, 1000);
            }
            scroller.addEventListener('wheel', resumeAutoScroll);
            scroller.addEventListener('touchend', resumeAutoScroll);

            requestAnimationFrame(autoScroll);
        });
    </script>
'''

pattern = r'<!-- Curated Routine Section -->\s*<section class="routine-section">.*?</section>'
updated_content = re.sub(pattern, new_routine, content, flags=re.DOTALL)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("Updated HTML.")
