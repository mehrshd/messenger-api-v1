const express = require('express');
const router = express.Router();
const dataBase = require('../db')

const authMiddleware = require('../middleware/authMiddleware');

router.get('/users', (req, res) => {

 const sql = `SELECT * FROM users WHERE 1=1`;

 dataBase.query(sql, (err, result) => {
  if(err) return res.status(500).json({
   error: err,
   message: " error 500 from getUsers! "
  })

  res.status(201).json(result)
 })
})

module.exports = router;