# 🔗 TinyLink - Professional URL Shortener

A modern, full-stack URL shortener application with a sleek dark theme interface and robust backend infrastructure.

[![Live Demo](https://img.shields.io/badge/Demo-Live-success)](https://tiny-link-opal.vercel.app/)
[![API](https://img.shields.io/badge/API-Active-blue)](https://tinylink-vevx.onrender.com/healthz)
![React](https://img.shields.io/badge/React-18.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌐 Live Application

- **Frontend**: https://tiny-link-opal.vercel.app/
- **Backend API**: https://tinylink-vevx.onrender.com
- **Health Check**: https://tinylink-vevx.onrender.com/healthz

---

## ✨ Features

### Frontend
- 🎨 **Modern Dark UI** - Beautiful gradient backgrounds with glassmorphism effects
- 🔗 **URL Shortening** - Create short, memorable links instantly
- 🎯 **Custom Codes** - Option to create custom short codes (6-8 characters)
- 📊 **Analytics Dashboard** - Track clicks and view statistics for each link
- 🔍 **Real-time Search** - Find links instantly with debounced search
- 📱 **Fully Responsive** - Works seamlessly on all devices
- ⚡ **Fast & Lightweight** - Optimized React with Vite
- 🎭 **Status Indicators** - Visual badges for link availability
- 📋 **One-Click Copy** - Easy clipboard functionality

### Backend
- 🚀 **RESTful API** - Clean, well-documented endpoints
- 🔐 **Input Validation** - Comprehensive URL and code validation
- 💾 **Supabase PostgreSQL** - Cloud-hosted, reliable data persistence
- 🛡️ **Security** - Helmet.js, CORS, rate limiting
- 📈 **Click Tracking** - Real-time analytics with timestamps
- ⚡ **Connection Pooling** - Optimized database performance
- 🔄 **302 Redirects** - Proper HTTP redirect implementation
- 🏥 **Health Monitoring** - Built-in health check endpoint
- 🎯 **Error Handling** - Centralized error management

---

## 📁 Complete Project Structure

```
tinylink/
├── frontend/                          # React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx             # App header with branding
│   │   │   ├── LinkForm.jsx           # Create new links form
│   │   │   ├── LinkTable.jsx          # Display all links
│   │   │   ├── SearchBar.jsx          # Search functionality
│   │   │   └── StatsCard.jsx          # Statistics display
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx          # Main dashboard
│   │   │   └── Stats.jsx              # Individual link stats
│   │   ├── hooks/
│   │   │   └── useLinks.js            # Custom React hook
│   │   ├── services/
│   │   │   └── api.js                 # API service layer
│   │   ├── utils/
│   │   │   └── helpers.js             # Utility functions
│   │   ├── styles/
│   │   │   └── styles.css             # Global styles
│   │   ├── App.jsx                    # Root component
│   │   └── main.jsx                   # Entry point
│   ├── public/
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── backend/                           # Node.js + Express
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js            # Supabase PostgreSQL connection
│   │   ├── controllers/
│   │   │   ├── linkController.js      # Link CRUD operations
│   │   │   └── healthController.js    # Health check
│   │   ├── models/
│   │   │   └── linkModel.js           # Database queries
│   │   ├── routes/
│   │   │   ├── api.js                 # API routes
│   │   │   └── redirect.js            # Redirect handler
│   │   ├── middleware/
│   │   │   ├── errorHandler.js        # Error handling
│   │   │   └── validator.js           # Input validation
│   │   ├── utils/
│   │   │   ├── urlValidator.js        # URL validation
│   │   │   └── codeGenerator.js       # Code generation
│   │   └── server.js                  # Express app entry
│   ├── .env.example
│   └── package.json
│
└── README.md                          # This file
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**
- **Supabase Account** (free tier available)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/tinylink.git
cd tinylink
```

---

## 🔧 Backend Setup (Supabase PostgreSQL)

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new project:
   - **Name**: TinyLink
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
4. Wait for project to initialize (~2 minutes)

### 2. Get Database Connection String

1. In Supabase Dashboard, go to **Settings** → **Database**
2. Scroll to **Connection string** section
3. Select **Connection pooling** → **Transaction mode**
4. Copy the connection string (looks like):
   ```
   postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```
5. Replace `[password]` with your actual database password

### 3. Setup Backend

```bash
cd backend
npm install
```

### 4. Install Dependencies

```bash
npm install express pg dotenv cors helmet express-rate-limit
npm install --save-dev nodemon
```
**Expected Output:**
```
✅ Supabase PostgreSQL connected successfully
✅ Database tables initialized
🚀 TinyLink server running on port 5000
📍 Environment: production
🔗 Base URL: https://XXX-XXX.onrender.com
💾 Database: Supabase PostgreSQL
```

---

## 💻 Frontend Setup

### 1. Navigate to Frontend

```bash
cd frontend
npm install
```

## 🚀 Deployment Guide

### Backend Deployment (Render)

Your backend is already deployed at: **https://tinylink-vevx.onrender.com**

#### To Update/Redeploy:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update backend"
   git push origin main
   ```

2. **Render Auto-Deploy**
   - Render will automatically detect changes and redeploy
   - Check deployment status at: https://dashboard.render.com

### Frontend Deployment (Vercel)

Your frontend is already deployed at: **https://tiny-link-opal.vercel.app**

#### To Update/Redeploy:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update frontend"
   git push origin main
   ```

2. **Vercel Auto-Deploy**
   - Vercel will automatically build and deploy
   - Check at: https://vercel.com/dashboard

## 📡 API Documentation


## 🗄️ Database Schema (Supabase)

### View Your Database

1. Go to [Supabase Dashboard](https://supabase.com)
2. Select your project
3. Click **Table Editor** in sidebar
4. You'll see the `links` table

## 🎨 Frontend Components

All the React components remain the same as provided earlier. Make sure to:

1. Import styles in **main.jsx**:
   ```javascript
   import './styles/styles.css';
   ```

2. Use the updated API service pointing to your Render backend

---

## 🐛 Troubleshooting

### Common Issues

#### Issue: "CORS Error" in browser console

**Solution:**
```javascript
// In backend/src/server.js, verify CORS setup:
app.use(cors({
  origin: [
    'https://tiny-link-opal.vercel.app',
    'http://localhost:5173'
  ],
  credentials: true
}));
```

#### Issue: "Database connection failed"

**Solution:**
1. Check Supabase project is active
2. Verify DATABASE_URL in Render environment variables
3. Ensure connection string includes `?sslmode=require`
4. Check Supabase project isn't paused (free tier pauses after inactivity)

#### Issue: Backend is slow or times out

**Solution:**
- Render free tier sleeps after 15 min inactivity
- First request after sleep takes ~30 seconds
- Consider upgrading to paid tier for always-on
- Or implement a keep-alive ping service

#### Issue: Frontend shows "Network Error"

**Solution:**
1. Check backend health: `curl https://XXXX-XXXX.onrender.com/healthz`
2. Verify VITE_API_BASE_URL in Vercel env variables
3. Check browser console for detailed error
4. Test API directly with curl/Postman

-

### Render Dashboard

- **Logs**: https://dashboard.render.com → Your Service → Logs
- **Metrics**: View CPU, memory usage
- **Deploys**: Check deployment history

### Vercel Dashboard

- **Deployments**: https://vercel.com/dashboard
- **Analytics**: View page views, performance
- **Logs**: Real-time function logs

### Supabase Dashboard

- **Database**: https://supabase.com/dashboard → Table Editor
- **SQL Editor**: Run custom queries
- **Logs**: Database activity logs

---

## 🎯 Testing Checklist

### Manual Testing

1. ✅ Visit https://tiny-link-opal.vercel.app
2. ✅ Create a link without custom code
3. ✅ Create a link with custom code (6-8 chars)
4. ✅ Try invalid URL (should show error)
5. ✅ Try duplicate custom code (should show 409 error)
6. ✅ Click copy button
7. ✅ Test search functionality
8. ✅ Click on short URL to test redirect
9. ✅ View link statistics
10. ✅ Delete a link
11. ✅ Test on mobile device
---

**Made with ❤️ by Your Mahesh**

*Using React + Vite, Node.js + Express, PostgreSQL (Supabase)*

*Deployed on Vercel & Render*
