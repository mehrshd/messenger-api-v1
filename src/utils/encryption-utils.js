/*
 * @author aloki
 * @file encryption-utils.js
 * @date 2026-08-14
 */

const crypto = require('crypto');

const SECRET_KEY = process.env.SIGNATURE_KEY || 'aloki-secret-key-2026-chat-app';

function getKeyBuffer() {
  const hash = crypto.createHash('sha256');
  hash.update(SECRET_KEY);
  return hash.digest();
}

function encryptSignature(text) {
  try {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', getKeyBuffer(), iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return iv.toString('hex') + ':' + encrypted;
  } catch (err) {
    console.error('Encryption error:', err.message);
    return null;
  }
}

function decryptSignature(encryptedData) {
  try {
    const [ivHex, encrypted] = encryptedData.split(':');
    
    if (!ivHex || !encrypted) {
      return 'INVALID_SIGNATURE';
    }
    
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', getKeyBuffer(), iv);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (err) {
    console.error('Decryption error:', err.message);
    return 'INVALID_SIGNATURE';
  }
}

function generateSignature(author, module, year) {
  const text = `${author} | ${module} | ${year}`;
  return encryptSignature(text);
}

module.exports = {
  encryptSignature,
  decryptSignature,
  generateSignature,
};
