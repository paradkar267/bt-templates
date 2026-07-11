const spotlightData = [
    {
        title: "Niacinamide +<br/>Rosehip",
        desc: "Our signature blend combines the brightening power of Vitamin B3 with the deep nourishment of cold-pressed organic rosehip oil.",
        f1Title: "CLINICALLY PROVEN",
        f1Desc: "Reduces pore visibility by 34% in 4 weeks.",
        f2Title: "ETHICALLY SOURCED",
        f2Desc: "Direct-from-farm cold-pressed oils.",
        imgSrc: "drop1.png", // Golden abstract liquid
    },
    {
        title: "Salicylic Acid +<br/>Willow Bark",
        desc: "A potent, clarifying formulation designed to decongest pores, balance sebum production, and reveal smoother, clearer skin.",
        f1Title: "GENTLE EXFOLIATION",
        f1Desc: "Dissolves dead skin cells without irritation.",
        f2Title: "BOTANICAL EXTRACTS",
        f2Desc: "Infused with soothing natural willow bark.",
        imgSrc: "drop2.png", // Clear crystal liquid
    },
    {
        title: "Hyaluronic Acid +<br/>Sea Kelp",
        desc: "An intense hydration matrix that draws moisture deep into the epidermis, fortified with mineral-rich bio-fermented sea kelp.",
        f1Title: "24-HOUR HYDRATION",
        f1Desc: "Increases skin moisture retention by 55%.",
        f2Title: "MARINE BIO-FERMENT",
        f2Desc: "Sustainably harvested coastal kelp.",
        imgSrc: "drop3.png", // Blue water drop
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Spotlight Elements
    const title = document.getElementById('spotlightTitle');
    const desc = document.getElementById('spotlightDesc');
    const f1Title = document.getElementById('feature1Title');
    const f1Desc = document.getElementById('feature1Desc');
    const f2Title = document.getElementById('feature2Title');
    const f2Desc = document.getElementById('feature2Desc');
    const contentArea = document.getElementById('spotlightContentArea');
    const stackCards = document.querySelectorAll('.stack-card');

    if (!title || stackCards.length === 0) return; // Guard clause

    let currentIndex = 0;
    let autoRotateInterval;

    const setSpotlightIndex = (index) => {
        currentIndex = index;
        
        // Fade out left content
        contentArea.classList.add('fade-out');

        // Update cards stack positioning by reassigning the order classes
        // 0 is front, 1 is right (next), 2 is left (previous)
        stackCards.forEach((card, idx) => {
            const order = (idx - currentIndex + stackCards.length) % stackCards.length;
            card.className = `stack-card order-${order}`;
        });

        setTimeout(() => {
            // Update left content data
            const data = spotlightData[currentIndex];
            title.innerHTML = data.title;
            desc.innerHTML = data.desc;
            f1Title.innerHTML = data.f1Title;
            f1Desc.innerHTML = data.f1Desc;
            f2Title.innerHTML = data.f2Title;
            f2Desc.innerHTML = data.f2Desc;

            // Fade in left content
            contentArea.classList.remove('fade-out');
        }, 500); // Match this with CSS transition time
    };

    const nextSpotlight = () => {
        setSpotlightIndex((currentIndex + 1) % spotlightData.length);
    };

    const startAutoRotate = () => {
        clearInterval(autoRotateInterval);
        autoRotateInterval = setInterval(nextSpotlight, 5000);
    };

    // Initialize Auto Rotate
    startAutoRotate();

    // Add Click Listeners to Cards
    stackCards.forEach((card, originalIdx) => {
        card.addEventListener('click', () => {
            if (currentIndex === originalIdx) return; // Ignore if already active
            setSpotlightIndex(originalIdx);
            startAutoRotate(); // Reset timer so it doesn't auto-rotate immediately after clicking
        });
    });
});