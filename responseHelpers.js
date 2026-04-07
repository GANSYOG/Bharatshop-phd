function createFallbackResponse(text, language) {
    // Create a structured response if JSON parsing fails
    return {
        productDetails: {
            name: 'Product from Image',
            category: 'General',
            description: text.substring(0, 200) + '...'
        },
        recommendations: [
            'Check customer reviews before purchasing',
            'Compare prices across multiple platforms',
            'Look for festive season discounts',
            'Consider warranty and return policies'
        ],
        priceAnalysis: {
            range: 'Price varies by brand and seller',
            savingTips: 'Use price comparison apps and cashback offers',
            bestTime: 'During major sales like Diwali, Republic Day, or Amazon/Flipkart sales'
        },
        shoppingTips: [
            'Buy from authorized sellers',
            'Check product specifications carefully',
            'Read recent customer reviews',
            'Compare shipping and return policies'
        ]
    };
}


function extractJson(text) {
    if (!text || typeof text !== 'string') return null;
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        return text.substring(firstBrace, lastBrace + 1);
    }
    return null;
}

module.exports = {
    extractJson,
    createFallbackResponse
};
