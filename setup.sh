#!/bin/bash

# BharatShop PhD - Quick Setup Script
# This script helps you get started quickly!

echo "╔════════════════════════════════════════════╗"
echo "║   BharatShop PhD - Quick Setup Script     ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed!"
    echo "📥 Please install Node.js 18+ from: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  IMPORTANT: Edit .env and add your ANTHROPIC_API_KEY"
    echo "   Get your API key from: https://console.anthropic.com"
    echo ""
    read -p "Press Enter after you've added your API key to .env..."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "╔════════════════════════════════════════════╗"
echo "║            Setup Complete! 🎉              ║"
echo "╠════════════════════════════════════════════╣"
echo "║  To start the server:                      ║"
echo "║  $ npm start                               ║"
echo "║                                            ║"
echo "║  Then visit: http://localhost:3000        ║"
echo "╚════════════════════════════════════════════╝"
echo ""
echo "📚 Next steps:"
echo "   1. Make sure your ANTHROPIC_API_KEY is in .env"
echo "   2. Run: npm start"
echo "   3. Open http://localhost:3000 in your browser"
echo "   4. Upload a product image and try it out!"
echo ""
echo "🚀 For deployment to yhecosystem.in, see DEPLOYMENT_GUIDE.md"
echo ""
