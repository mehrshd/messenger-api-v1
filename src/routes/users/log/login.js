const express = require('express');
const router = express.Router();
const dataBase = require('../../../db');
const SendToken = require('../../../token/token');

router.post("/login", (req, res) => {
 const { username, password_hash } = req.body;
 const checkedSql = `SELECT * from users WHERE username = ?`;

 if(!username || !password_hash) {
  return res.status(400).json({
   success: false,
   message: " Entering a username and password is mandatory! "
  });
 }

 dataBase.query(checkedSql, [username], async (err, result) => {
  if(err) return res.status(500).json({ success: false, message: " error 500! " });

  if(result.length === 0){
   return res.status(400).json({ success: false, message: " The username entered is incorrect. " })
  }else {
     
   const user = result[0];
   if(password_hash === user.password_hash) {

    const userId = user.id;
    const token = SendToken(userId);

    const dataUser = {
     id: userId,
     username,
     email: user.email,
     avatar: user.avatar_url,
     token
    }

    return res.status(200).json({
     success: true,
     message: `welcome ${ user.full_name }`,
     data: dataUser,
     token
    })
   }else {

    return res.status(400).json({
     success: false,
     message: " The password entered is incorrect. "
    })
   }
  }
 })
})

module.exports = router;