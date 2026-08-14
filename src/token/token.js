require('dotenv').config();
const jwt = require('jsonwebtoken');

const SendToken = (resultId) => {
 const tokenDuration = "1h";
 const tokenPayload = {
   id: resultId,
 }
 const JWT_SECRET = process.env.JWT_SECRET;

 const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: tokenDuration });

 return token;
}

module.exports = SendToken;