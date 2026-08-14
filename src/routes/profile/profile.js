const express = require('express');
const router = express.Router();
const dataBase = require('../../db');
const verifyToken = require('../../middleware/authMiddleware')

router.get('/profile', verifyToken, (req, res) => {

const id = req.user.id;
const sql = `SELECT * FROM users WHERE id = ?`;

dataBase.query(sql, [id], (err, result) => {

if(err) return res.status(500).json({
success: false,
message: " error server 500! "
})

res.status(200).json(result[0])

})
})

module.exports = router