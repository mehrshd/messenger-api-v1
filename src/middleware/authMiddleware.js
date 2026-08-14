const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
 
 const authHeader = req.headers["authorization"];
 const token = authHeader && authHeader.split(" ")[1];
 const JWT_SECRET = process.env.JWT_SECRET;

 if(!token) {
   return res.status(401).json({ message: "Authentication token is required." });
 }

 jwt.verify(token, JWT_SECRET, (err, decodedPayload) => {

  if (err) {
    if (err.name === "TokenExpiredError") {
     return res.status(401).json({ message: "Your session has expired. Please log in again." });
    }
     return res.status(403).json({ message: "Invalid authentication token." });
  }

  req.user = decodedPayload;
  next();

 })
}

module.exports = verifyToken