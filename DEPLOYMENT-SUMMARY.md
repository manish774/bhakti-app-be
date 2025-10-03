# 🚀 VPS Deployment Ready!

Your Random Riddle API is now ready for VPS deployment! Here's everything you need:

## ✅ What's Been Set Up

### 📦 **Package Configuration**

- ✅ Production build scripts
- ✅ PM2 process manager
- ✅ Environment variable support
- ✅ TypeScript compilation

### 🔧 **Deployment Files Created**

- ✅ `simple-deploy.sh` - Automated deployment script
- ✅ `ecosystem.simple.js` - PM2 configuration (runs TypeScript directly)
- ✅ `VPS-DEPLOYMENT.md` - Step-by-step deployment guide
- ✅ `.env.example` - Environment template

### 🌐 **Application Features**

- ✅ Health check endpoint (`/health`)
- ✅ Environment-based configuration
- ✅ CORS configuration
- ✅ Error handling and logging

## 🚀 **Deploy to Your VPS**

### **Option 1: Automated Deployment**

```bash
# On your VPS:
curl -O https://raw.githubusercontent.com/manish774/bhakti-app-be/main/simple-deploy.sh
chmod +x simple-deploy.sh
./simple-deploy.sh
```

### **Option 2: Manual Deployment**

Follow the detailed steps in `VPS-DEPLOYMENT.md`

## 🔑 **Important Configuration**

After deployment, edit `/var/www/random-riddle-api/.env`:

```env
NODE_ENV=production
PORT=8080
MONGODB_URI=mongodb://localhost:27017/random-riddle-db
JWT_SECRET=your-super-secret-jwt-key-here
CORS_ORIGIN=*  # or your domain
```

## 📋 **Post-Deployment Steps**

1. **Test your API:**

   ```bash
   curl http://your-vps-ip:8080/health
   ```

2. **Check PM2 status:**

   ```bash
   pm2 status
   pm2 logs random-riddle-api
   ```

3. **Install MongoDB** (if needed):
   ```bash
   sudo apt install mongodb
   sudo systemctl start mongodb
   ```

## 🔄 **Management Commands**

```bash
# View application status
pm2 status

# View logs
pm2 logs random-riddle-api

# Restart application
pm2 restart random-riddle-api

# Update application
cd /var/www/random-riddle-api
git pull origin main
npm install
pm2 restart random-riddle-api
```

## 🛡️ **Optional: Domain & SSL**

1. **Point your domain** to your VPS IP
2. **Install Nginx** for reverse proxy
3. **Get SSL certificate** with Let's Encrypt
4. **Update CORS_ORIGIN** in .env to your domain

See `VPS-DEPLOYMENT.md` for detailed instructions.

## ✨ **Your API Endpoints**

- `GET /health` - Health check
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- All your existing API routes...

## 🎉 **You're Ready to Deploy!**

Your application has been tested locally and is working perfectly. Just push your changes to GitHub and run the deployment script on your VPS!

```bash
# First, commit and push your changes:
git add .
git commit -m "Prepare for VPS deployment"
git push origin main

# Then deploy on your VPS using the simple-deploy.sh script
```
