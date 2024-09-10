import EncryptI from "../Encrypt";
import { publicEncrypt, constants } from "node:crypto";

export default class RSA implements EncryptI<string> {
  encrypt(info: string): string {
    const publicKey = process.env.PUBLIC_ENCRYPTATION_KEY!.replace(
      /\\n/g,
      "\n"
    );

    return publicEncrypt(
      {
        key: publicKey,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      Buffer.from(info)
    ).toString("hex");
  }
}
