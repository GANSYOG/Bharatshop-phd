@echo off
:: BharatShop PhD - Quick Setup Script for Windows

echo ╔════════════════════════════════════════════╗
echo ║   BharatShop PhD - Quick Setup Script     ║
echo ╚════════════════════════════════════════════╝
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed!
    echo 📥 Please install Node.js 18+ from: https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js found: %NODE_VERSION%
echo.

:: Check if .env exists
if not exist .env (
    echo 📝 Creating .env file...
    copy .env.example .env
    echo ⚠️  IMPORTANT: Edit .env and add your ANTHROPIC_API_KEY
    echo    Get your API key from: https://console.anthropic.com
    echo.
    pause
)

:: Install dependencies
echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% EQU 0 (
    echo ✅ Dependencies installed successfully!
) else (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo ╔════════════════════════════════════════════╗
echo ║            Setup Complete! 🎉              ║
echo ╠════════════════════════════════════════════╣
echo ║  To start the server:                      ║
echo ║  $ npm start                               ║
echo ║                                            ║
echo ║  Then visit: http://localhost:3000        ║
echo ╚════════════════════════════════════════════╝
echo.
echo 📚 Next steps:
echo    1. Make sure your ANTHROPIC_API_KEY is in .env
echo    2. Run: npm start
echo    3. Open http://localhost:3000 in your browser
echo    4. Upload a product image and try it out!
echo.
echo 🚀 For deployment to yhecosystem.in, see DEPLOYMENT_GUIDE.md
echo.
pause
