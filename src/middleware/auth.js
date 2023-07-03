const jwt = require('jsonwebtoken');

const auth = {
  veryfiToken: (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) throw 'Token not found';
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.payload = decoded;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: 'Token expired' });
      }
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      res.status(401).json({ message: error });
    }
  },
};
module.exports = auth;
