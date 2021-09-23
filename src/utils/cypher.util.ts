import * as crypto from "crypto";

export default class CypherUtil {
  private static ALGORITHM = "aes-256-ctr";
  private static ENCRYPTION_KEY = crypto.randomBytes(32);
  private static INIT_VECTOR = crypto.randomBytes(16);

  constructor() {}

  public static encrypt(text: any): string {
    try {
      text = text.toString();
      const cipher = crypto.createCipheriv(CypherUtil.ALGORITHM, CypherUtil.ENCRYPTION_KEY, CypherUtil.INIT_VECTOR);
      let encryptedData = cipher.update(text, "utf-8", "hex");
      return encryptedData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public static decrypt(encryptedData: any): string {
    try {
      const decipher = crypto.createDecipheriv(CypherUtil.ALGORITHM, CypherUtil.ENCRYPTION_KEY, CypherUtil.INIT_VECTOR);
      let decryptedData = decipher.update(encryptedData, "utf-8", "hex");
      return decryptedData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
