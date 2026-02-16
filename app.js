// BharatShop PhD - Frontend Logic

let uploadedImage = null;
let currentLanguage = 'en'; // 'en' or 'hi'

// Language content
const content = {
    en: {
        heroTitle1: 'Smart Shopping,',
        heroTitle2: 'Smarter Savings',
        heroSubtitle: 'Upload any product image and get instant AI-powered recommendations, price comparisons, and expert shopping advice in 29 Indian languages.',
        uploadTitle: 'Upload Product Image',
        uploadSubtitle: 'Drop an image or click to browse',
        uploadBtn: 'Choose Image',
        analyzeBtn: 'Analyze Product',
        resultsTitle: 'Analysis Results',
        newAnalysis: 'Analyze Another Product',
        langToggle: '🌐 हिन्दी'
    },
    hi: {
        heroTitle1: 'स्मार्ट शॉपिंग,',
        heroTitle2: 'ज़्यादा बचत',
        heroSubtitle: 'किसी भी उत्पाद की तस्वीर अपलोड करें और 29 भारतीय भाषाओं में तुरंत AI-संचालित सिफारिशें, मूल्य तुलना और विशेषज्ञ शॉपिंग सलाह प्राप्त करें।',
        uploadTitle: 'उत्पाद की तस्वीर अपलोड करें',
        uploadSubtitle: 'एक तस्वीर छोड़ें या ब्राउज़ करने के लिए क्लिक करें',
        uploadBtn: 'तस्वीर चुनें',
        analyzeBtn: 'उत्पाद का विश्लेषण करें',
        resultsTitle: 'विश्लेषण परिणाम',
        newAnalysis: 'एक और उत्पाद का विश्लेषण करें',
        langToggle: '🌐 English'
    }
};

// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const uploadBtn = document.getElementById('uploadBtn');
const imageInput = document.getElementById('imageInput');
const previewArea = document.getElementById('previewArea');
const previewImage = document.getElementById('previewImage');
const removeBtn = document.getElementById('removeBtn');
const analyzeSection = document.getElementById('analyzeSection');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultsSection = document.getElementById('resultsSection');
const newAnalysisBtn = document.getElementById('newAnalysisBtn');
const langToggle = document.getElementById('langToggle');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});

function setupEventListeners() {
    // Upload button
    uploadBtn.addEventListener('click', () => imageInput.click());
    
    // File input change
    imageInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    
    // Remove image
    removeBtn.addEventListener('click', resetUpload);
    
    // Analyze button
    analyzeBtn.addEventListener('click', analyzeProduct);
    
    // New analysis
    newAnalysisBtn.addEventListener('click', resetAll);
    
    // Language toggle
    langToggle.addEventListener('click', toggleLanguage);
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        loadImage(file);
    }
}

function handleDragOver(event) {
    event.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        loadImage(file);
    }
}

function loadImage(file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        uploadedImage = e.target.result;
        previewImage.src = e.target.result;
        
        // Show preview, hide upload area
        uploadArea.style.display = 'none';
        previewArea.style.display = 'block';
        analyzeSection.style.display = 'block';
        
        // Scroll to preview
        setTimeout(() => {
            previewArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };
    
    reader.readAsDataURL(file);
}

function resetUpload() {
    uploadedImage = null;
    imageInput.value = '';
    previewImage.src = '';
    
    uploadArea.style.display = 'block';
    previewArea.style.display = 'none';
    analyzeSection.style.display = 'none';
}

function resetAll() {
    resetUpload();
    resultsSection.style.display = 'none';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function analyzeProduct() {
    if (!uploadedImage) {
        alert('Please upload an image first!');
        return;
    }
    
    // Show loading state
    analyzeBtn.classList.add('loading');
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<span>Analyzing...</span><span class="btn-icon">⏳</span>';
    
    // Show results section with loading spinners
    resultsSection.style.display = 'block';
    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    
    try {
        // Call the API
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: uploadedImage,
                language: currentLanguage
            })
        });
        
        if (!response.ok) {
            throw new Error('Analysis failed');
        }
        
        const data = await response.json();
        
        // Display results
        displayResults(data);
        
    } catch (error) {
        console.error('Error:', error);
        alert('Sorry, analysis failed. Please make sure your API server is running and try again.');
        resultsSection.style.display = 'none';
    } finally {
        // Reset button
        analyzeBtn.classList.remove('loading');
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<span>' + content[currentLanguage].analyzeBtn + '</span><span class="btn-icon">🔍</span>';
    }
}

function displayResults(data) {
    // Product Details
    document.getElementById('productDetails').innerHTML = `
        <h4>Product Identified</h4>
        <p>${data.productDetails.name || 'Product identified from image'}</p>
        <h4>Category</h4>
        <p>${data.productDetails.category || 'General merchandise'}</p>
        <h4>Description</h4>
        <p>${data.productDetails.description || 'Analysis based on uploaded image'}</p>
    `;
    
    // Recommendations
    const recList = data.recommendations.map(rec => `<li>${rec}</li>`).join('');
    document.getElementById('recommendations').innerHTML = `
        <ul>${recList}</ul>
    `;
    
    // Price Analysis
    document.getElementById('priceAnalysis').innerHTML = `
        <h4>Estimated Price Range</h4>
        <p>${data.priceAnalysis.range || 'Varies by brand and seller'}</p>
        <h4>Money Saving Tips</h4>
        <p>${data.priceAnalysis.savingTips || 'Compare prices across platforms before buying'}</p>
        <h4>Best Time to Buy</h4>
        <p>${data.priceAnalysis.bestTime || 'During festive sales and seasonal offers'}</p>
    `;
    
    // Shopping Tips
    const tipsList = data.shoppingTips.map(tip => `<li>${tip}</li>`).join('');
    document.getElementById('shoppingTips').innerHTML = `
        <ul>${tipsList}</ul>
    `;
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    updateLanguage();
}

function updateLanguage() {
    // Update UI text based on current language
    document.querySelector('.hero-title .line:nth-child(1)').textContent = content[currentLanguage].heroTitle1;
    document.querySelector('.hero-title .line:nth-child(2)').textContent = content[currentLanguage].heroTitle2;
    document.querySelector('.hero-subtitle').textContent = content[currentLanguage].heroSubtitle;
    document.querySelector('.upload-content h3').textContent = content[currentLanguage].uploadTitle;
    document.querySelector('.upload-content p').textContent = content[currentLanguage].uploadSubtitle;
    document.querySelector('.upload-btn').textContent = content[currentLanguage].uploadBtn;
    document.querySelector('.results-header h2').textContent = content[currentLanguage].resultsTitle;
    document.getElementById('newAnalysisBtn').textContent = content[currentLanguage].newAnalysis;
    document.getElementById('langToggle').textContent = content[currentLanguage].langToggle;
    
    if (!analyzeBtn.disabled) {
        analyzeBtn.querySelector('span:first-child').textContent = content[currentLanguage].analyzeBtn;
    }
}

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
