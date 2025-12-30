const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'No token provided. Authorization denied.' 
      });
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        error: 'No token provided. Authorization denied.' 
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if user still exists
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user) {
        return res.status(401).json({ 
          error: 'User no longer exists. Authorization denied.' 
        });
      }

      // Add user to request object
      req.user = user;
      req.userId = decoded.userId;
      
      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          error: 'Token expired. Please login again.' 
        });
      }
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ 
          error: 'Invalid token. Authorization denied.' 
        });
      }
      throw err;
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Server error during authentication' });
  }
};

module.exports = auth;
