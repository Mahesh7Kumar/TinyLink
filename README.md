# 🔗 TinyLink - URL Shortener

A modern, beautiful URL shortener application with a sleek dark theme interface inspired by contemporary design trends.

![TinyLink Dashboard](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-18.x-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🎨 **Modern Dark UI** - Beautiful gradient backgrounds with glassmorphism effects
- 🔗 **URL Shortening** - Create short, memorable links instantly
- 🎯 **Custom Codes** - Option to create custom short codes (6-8 characters)
- 📊 **Analytics** - Track clicks and view statistics for each link
- 🔍 **Search & Filter** - Easily find links with real-time search
- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚡ **Fast & Lightweight** - Optimized performance
- 🎭 **Status Indicators** - Visual status badges for link availability

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API server (see API section below)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/tinylink.git
cd tinylink
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**
```
http://localhost:5173
```

## 📁 Project Structure

```
tinylink/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # App header with logo
│   │   ├── LinkForm.jsx         # Form to create new links
│   │   ├── LinkTable.jsx        # Table displaying all links
│   │   ├── SearchBar.jsx        # Search functionality
│   │   └── StatsCard.jsx        # Statistics display card
│   ├── pages/
│   │   ├── Dashboard.jsx        # Main dashboard page
│   │   └── Stats.jsx            # Individual link statistics page
│   ├── hooks/
│   │   └── useLinks.js          # Custom hook for link operations
│   ├── services/
│   │   └── api.js               # API service layer
│   ├── utils/
│   │   └── helpers.js           # Utility functions
│   ├── styles/
│   │   └── styles.css           # Global styles (IMPORTANT!)
│   ├── App.jsx                  # Main app component
│   └── main.jsx                 # Entry point
├── public/
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Styling

The application uses a custom CSS file with modern design principles. **Make sure to import the CSS file in your `main.jsx`:**

```javascript
// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/styles.css'; // ← Import styles here

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### Design System

- **Dark Theme**: Slate-900 to Slate-800 gradient background
- **Purple Accents**: #8b5cf6 to #6366f1 gradient for primary actions
- **Glassmorphism**: Backdrop blur effects for depth
- **Status Indicators**: 
  - 🟢 Green dot = Available/Active links
  - 🔴 Red dot = Unavailable/Inactive links

## 🔧 Components Usage

### 1. Header Component
```jsx
import Header from './components/Header';

// In your App.jsx
<Header />
```

### 2. LinkForm Component
```jsx
import LinkForm from './components/LinkForm';

<LinkForm onSubmit={createLink} />
```

**Props:**
- `onSubmit(url, code)` - Function called when form is submitted

### 3. LinkTable Component
```jsx
import LinkTable from './components/LinkTable';

<LinkTable 
  links={linksArray} 
  onDelete={deleteLinkFunction} 
/>
```

**Props:**
- `links` - Array of link objects
- `onDelete(code)` - Function to delete a link

### 4. SearchBar Component
```jsx
import SearchBar from './components/SearchBar';

<SearchBar onSearch={handleSearch} />
```

**Props:**
- `onSearch(searchTerm)` - Debounced search callback (300ms)

### 5. StatsCard Component
```jsx
import StatsCard from './components/StatsCard';

<StatsCard stats={statsObject} />
```

**Props:**
- `stats` - Object containing link statistics

## 📊 API Integration

### Expected Backend API Structure

**Base URL Configuration:**
```javascript
// In LinkTable.jsx
const API_BASE = import.meta.env.PROD
  ? "https://your-backend-url.com"
  : "http://localhost:5000";
```

### Required Endpoints

#### 1. Get All Links
```http
GET /api/links?search={searchTerm}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "code": "abc123",
      "targetUrl": "https://example.com/very-long-url",
      "shortUrl": "https://tinylink.co/abc123",
      "clicks": 1000,
      "lastClicked": "2025-11-20T10:00:00Z",
      "createdAt": "2025-10-15T10:00:00Z"
    }
  ]
}
```

#### 2. Create New Link
```http
POST /api/links
Content-Type: application/json
```

**Request Body:**
```json
{
  "url": "https://example.com/very-long-url",
  "code": "custom123"  // optional, 6-8 alphanumeric characters
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "code": "custom123",
    "targetUrl": "https://example.com/very-long-url",
    "shortUrl": "https://tinylink.co/custom123",
    "clicks": 0,
    "createdAt": "2025-11-23T10:00:00Z"
  }
}
```

#### 3. Get Link Statistics
```http
GET /api/links/:code/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "code": "abc123",
    "targetUrl": "https://example.com",
    "clicks": 1000,
    "lastClicked": "2025-11-20T10:00:00Z",
    "createdAt": "2025-10-15T10:00:00Z"
  }
}
```

#### 4. Delete Link
```http
DELETE /api/links/:code
```

**Response:**
```json
{
  "success": true,
  "message": "Link deleted successfully"
}
```

#### 5. Redirect Short Link
```http
GET /:code
```
Redirects to the target URL.

## 🛠️ Utility Functions

Create a `helpers.js` file in `src/utils/`:

```javascript
// src/utils/helpers.js

// Validate URL format
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Validate custom code (6-8 alphanumeric characters)
export const isValidCode = (code) => {
  return /^[a-zA-Z0-9]{6,8}$/.test(code);
};

// Copy text to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

// Truncate long URLs
export const truncateUrl = (url, maxLength = 50) => {
  if (url.length <= maxLength) return url;
  return url.substring(0, maxLength) + '...';
};

// Format dates
export const formatDate = (date) => {
  if (!date) return 'Never';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
```

## 🎯 Custom Hooks

### useLinks Hook

Create a `useLinks.js` file in `src/hooks/`:

```javascript
// src/hooks/useLinks.js
import { useState, useEffect, useCallback } from 'react';
import { linkAPI } from '../services/api';

export const useLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLinks = useCallback(async (searchTerm = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await linkAPI.getAll(searchTerm);
      setLinks(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch links');
    } finally {
      setLoading(false);
    }
  }, []);

  const createLink = async (url, code) => {
    setError(null);
    try {
      const response = await linkAPI.create(url, code);
      setLinks([response.data, ...links]);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to create link');
      throw err;
    }
  };

  const deleteLink = async (code) => {
    setError(null);
    try {
      await linkAPI.delete(code);
      setLinks(links.filter(link => link.code !== code));
    } catch (err) {
      setError(err.message || 'Failed to delete link');
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  return {
    links,
    loading,
    error,
    fetchLinks,
    createLink,
    deleteLink
  };
};
```

## 🌐 API Service Layer

Create an `api.js` file in `src/services/`:

```javascript
// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const linkAPI = {
  getAll: async (searchTerm = '') => {
    const params = searchTerm ? { search: searchTerm } : {};
    return await api.get('/api/links', { params });
  },

  create: async (url, code = '') => {
    return await api.post('/api/links', { url, code });
  },

  getStats: async (code) => {
    return await api.get(`/api/links/${code}/stats`);
  },

  delete: async (code) => {
    return await api.delete(`/api/links/${code}`);
  },
};
```

## 🌈 Color Palette

```css
/* Primary Colors */
--bg-gradient-start: #1e293b;
--bg-gradient-end: #0f172a;
--primary-purple: #8b5cf6;
--primary-indigo: #6366f1;

/* Status Colors */
--success: #10b981;
--error: #ef4444;

/* Text Colors */
--text-primary: #ffffff;
--text-secondary: #cbd5e1;
--text-muted: #94a3b8;
--text-subtle: #64748b;

/* UI Elements */
--card-bg: rgba(30, 41, 59, 0.5);
--input-bg: rgba(51, 65, 85, 0.5);
--border: rgba(148, 163, 184, 0.1);
```

## 📦 package.json

```json
{
  "name": "tinylink",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "lucide-react": "^0.294.0",
    "axios": "^1.6.2"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  }
}
```

## 🚀 Build for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview

# Deploy dist/ folder to your hosting service
```

## 🔒 Environment Variables

Create a `.env` file:

```env
# Development
VITE_API_BASE_URL=http://localhost:5000

# Production (example)
# VITE_API_BASE_URL=https://api.tinylink.com
```

## 📱 Responsive Design

The UI is fully responsive with breakpoints:

- **Desktop**: > 1024px - Full table layout
- **Tablet**: 768px - 1024px - Adjusted spacing
- **Mobile**: < 768px - Stacked layout

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🗺️ Roadmap

- [ ] QR Code generation for links
- [ ] Bulk link creation via CSV
- [ ] Advanced analytics dashboard with charts
- [ ] Link expiration dates
- [ ] Password-protected links
- [ ] Custom domains support
- [ ] User authentication & authorization
- [ ] Team collaboration features
- [ ] API rate limiting
- [ ] Link preview cards

## 💡 Tips

1. Always validate URLs before submitting
2. Custom codes must be 6-8 alphanumeric characters
3. Search is debounced by 300ms for better performance
4. Use the settings icon for future link configuration features
5. Click on link codes to view detailed statistics

## 🐛 Troubleshooting

**Problem**: Styles not loading
- **Solution**: Ensure `styles.css` is imported in `main.jsx`

**Problem**: API calls failing
- **Solution**: Check your `.env` file and backend server status

**Problem**: Icons not showing
- **Solution**: Make sure `lucide-react` is installed: `npm install lucide-react`

---

Made with ❤️ by TinyLink Team