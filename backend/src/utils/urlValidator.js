// Comprehensive URL validation
const validateUrl = (urlString) => {
  if (!urlString || typeof urlString !== 'string') {
    return { valid: false, url: null, error: 'URL is required' };
  }

  let url = urlString.trim();

  // Add protocol if missing
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }

  try {
    const urlObj = new URL(url);

    // Validate protocol
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { 
        valid: false, 
        url: null, 
        error: 'Only HTTP and HTTPS protocols are allowed' 
      };
    }

    // Validate hostname
    if (!urlObj.hostname || urlObj.hostname.length < 3) {
      return { 
        valid: false, 
        url: null, 
        error: 'Invalid hostname' 
      };
    }

    // Check for localhost/private IPs in production
    if (process.env.NODE_ENV === 'production') {
      const blockedHosts = ['localhost', '127.0.0.1', '0.0.0.0'];
      if (blockedHosts.includes(urlObj.hostname)) {
        return { 
          valid: false, 
          url: null, 
          error: 'Private URLs are not allowed' 
        };
      }
    }

    return { valid: true, url: urlObj.href, error: null };

  } catch (error) {
    return { 
      valid: false, 
      url: null, 
      error: 'Invalid URL format. Please enter a valid URL.' 
    };
  }
};

module.exports = { validateUrl };