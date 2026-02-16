# 🛍️ BharatShop PhD

**Your AI Shopping Expert for India**

BharatShop PhD is an AI-powered shopping assistant that analyzes product images and provides expert recommendations, price comparisons, and shopping tips in 29 Indian languages.

![BharatShop PhD](https://img.shields.io/badge/AI-Claude%20Sonnet%204.5-orange)
![Status](https://img.shields.io/badge/status-production%20ready-green)
![Languages](https://img.shields.io/badge/languages-29%20Indian-blue)

## ✨ Features

- 📸 **Image Analysis**: Upload any product image for instant AI analysis
- 🧠 **Claude AI Powered**: Uses Claude Sonnet 4.5 for intelligent recommendations
- 🌏 **Multilingual**: Supports 29 Indian languages (Hindi, Tamil, Telugu, Bengali, etc.)
- 💰 **Price Intelligence**: Get price ranges, saving tips, and best buying times
- 🎯 **Smart Recommendations**: Alternative products and quality factors
- ⚡ **Lightning Fast**: Results in seconds
- 📱 **Responsive Design**: Works perfectly on mobile and desktop

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Claude API key from [Anthropic Console](https://console.anthropic.com)
- Git (for deployment)

### Local Development

1. **Clone or download this repository**
   ```bash
   git clone <your-repo-url>
   cd bharatshop-phd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Claude API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
   PORT=3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Or for production:
   ```bash
   npm start
   ```

5. **Open your browser**
   Visit: `http://localhost:3000`

## 📦 Project Structure

```
bharatshop-phd/
├── index.html          # Main HTML file
├── styles.css          # Beautiful Indian-themed styling
├── app.js              # Frontend JavaScript
├── server.js           # Express API server
├── package.json        # Dependencies
├── .env.example        # Environment template
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🌐 Deployment to www.yhecosystem.in

### Option 1: Deploy via GitHub + Hosting Provider

#### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: BharatShop PhD"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/bharatshop-phd.git

# Push to GitHub
git push -u origin main
```

#### Step 2: Deploy to Production

**For Vercel (Recommended - Free & Easy):**

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow prompts and add your `ANTHROPIC_API_KEY` as environment variable

4. Point your domain `yhecosystem.in` to Vercel:
   - In Vercel dashboard, go to your project → Settings → Domains
   - Add `www.yhecosystem.in` and `yhecosystem.in`
   - Update DNS records at your domain registrar

**For Render.com (Alternative):**

1. Connect your GitHub repo to Render
2. Add environment variable: `ANTHROPIC_API_KEY`
3. Deploy!
4. Add custom domain in Render settings

**For DigitalOcean/AWS/VPS:**

1. SSH into your server
2. Clone the repository
3. Install Node.js and dependencies
4. Create `.env` file with your API key
5. Use PM2 to run:
   ```bash
   npm install -g pm2
   pm2 start server.js --name bharatshop
   pm2 save
   pm2 startup
   ```
6. Configure Nginx as reverse proxy
7. Set up SSL with Let's Encrypt

### Option 2: Update Existing Site

If you already have hosting for `yhecosystem.in`:

1. **Upload files via FTP/SFTP:**
   - Upload all files to your web root
   - Ensure Node.js is installed on the server
   - Run `npm install` on the server
   - Start the server with `npm start`

2. **Configure web server (Nginx example):**
   ```nginx
   server {
       listen 80;
       server_name www.yhecosystem.in yhecosystem.in;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🔑 Getting Claude API Key

1. Go to [https://console.anthropic.com](https://console.anthropic.com)
2. Sign up / Sign in
3. Navigate to "API Keys"
4. Click "Create Key"
5. Copy your key and add it to `.env` file

**Free Tier:** Anthropic provides $5 free credits to start!

## 🛠️ Configuration

### Environment Variables

- `ANTHROPIC_API_KEY`: Your Claude API key (required)
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)

### Customization

**Change Colors/Theme:**
Edit `styles.css` - all colors are defined in CSS variables at the top

**Add More Languages:**
Edit the `content` object in `app.js` to add more languages

**Modify AI Prompts:**
Edit the `analyzeWithClaude()` function in `server.js`

## 📊 API Usage

### POST /api/analyze

Analyzes a product image and returns shopping advice.

**Request:**
```json
{
  "image": "data:image/jpeg;base64,...",
  "language": "en"
}
```

**Response:**
```json
{
  "productDetails": {
    "name": "Product Name",
    "category": "Category",
    "description": "Description"
  },
  "recommendations": ["Tip 1", "Tip 2", ...],
  "priceAnalysis": {
    "range": "₹500-₹1000",
    "savingTips": "Save money by...",
    "bestTime": "During Diwali sales"
  },
  "shoppingTips": ["Tip 1", "Tip 2", ...]
}
```

## 🐛 Troubleshooting

**Server won't start:**
- Check if port 3000 is already in use
- Verify Node.js version (18+)
- Run `npm install` again

**API errors:**
- Verify your `ANTHROPIC_API_KEY` is correct
- Check your API credit balance
- Ensure `.env` file is in the root directory

**Images not uploading:**
- Check file size (max 10MB)
- Verify image format (jpg, png, webp, gif)
- Clear browser cache

## 📈 Next Steps

- [ ] Add user authentication
- [ ] Store analysis history
- [ ] Add shopping price comparison APIs
- [ ] Implement voice input
- [ ] Create mobile app
- [ ] Add more Indian languages
- [ ] Integrate with e-commerce platforms

## 🤝 Contributing

Want to improve BharatShop PhD? Contributions are welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

MIT License - feel free to use this for your projects!

## 💬 Support

Having issues? 
- Open an issue on GitHub
- Email: support@yhecosystem.in
- Visit: [www.yhecosystem.in](https://www.yhecosystem.in)

## 🙏 Credits

- **AI**: Powered by [Claude](https://www.anthropic.com) from Anthropic
- **Design**: Custom Indian-themed UI
- **Fonts**: Google Fonts (Playfair Display, DM Sans)

---

**Made with ❤️ in India for Indian shoppers**

*BharatShop PhD - Smart Shopping, Smarter Savings*
