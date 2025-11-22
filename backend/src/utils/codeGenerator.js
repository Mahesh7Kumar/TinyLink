// Generate random alphanumeric code
const generateCode = (length = 6) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  
  return result;
};

// Validate code format (6-8 alphanumeric)
const isValidCodeFormat = (code) => {
  if (!code || typeof code !== 'string') return false;
  return /^[A-Za-z0-9]{6,8}$/.test(code);
};

module.exports = { generateCode, isValidCodeFormat };