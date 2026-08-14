/*
 * @author aloki
 * @file server.js
 * @date 2026-08-14
 */

const app = require('./src/app')
const { decryptSignature } = require('./src/utils/encryption-utils')
const PORT = process.env.PORT || 3000;

const signature = app.locals.signature;
const decrypted = decryptSignature(signature);

console.log('\n' + '█'.repeat(55));
console.log('🔐 Code Authorization & Signature Verification');
console.log('█'.repeat(55));
console.log(`✓ Author: ${decrypted}`);
console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`✓ Timestamp: ${new Date().toISOString()}`);
console.log(`✓ Port: ${PORT}`);
console.log('█'.repeat(55) + '\n');

app.listen(PORT, () => {
 console.log(`🚀 Server is running on port ${PORT}`);
 console.log(`📍 Ready to accept connections...\n`);
});

