#!/bin/bash

# Simple VPS Deployment Script
# This script deploys your Node.js app to a VPS using PM2

set -e

echo "🚀 Simple VPS Deployment for Random Riddle API"

# Configuration
APP_NAME="random-riddle-api"
APP_DIR="/var/www/$APP_NAME"
NODE_VERSION="18"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root"
   exit 1
fi

print_status "Updating system packages..."
sudo apt update

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    print_status "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    print_status "Node.js is already installed: $(node --version)"
fi

# Install PM2 globally if not present
if ! command -v pm2 &> /dev/null; then
    print_status "Installing PM2..."
    sudo npm install -g pm2
else
    print_status "PM2 is already installed"
fi

# Create app directory
print_status "Setting up application directory..."
sudo mkdir -p $APP_DIR
sudo chown -R $USER:$USER $APP_DIR

# Navigate to app directory
cd $APP_DIR

# Clone or update repository
if [ -d ".git" ]; then
    print_status "Updating repository..."
    git pull origin main
else
    print_status "Cloning repository..."
    # You'll need to replace this with your actual repo URL
    git clone https://github.com/manish774/bhakti-app-be.git .
fi

# Install dependencies
print_status "Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    print_warning "Creating .env file from template..."
    cat > .env << EOL
NODE_ENV=production
PORT=8080
MONGODB_URI=mongodb://localhost:27017/random-riddle-db
JWT_SECRET=your-super-secret-jwt-key-change-this
CORS_ORIGIN=*
EOL
    print_warning "Please edit .env file with your actual configuration!"
fi

# Create logs directory
mkdir -p logs

# Stop existing PM2 process if running
print_status "Stopping existing PM2 processes..."
pm2 delete $APP_NAME 2>/dev/null || true

# Start the application with PM2
print_status "Starting application with PM2..."
pm2 start src/app.ts --name $APP_NAME --interpreter ts-node

# Save PM2 configuration
pm2 save

# Setup PM2 startup
print_status "Setting up PM2 startup..."
pm2 startup
print_warning "Please run the command shown above to enable PM2 startup"

print_status "✅ Deployment completed!"
print_status "Your API is running on port 8080"
print_status ""
print_status "Next steps:"
print_status "1. Edit .env file: nano $APP_DIR/.env"
print_status "2. Install and configure MongoDB if needed"
print_status "3. Setup Nginx reverse proxy (optional)"
print_status ""
print_status "PM2 Commands:"
print_status "- pm2 status           # Check status"
print_status "- pm2 logs $APP_NAME   # View logs"
print_status "- pm2 restart $APP_NAME # Restart app"