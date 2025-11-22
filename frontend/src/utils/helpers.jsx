// Format date to readable string
export const formatDate = (dateString) => {
  if (!dateString) return 'Never';
  
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  
  // Less than 1 minute
  if (diff < 60000) return 'Just now';
  
  // Less than 1 hour
  if (diff < 3600000) {
    const mins = Math.floor(diff / 60000);
    return `${mins} ${mins === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  // Less than 1 day
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  // Otherwise show full date
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Truncate long URLs
export const truncateUrl = (url, maxLength = 50) => {
  if (!url || url.length <= maxLength) return url;
  return url.substring(0, maxLength) + '...';
};

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

// Validate URL format
export const isValidUrl = (string) => {
  try {
    const url = string.trim();
    if (!/^https?:\/\//i.test(url)) {
      new URL('https://' + url);
    } else {
      new URL(url);
    }
    return true;
  } catch {
    return false;
  }
};

// Validate code format
export const isValidCode = (code) => {
  return /^[A-Za-z0-9]{6,8}$/.test(code);
};