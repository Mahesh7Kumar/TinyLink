const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // MySQL duplicate entry error
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ 
      success: false,
      error: 'This code already exists' 
    });
  }

  // MySQL connection error
  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({ 
      success: false,
      error: 'Database connection failed' 
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
};

module.exports = errorHandler;