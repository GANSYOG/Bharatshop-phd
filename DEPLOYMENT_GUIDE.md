# 🚀 Deployment Guide for www.yhecosystem.in

This guide will walk you through deploying BharatShop PhD to your domain **www.yhecosystem.in**.

## 📋 Prerequisites Checklist

- [x] GitHub account
- [x] Claude API key from [console.anthropic.com](https://console.anthropic.com)
- [x] Domain: yhecosystem.in (you already have this!)
- [ ] Choose hosting platform (see options below)

---

## 🎯 FASTEST METHOD: Deploy to Vercel (5 minutes!)

### Step 1: Push to GitHub

```bash
# Navigate to project folder
cd bharatshop-phd

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "BharatShop PhD - Initial deployment"

# Create new repository on GitHub.com and copy the URL

# Add remote (replace with your GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/bharatshop-phd.git

# Push
git push -u origin main
```

### Step 2: Deploy to Vercel

**Option A: Web Interface (Easiest)**

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your `bharatshop-phd` repository
5. Add environment variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: `your-claude-api-key`
6. Click "Deploy"
7. Wait 2 minutes... Done! ✅

**Option B: CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts, add ANTHROPIC_API_KEY when asked

# Deploy to production
vercel --prod
```

### Step 3: Connect Your Domain

1. In Vercel Dashboard → Your Project → Settings → Domains
2. Add domain: `www.yhecosystem.in`
3. Add domain: `yhecosystem.in`
4. Vercel will show DNS records to add

5. Go to your domain registrar (GoDaddy/Namecheap/etc.)
6. Add these DNS records:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

7. Wait 5-30 minutes for DNS propagation
8. Visit www.yhecosystem.in - Live! 🎉

---

## 🔧 Alternative: Deploy to Render.com

### Step 1: Push to GitHub (same as above)

### Step 2: Deploy to Render

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure:
   - Name: `bharatshop-phd`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add environment variable:
   - Key: `ANTHROPIC_API_KEY`
   - Value: `your-api-key`
7. Click "Create Web Service"

### Step 3: Add Custom Domain

1. In your service → Settings → Custom Domain
2. Add `www.yhecosystem.in`
3. Update DNS at your registrar:
   ```
   Type: CNAME
   Name: www
   Value: [provided by Render]
   ```

---

## 🖥️ Deploy to Your Own VPS (DigitalOcean, AWS, etc.)

### Step 1: Server Setup

```bash
# SSH into your server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PM2 (process manager)
npm install -g pm2

# Install Nginx
apt install -y nginx

# Install Certbot (for SSL)
apt install -y certbot python3-certbot-nginx
```

### Step 2: Deploy Application

```bash
# Clone your repository
cd /var/www
git clone https://github.com/YOUR_USERNAME/bharatshop-phd.git
cd bharatshop-phd

# Install dependencies
npm install

# Create .env file
nano .env
```

Add this to `.env`:
```
ANTHROPIC_API_KEY=your-actual-api-key
PORT=3000
NODE_ENV=production
```

Save and exit (Ctrl+X, Y, Enter)

```bash
# Start with PM2
pm2 start server.js --name bharatshop
pm2 save
pm2 startup

# Make sure it's running
pm2 status
```

### Step 3: Configure Nginx

```bash
# Create Nginx config
nano /etc/nginx/sites-available/yhecosystem.in
```

Add this configuration:
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
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
ln -s /etc/nginx/sites-available/yhecosystem.in /etc/nginx/sites-enabled/

# Test Nginx config
nginx -t

# Restart Nginx
systemctl restart nginx
```

### Step 4: Set Up SSL (HTTPS)

```bash
# Get SSL certificate
certbot --nginx -d yhecosystem.in -d www.yhecosystem.in

# Follow prompts, select redirect HTTP to HTTPS

# Auto-renew setup (already configured by certbot)
```

### Step 5: Update DNS

At your domain registrar, add these records:
```
Type: A
Name: @
Value: YOUR_SERVER_IP

Type: A  
Name: www
Value: YOUR_SERVER_IP
```

**Done!** Visit www.yhecosystem.in 🎉

---

## 🔄 Updating Your Deployment

### For Vercel/Render (GitHub auto-deploy):

```bash
# Make changes to your code
git add .
git commit -m "Update: description of changes"
git push

# Vercel/Render automatically redeploys!
```

### For VPS:

```bash
# SSH into server
ssh root@your-server-ip

# Navigate to project
cd /var/www/bharatshop-phd

# Pull latest changes
git pull

# Restart application
pm2 restart bharatshop
```

---

## ✅ Post-Deployment Checklist

- [ ] Site loads at www.yhecosystem.in
- [ ] HTTPS (SSL) is working
- [ ] Image upload works
- [ ] Analysis returns results
- [ ] Mobile responsive
- [ ] Both languages work (English/Hindi)
- [ ] No console errors

---

## 🐛 Common Issues & Solutions

### Issue: "API Key not configured"
**Solution:** Double-check your environment variable is set correctly on your hosting platform.

### Issue: Site not accessible
**Solution:** 
- Wait 30 minutes for DNS propagation
- Check DNS records are correct
- Verify server is running: `pm2 status` (for VPS)

### Issue: "Cannot POST /api/analyze"
**Solution:**
- Server is not running properly
- Check logs: `pm2 logs bharatshop` (for VPS)
- Restart: `pm2 restart bharatshop`

### Issue: Images too large
**Solution:** 
- Current limit is 50MB
- If needed, adjust in `server.js`: `limit: '50mb'`

---

## 📊 Monitoring & Maintenance

### Vercel
- View logs in dashboard
- Automatic scaling
- 99.99% uptime

### Render  
- View logs in dashboard
- Auto-scaling available
- Built-in SSL

### VPS
```bash
# View logs
pm2 logs bharatshop

# Monitor resources
pm2 monit

# Check status
pm2 status

# View Nginx logs
tail -f /var/log/nginx/error.log
```

---

## 💰 Cost Estimate

| Platform | Monthly Cost | Notes |
|----------|--------------|-------|
| Vercel | $0 (Free tier) | Perfect for this app |
| Render | $0-$7 | Free tier available |
| DigitalOcean | $4-$12 | Basic droplet sufficient |
| AWS | $5-$20 | t2.micro or t3.micro |

**Claude API:** $5 free credits, then pay-as-you-go

---

## 🎉 Success!

Your BharatShop PhD is now live at **www.yhecosystem.in**!

Share it with friends and start helping people shop smarter! 🛍️

Questions? Check README.md or open an issue on GitHub.
