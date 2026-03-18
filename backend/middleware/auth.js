const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_for_dev');
    req.user = { id: decoded.userId };
    
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = auth;
