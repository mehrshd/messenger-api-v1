async function checkDuplicateAndCreateUser(username, email, password_hash, full_name, phone, avatar_url, role, is_active, dataBase) {
 const checkedSql = `SELECT username, email, phone FROM users WHERE username = ? OR email = ? OR phone = ?`;

 try {

  const rows = await new Promise((resolve, reject) => {

   dataBase.query(checkedSql, [username, email, phone], (err, res) => {
    if(err) reject(err);
    resolve(res);
   });

  });

  if(rows.length > 0) {
     const existing = rows[0];
     const duplicateErrors = [];

     if(existing.username == username) duplicateErrors.push({ message: " This username is already taken " });
     else if(existing.email == email) duplicateErrors.push({ message: " An account has already been created with this email " });
     else if(existing.phone == phone) duplicateErrors.push({ message: " An account has already been created with this phonenumber " });

     if(duplicateErrors.length > 0) {
        return { success: false, message: duplicateErrors[0].message };
     }
  }

  const sql = `INSERT INTO users (username, email, password_hash, full_name, phone, avatar_url, role, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [ username, email, password_hash, full_name, phone, avatar_url, role, is_active ];

  await new Promise((resolve, reject) => {
   dataBase.query(sql, params, (err, res) => {
    if(err) reject(err);
    resolve(res);
   })
  })

  const saltRounds = 10;
  const hashPassWord = await bcrypt.hash(password_hash, saltRounds);

  const dataUser = {
    username,
    phone,
    email,
    password: hashPassWord,
    fullname: full_name,
    photo: avatar_url,
    role,
    isActive: is_active 
  }

  return { success: true, message: `your welcome ${dataUser.username}`, data: dataUser }

 } catch (error) {
  console.error("Database operation failed:", error);
  return { success: false, error: error , message: " Internal server error during user creation. " };
 }
}

module.exports = { checkDuplicateAndCreateUser }