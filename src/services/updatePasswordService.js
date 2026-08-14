/*
 * @author aloki
 * @file updatePasswordService.js
 * @date 2026-08-14
 */

const dataBase = require('../db');
const bcrypt = require('bcrypt');

const getUserById = async (userId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, password_hash, email FROM users WHERE id = ?`;
    dataBase.query(sql, [userId], (err, result) => {
      if (err) reject(err);
      if (!result || result.length === 0) {
        reject(new Error('User not found'));
      }
      resolve(result[0]);
    });
  });
};

const verifyCurrentPassword = async (currentPassword, hashedPassword) => {
  try {
    if (!hashedPassword.startsWith('$2')) {
      return currentPassword === hashedPassword;
    }
    const isMatch = await bcrypt.compare(currentPassword, hashedPassword);
    return isMatch;
  } catch (err) {
    console.error('Password verification error:', err.message);
    throw new Error('Password verification failed');
  }
};

const hashNewPassword = async (newPassword) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    return hashedPassword;
  } catch (err) {
    throw new Error('Password hashing failed');
  }
};

const updatePasswordInDB = async (userId, newHashedPassword) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE users SET password_hash = ? WHERE id = ?`;
    dataBase.query(sql, [newHashedPassword, userId], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const updatePassword = async ({ userId, currentPassword, newPassword }) => {
  try {
    if (!userId || !currentPassword || !newPassword) {
      throw new Error('Missing required fields');
    }

    if (currentPassword === newPassword) {
      throw new Error('New password must be different from current password');
    }

    if (newPassword.length < 6) {
      throw new Error('New password must be at least 6 characters long');
    }

    const user = await getUserById(userId);
    const isPasswordValid = await verifyCurrentPassword(
      currentPassword,
      user.password_hash
    );

    if (!isPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    const newHashedPassword = await hashNewPassword(newPassword);
    await updatePasswordInDB(userId, newHashedPassword);

    return {
      success: true,
      message: 'Password updated successfully',
      email: user.email,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  updatePassword,
  getUserById,
  verifyCurrentPassword,
  hashNewPassword,
  updatePasswordInDB,
};
