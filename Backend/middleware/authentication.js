import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
 
const token = req.cookies.authcookie;


  if (!token) {
    return res.status(401).json({ message: 'No token found' });
  }


  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); 
    req.user = decoded; 
    next(); 
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
