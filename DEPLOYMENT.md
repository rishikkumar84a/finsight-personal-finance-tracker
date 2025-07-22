# 🚀 FinSight Deployment Guide

## Full-Stack Architecture
- **Frontend**: React + TypeScript + Vite (Deployed on Vercel)
- **Backend**: Node.js + Express (Deploy on Railway/Render)
- **Database**: MongoDB Atlas (Cloud)

## 📋 Deployment Steps

### 1. Database Setup (MongoDB Atlas)
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create new cluster
3. Create database user
4. Get connection string
5. Add to backend environment variables

### 2. Backend Deployment (Railway)
1. Push your code to GitHub
2. Go to [Railway](https://railway.app/)
3. Connect your GitHub repository
4. Select the `server` folder as root
5. Add environment variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/finsight
   JWT_SECRET=your-super-secure-jwt-secret-key
   PORT=5001
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```
6. Deploy!

### 3. Frontend Deployment (Vercel)
1. Your frontend is already on Vercel
2. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```
3. Redeploy

### 4. Update CORS
After deploying, update your backend's CORS settings to include your production frontend URL.

## 🔧 Environment Variables

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend-app.railway.app/api
```

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/finsight
JWT_SECRET=your-super-secure-jwt-secret-key
PORT=5001
NODE_ENV=production
FRONTEND_URL=https://finsight-personal-finance-tracker.vercel.app
```

## 🧪 Testing Production
1. Visit your Vercel URL
2. Test user registration
3. Test login/logout
4. Test transaction creation
5. Test budget management

## 🔍 Troubleshooting
- Check browser console for API errors
- Verify environment variables are set correctly
- Check CORS configuration
- Monitor backend logs on Railway
