import AuthUtil from "../../../utils/auth.util";
import { UserModel } from "../../../models/user.model";
import { createUserRequestBody } from "./user.controller.spec.data";

describe("Create User", () => {
  test("Should get hashed password", async () => {
    let userPassword = "1234";
    let expectedHashedPassword = "$2b$09$BOmIGSq8lrSYL4hQ18lxr.ZVx8sbrs4ugfIapERc2AwT1ZrJcMurG";
    AuthUtil.getHashedPassword = jest.fn().mockResolvedValue(expectedHashedPassword);
    jest.spyOn(AuthUtil, "getHashedPassword");
    const response = await AuthUtil.getHashedPassword(userPassword);
    expect(AuthUtil.getHashedPassword).toHaveBeenCalledTimes(1);
    expect(AuthUtil.getHashedPassword).toHaveBeenCalledWith(userPassword);
    expect(response).toEqual(expectedHashedPassword);
  });
  test("Should return user object if user created successfullly", async () => {
    let expectedResponse = {
      createdAt: "2021-09-25T20:41:52.270Z",
      updatedAt: "2021-09-26",
      id: 62,
      name: "Jay Bhardwaj",
      email: "jay2020@gmail.com",
      password: "$2b$09$OSwp9Kln6tY3LGQ.OR0ckutWzPwibBUGFYHkTgRiUp7Ym6J6m0pCS",
      gender: "Male",
    };
    createUserRequestBody.password = "$2b$09$OSwp9Kln6tY3LGQ.OR0ckutWzPwibBUGFYHkTgRiUp7Ym6J6m0pCS";
    UserModel.create = jest.fn().mockResolvedValue(expectedResponse);
    jest.spyOn(UserModel, "create");
    const response = await UserModel.create(createUserRequestBody);
    expect(UserModel.create).toHaveBeenCalledTimes(1);
    expect(UserModel.create).toHaveBeenCalledWith(createUserRequestBody);
    expect(response).toEqual(expectedResponse);
  });
  test("Should throw error if service fails to create the user", async () => {
    UserModel.create = jest.fn().mockRejectedValueOnce(new Error("Something went wrong"));
    jest.spyOn(UserModel, "create");
    await expect(UserModel.create(createUserRequestBody)).rejects.toThrow("Something went wrong");
    expect(UserModel.create).toHaveBeenCalledTimes(1);
    expect(UserModel.create).toHaveBeenCalledWith(createUserRequestBody);
  });
});
