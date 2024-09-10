import JSEncrypt from "jsencrypt";

export function encryptRSA(publicKey: string, plainText: string) {
  const encrypt = new JSEncrypt();

  encrypt.setPublicKey(publicKey);

  return encrypt.encrypt(plainText);
}
