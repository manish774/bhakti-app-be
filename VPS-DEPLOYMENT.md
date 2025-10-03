# Simple VPS Deployment Guide

## Quick Deployment Steps

### 1. Prepare Your VPS

Connect to your VPS via SSH:
```bash
ssh your-username@your-vps-ip
```

### 2. Run the Simple Deployment Script

```bash
# Download the deployment script
curl -O https://raw.githubusercontent.com/manish774/bhakti-app-be/main/simple-deploy.sh

# Make it executable
chmod +x simple-deploy.sh

# Run the deployment
./simple-deploy.sh
```

### 3. Configure Your Environment

Edit the `.env` file:
```bash
cd /var/www/random-riddle-api
nano .env
```

Update these values:
```env
NODE_ENV=production
PORT=8080
MONGODB_URI=mongodb://localhost:27017/random-riddle-db
JWT_SECRET=your-super-secret-jwt-key-here
CORS_ORIGIN=*
```

### 4. Install MongoDB (if needed)

```bash
# Install MongoDB
sudo apt install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### 5. Test Your API

```bash
# Check if API is running
curl http://localhost:8080/health

# Check PM2 status
pm2 status
```

## Manual Deployment (Alternative)

If you prefer manual setup:

### 1. Install Dependencies

```bash
# Update system
sudo apt update

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2
```

### 2. Setup Application

```bash
# Create directory
sudo mkdir -p /var/www/random-riddle-api
sudo chown -R $USER:$USER /var/www/random-riddle-api

# Clone your repo
cd /var/www/random-riddle-api
git clone https://github.com/manish774/bhakti-app-be.git .

# Install dependencies
npm install

# Create environment file
cp .env.example .env
nano .env  # Edit with your settings
```

### 3. Start with PM2

```bash
# Create logs directory
mkdir -p logs

# Start with PM2 (using ts-node for TypeScript)
pm2 start src/app.ts --name random-riddle-api --interpreter ts-node

# Save PM2 configuration
pm2 save

# Setup auto-start on boot
pm2 startup
# Follow the instructions shown
```

## Configuration Files

### Environment Variables (.env)
```env
NODE_ENV=production
PORT=8080
MONGODB_URI=mongodb://localhost:27017/random-riddle-db
JWT_SECRET=your-secret-key-here
CORS_ORIGIN=*
```

### PM2 Configuration (ecosystem.simple.js)
Already included in your project - uses ts-node to run TypeScript directly.

## Management Commands

```bash
# Check application status
pm2 status

# View logs
pm2 logs random-riddle-api

# Restart application
pm2 restart random-riddle-api

# Stop application
pm2 stop random-riddle-api

# Monitor resources
pm2 monit
```

## Updating Your Application

```bash
cd /var/www/random-riddle-api
git pull origin main
npm install
pm2 restart random-riddle-api
```

## Optional: Nginx Reverse Proxy

If you want to use a domain and SSL:

### 1. Install Nginx
```bash
sudo apt install nginx
```

### 2. Create Nginx Config
```bash
sudo nano /etc/nginx/sites-available/random-riddle-api
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. Enable the Site
```bash
sudo ln -s /etc/nginx/sites-available/random-riddle-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Troubleshooting

### Check if app is running:
```bash
pm2 status
pm2 logs random-riddle-api
```

### Check if port is available:
```bash
sudo netstat -tlnp | grep :8080
```

### Test API endpoints:
```bash
curl http://localhost:8080/health
curl http://localhost:8080/api/auth/login
```

### Check MongoDB:
```bash
sudo systemctl status mongodb
mongo  # Connect to MongoDB shell
```

## Security Notes

- Change the JWT_SECRET to a strong, unique value
- Configure firewall to only allow necessary ports
- Keep your server updated regularly
- Use environment variables for sensitive data

That's it! Your API should now be running on your VPS.