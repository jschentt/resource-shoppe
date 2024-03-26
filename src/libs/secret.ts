import CryptoJS from 'crypto-js'
// 引用AES源码js
const keyStr = 'icklsdufidsakdfa' // 十六位十六进制数作为密钥
const ivStr = '' // 偏移量

const Encrypt = (data) => {
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const iv = CryptoJS.enc.Utf8.parse(ivStr)
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  // 返回的是base64格式的密文
  return encrypted.ciphertext.toString()
}

// encrypted 为是base64格式的密文
const Decrypt = (encrypted) => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(encrypted)
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const iv = CryptoJS.enc.Utf8.parse(ivStr)
  const decrypted = CryptoJS.AES.decrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

// base64加密
const EncodeBase64 = (words) => {
  const wordArray = CryptoJS.enc.Utf8.parse(words)
  return CryptoJS.enc.Base64.stringify(wordArray)
}

// base64解密
const DecodeBase64 = (base64) => {
  const parsedWordArray = CryptoJS.enc.Base64.parse(base64)
  return parsedWordArray.toString(CryptoJS.enc.Utf8)
}

export default {
  DecodeBase64,
  EncodeBase64,
  Decrypt,
  Encrypt
}
