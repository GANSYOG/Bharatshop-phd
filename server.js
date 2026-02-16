// BharatShop PhD - API Server
// This server handles image analysis using Claude AI

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { createFallbackResponse } = require('./responseHelpers');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Support large image uploads
app.use(express.static('public')); // Serve static files

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Main analysis endpoint
app.post('/api/analyze', async (req, res) => {
    try {
        const { image, language } = req.body;
        
        if (!image) {
            return res.status(400).json({ error: 'No image provided' });
        }
        
        // Extract base64 data
        const base64Data = image.split(',')[1];
        const imageType = image.split(';')[0].split(':')[1];
        
        // Call Claude API
        const analysisResult = await analyzeWithClaude(base64Data, imageType, language);
        
        res.json(analysisResult);
        
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ 
            error: 'Analysis failed',
            message: error.message 
        });
    }
});

async function analyzeWithClaude(base64Image, imageType, language = 'en') {
    const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
    
    if (!ANTHROPIC_API_KEY) {
        throw new Error('ANTHROPIC_API_KEY not configured. Please add it to your .env file');
    }
    
    const languageInstruction = language === 'hi' 
        ? 'Please respond in Hindi (हिन्दी).' 
        : 'Please respond in English.';
    
    const prompt = `You are BharatShop PhD, an expert AI shopping assistant for the Indian market.

${languageInstruction}

Analyze this product image and provide comprehensive shopping advice. Structure your response as a JSON object with these fields:

{
    "productDetails": {
        "name": "Product name",
        "category": "Product category",
        "description": "Brief description"
    },
    "recommendations": [
        "List 4-5 smart buying recommendations",
        "Include alternative products or better options",
        "Mention quality factors to look for",
        "Suggest complementary products"
    ],
    "priceAnalysis": {
        "range": "Expected price range in INR",
        "savingTips": "How to save money on this purchase",
        "bestTime": "Best time to buy this product"
    },
    "shoppingTips": [
        "List 4-5 practical shopping tips",
        "Include where to buy (online/offline)",
        "Quality checks to perform",
        "Common pitfalls to avoid"
    ]
}

Focus on the Indian market, Indian prices, and locally available options. Be specific and practical.`;

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 2048,
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'image',
                                source: {
                                    type: 'base64',
                                    media_type: imageType,
                                    data: base64Image
                                }
                            },
                            {
                                type: 'text',
                                text: prompt
                            }
                        ]
                    }
                ]
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Claude API error: ${errorData.error?.message || 'Unknown error'}`);
        }
        
        const data = await response.json();
        const responseText = data.content[0].text;
        
        // Extract JSON from response (Claude might include markdown formatting)
        let jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const result = JSON.parse(jsonMatch[0]);
            return result;
        }
        
        // Fallback: create structured response from text
        return createFallbackResponse(responseText, language);
        
    } catch (error) {
        console.error('Claude API call failed:', error);
        throw error;
    }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok',
        service: 'BharatShop PhD API',
        timestamp: new Date().toISOString()
    });
});

// Start server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`
╔════════════════════════════════════════════╗
║     BharatShop PhD Server Running! 🚀     ║
╠════════════════════════════════════════════╣
║  Server: http://localhost:${PORT}           ║
║  API: http://localhost:${PORT}/api          ║
╚════════════════════════════════════════════╝

Make sure to:
1. Add your ANTHROPIC_API_KEY to .env file
2. The frontend files are in the same directory
3. Visit http://localhost:${PORT} to use the app

Press Ctrl+C to stop the server
        `);
    });
}

module.exports = app;
