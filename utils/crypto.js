import crypto from 'crypto';

const algorithm = 'aes-256-cbc';

export const encrypt = (text, iv, key) => {
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(key, 'base64'),
    Buffer.from(iv, 'base64')
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
};

export const decrypt = (text, iv, key) => {
  const encryptedText = Buffer.from(text, 'hex');
  let decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key, 'base64'),
    Buffer.from(iv, 'base64')
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
