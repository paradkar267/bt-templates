const fs = require('fs');
const path = require('path');

// 1. Update data.js
let dataContent = fs.readFileSync('src/data.js', 'utf8');
dataContent = dataContent.replace(/price:\s*"(\d+)"/g, (match, p1) => {
    return 'price: "' + (parseInt(p1, 10) * 80) + '"';
});
fs.writeFileSync('src/data.js', dataContent);

// 2. Replace '$' with '₹' in specific files
const filesToUpdate = [
    'src/ProductPage.jsx',
    'src/CartPage.jsx',
    'src/Home.jsx',
    'src/DashboardPage.jsx',
    'src/components/ui/SocialProofToast.jsx',
    'src/components/ui/card-7.jsx',
    'src/components/ui/card-fan-carousel.jsx'
];

filesToUpdate.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        // We only want to replace $ when it represents currency.
        // Let's replace \$ when it is directly followed by a number or price variables
        content = content.replace(/\$\{template\.price\}/g, '₹${template.price}'); 
        content = content.replace(/\$\{item\.price\}/g, '₹${item.price}');
        content = content.replace(/\$\{cartTotal\.toFixed/g, '₹${cartTotal.toFixed');
        content = content.replace(/\$\{price\}/g, '₹${price}');
        
        // Literal replacements where $ is clearly a currency sign
        content = content.replace(/>\$\</g, '>₹<');
        content = content.replace(/\$(\d+)/g, '₹$1');
        
        // Specifically in DashboardPage.jsx for static stats
        content = content.replace(/"\$45,231\.89"/g, '"₹36,18,551"');
        
        // Remove rogue $ that might be left in text nodes if they precede {
        // e.g. <span>${cartTotal}</span> which might have been <span>${...} but actually in JSX it's usually <span>${cartTotal}
        // Actually JSX uses `$` directly like: <span>${item.price}</span> -> we want <span>₹{item.price}</span>
        content = content.replace(/>\$\{/g, '>₹{'); 
        // Wait, JSX text nodes don't use string interpolation, they use <span>${item.price}</span> 
        // wait, <span>${item.price}</span> means literally printing "$" then evaluating {item.price}.
        // We can replace ">$" with ">₹" if it's followed by a `{` or a number.
        content = content.replace(/>\$(?=\{|\d)/g, '>₹');
        // For CartPage order summary:
        content = content.replace(/<span>\$/g, '<span>₹');
        
        fs.writeFileSync(file, content);
    }
});

console.log('Prices and currency symbols updated successfully.');
