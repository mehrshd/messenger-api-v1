const express = require('express');
const router = express.Router();
const dataBase = require('../../../db');
require('dotenv').config();
const {ErrorValidations, DuplicateErrors} = require('../../../Errors/errors');
const SendToken = require('../../../token/token');

// router.post('/users', async (req, res) => {

//  const { username, email, password_hash, full_name, phone, avatar_url } = req.body;

//   const errorValues = [];
//   const userNameRegex = /^[a-zA-Z0-9_]{4,15}$/;
//   // const phoneNumberRegex = /^[0-9+-\s()]*$/;

//  const rules = [
//   { field: "username", validate: () => typeof username === "string" && username.trim() !== "" && userNameRegex.test(username), message: " Enter your username! " },
//   { field: "email", validate: () => typeof email === "string", message: " Enter your email! " },
//   { field: "password_hash", validate: () => typeof password_hash === "string" && password_hash.trim() !== "", message: " Enter your password! " },
//   { field: "full_name", validate: () => typeof full_name === "string" && full_name.trim() !== "", message: " Enter your fullname! " },
//   { field: "phone", validate: () => typeof phone === 'number' && phone !== "", message: " Enter your phoneNumber! " },
//  ];

//   for(let rule of rules){
//   if(!rule.validate()){
//    errorValues.push({ message: rule.message, success: false });
//   }
//  }

//  if(errorValues.length > 0) {
//   return res.status(400).json(errorValues[0])
//  }


//  const checkedSql = `SELECT username, email, phone FROM users WHERE username = ? OR email = ? OR phone = ?`;
//   dataBase.query(checkedSql, [username, email, phone], (err, row) => {

//     if(err) return res.status(500).json({ error: err, message: " error 500 ! ", success: false });

//       if(row.length > 0) {
//          const existing = row[0];
//          const duplicateErrors = [];
         
//           if(existing.username == username) duplicateErrors.push({ message: " This username is already taken ", success: false });
//           if(existing.email == email) duplicateErrors.push({ message: " An account has already been created with this email ", success: false });
//           if(existing.phone == phone) duplicateErrors.push({ message: " An account has already been created with this phonenumber ", success: false });

//          if(duplicateErrors.length > 0) {
//             return res.status(400).json(duplicateErrors[0])
//          }
//       }

//        const sql = `INSERT INTO users (username, email, password_hash, full_name, phone, avatar_url) VALUES (?, ?, ?, ?, ?, ?)`;
//        const params = [ username, email, password_hash, full_name, phone, avatar_url ];

//        dataBase.query(sql, params, async (err, result) => {
        
//          if(err) return res.status(500).json({ error: err, message: " error server 500! " });

//          const insertedUserId = result.insertId;
//           const tokenDuration = "1h";
//            const tokenPayload = {
//             id: insertedUserId
//            }
//           const JWT_SECRET = process.env.JWT_SECRET;

//           if(!JWT_SECRET) {
//            return res.status(500).json({
//             success: false,
//             message: " token is not defined in environment variables! "
//            })
//           }

//          const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: tokenDuration })

//          const saltRounds = 10;
//          const hashPassWord = await bcrypt.hash(password_hash, saltRounds);

//          const dataUser = {
//            username,
//            phone,
//            email,
//            password: hashPassWord,
//            fullname: full_name,
//            photo: avatar_url,
//          }

//           res.status(201).json({
//            success: true,
//            message: " Account created successfully. welvome! ",
//            data: dataUser,
//            token: token,
//           })
         
//        })
//   })

// })

router.post("/register", async(req, res) => {
  const { username, email, password_hash, full_name, phone, avatar_url } = req.body;

 const validationErrors = await ErrorValidations({ username, email, password_hash, full_name, phone });

 if(validationErrors.length > 0){
  return res.status(400).json(validationErrors[0]);
 }

 const checkedSql = `SELECT username, email, phone from users WHERE username = ? OR email = ? OR phone = ?`;
 dataBase.query(checkedSql, [username, email, phone], async(err, row) => {
 if(err) {
  return res.status(500).json({ success: false, message: " error 500! " })
 }

 const rows = row[0];
 const duplicateErrors = await DuplicateErrors({ username, email, phone, rows });

 if(duplicateErrors.length > 0){
  return res.status(400).json(duplicateErrors[0]);
 }
 
 const sql = `INSERT INTO users (username, email, password_hash, full_name, phone, avatar_url) VALUES (?, ?, ?, ?, ?, ?)`;
 const params = [ username, email, password_hash, full_name, phone, avatar_url ];

 dataBase.query(sql, params, async (err, result) => {
  if(err) return res.status(500).json({ success: false, message: " Error 500! " });


    const resultId = result.insertId;
    const token = await SendToken(resultId);

  const fullDataUser = {
    fullname: full_name,
    username,
    avatar: avatar_url
  }

  return res.status(200).json({
    success: true,
    message: "your welcome!",
    data: fullDataUser,
    token: token
  });

 });
 
 })

})

module.exports = router