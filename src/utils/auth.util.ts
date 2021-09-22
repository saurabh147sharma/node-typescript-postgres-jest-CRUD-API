import bcrypt from "bcrypt";

export default class AuthUtil {
  private static saltRounds = 9;

  constructor() {}

  public static async getHashedPassword(plainPassword: string): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(plainPassword, AuthUtil.saltRounds);
      return hashedPassword;
    } catch (error) {
      console.log("Error while hashing password", error);
      throw error;
    }
  }

  public static async comparePassword(inputPasssword: string, dbPassword: string): Promise<boolean> {
    try {
      const result = await bcrypt.compare(inputPasssword, dbPassword);
      return result;
    } catch (error) {
      console.log("Error while hashing password", error);
      throw error;
    }
  }
}
