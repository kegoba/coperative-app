const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET } = process.env;

const authenticate = (req, res, next) => {
  const authHeader = req.header('Authorization');
console.log("process.env.JWT_SECRET")
  if (!authHeader) {
    return res.status(401).send('Access denied. No token provided.');
  }

  const token = authHeader.split(' ')[1]; // Extract the token from 'Bearer <token>'

  if (!token) {
    return res.status(401).send('Access denied. Invalid token format.');
  }
   
  try {
    const decoded = jwt.verify(token, JWT_SECRET);//JWT_SECRET  
    req.officer = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(400).send('Invalid token.');
  }
};



const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('Access denied: Admins only');
  }
  next();
};


module.exports = { authenticate,  authorizeAdmin }