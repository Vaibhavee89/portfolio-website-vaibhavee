// Generates a bcrypt hash of a password, to paste into the ADMIN_PASSWORD_HASH
// environment variable. The plaintext password is never stored anywhere —
// only this hash is, and only the hash is what the login API compares against.
//
// Usage: npm run auth:hash -- "your-chosen-password"

import bcrypt from 'bcryptjs';

const password = process.argv[2];

if (!password) {
  console.error('\nUsage: npm run auth:hash -- "your-chosen-password"\n');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
console.log('\nADMIN_PASSWORD_HASH=' + hash + '\n');
console.log('Set this as an environment variable in your Vercel project settings');
console.log('(and in .env.local for local testing). Do not commit it to git.\n');
