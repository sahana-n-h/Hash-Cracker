const fs = require('fs');
const crypto = require('crypto');

// Hashing function using SHA256
function sha256(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

async function crackHash(hash) {

  const cleanedhash = hash.trim();

  const txtWords = fs.readFileSync('wordlist.txt', 'utf-8').split('\n').map(w => w.trim());
  
  for (let Words of txtWords) {
    const guess = Words.trim();
    const hash = sha256(guess);
    if (hash === cleanedhash) {
      return guess;
    }
  }

  return ' No match found';
}

module.exports = crackHash;
