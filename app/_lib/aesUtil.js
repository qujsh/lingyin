import * as CryptoJS from "crypto-js";

// 密钥必须是 16 字节（128位 AES）
const SECRET_KEY = process.env.SECRET_KEY;

// 加密函数
export function encrypt(text) {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const encrypted = CryptoJS.AES.encrypt(text, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted
    .toString()
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

//解密函数
export function decrypt(cipherText) {
  const base64 = cipherText.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );

  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const decrypted = CryptoJS.AES.decrypt(padded, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
