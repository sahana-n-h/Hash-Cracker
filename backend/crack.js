const fs = require('fs');
const crypto = require('crypto');

function sha256(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

async function crackHash(targetHash) {
  const words = fs.readFileSync('wordlist.txt', 'utf-8').split('\n');

  for (let word of words) {
    const guess = word.trim();
    const hash = sha256(guess);
    if (hash === targetHash) {
      return guess; // Found the original text
    }
  }

  return 'No match found';
}

module.exports = crackHash;
