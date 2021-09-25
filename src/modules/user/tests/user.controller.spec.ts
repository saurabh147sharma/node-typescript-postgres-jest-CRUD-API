import * as httpMocks from "node-mocks-http";
import UserController from "../user.controller";
import UserService from "../user.service";
import {
  createUserRequestBody,
  createUserInvalidRequestBody,
  updateUserRequestBody,
  updateUserInvalidRequestBody,
  expectedUserListResponseFromService,
  expectedUserDetailResponseFromService,
} from "./user.controller.spec.data";

describe("Create user", () => {
  test("Should return 400 if any validation error", async () => {
    for (const body of createUserInvalidRequestBody) {
      let request = httpMocks.createRequest({
        body,
      });
      let expectedResponseMessage = "Validation Error!";
      let response = httpMocks.createResponse();
      await UserController.create(request, response);
      expect(response._getStatusCode()).toEqual(400);
      expect(response._getData().message).toEqual(expectedResponseMessage);
    }
  });

  test("Should return 500 if any error occured while creating a new user", async () => {
    let request = httpMocks.createRequest({
      body: createUserRequestBody,
    });
    let response = httpMocks.createResponse();
    UserService.createUser = jest.fn().mockRejectedValueOnce(new Error("Something went wrong"));
    jest.spyOn(UserService, "createUser");
    await UserController.create(request, response);
    expect(UserService.createUser).toHaveBeenCalledTimes(1);
    expect(UserService.createUser).toHaveBeenCalledWith(createUserRequestBody);

    expect(response._getStatusCode()).toEqual(500);
  });

  test("Should create a new user and return 200 status code", async () => {
    let expectedResponseFromService = 2;
    let request = httpMocks.createRequest({
      body: createUserRequestBody,
    });
    let response = httpMocks.createResponse();
    UserService.createUser = jest.fn().mockResolvedValue(expectedResponseFromService);
    jest.spyOn(UserService, "createUser");
    await UserController.create(request, response);
    expect(UserService.createUser).toHaveBeenCalledTimes(1);
    expect(UserService.createUser).toHaveBeenCalledWith(createUserRequestBody);
    expect(response._getStatusCode()).toEqual(200);
    expect(response._getData()).toEqual({
      message: "User created successfully",
    });
  });
});

describe("Update user", () => {
  test("Should return 400 if any validation error", async () => {
    for (const body of updateUserInvalidRequestBody) {
      let request = httpMocks.createRequest({
        body,
      });
      let expectedResponseMessage = "Validation Error!";
      let response = httpMocks.createResponse();
      await UserController.update(request, response);
      expect(response._getStatusCode()).toEqual(400);
      expect(response._getData().message).toEqual(expectedResponseMessage);
    }
  });
  test("Should return 500 if any error while updating a user", async () => {
    let userId = 61;
    let request = httpMocks.createRequest({
      body: updateUserRequestBody,
      params: {
        id: userId,
      },
    });
    let response = httpMocks.createResponse();
    UserService.updateUser = jest.fn().mockRejectedValueOnce(new Error("Something went wrong"));
    jest.spyOn(UserService, "updateUser");
    await UserController.update(request, response);
    expect(UserService.updateUser).toHaveBeenCalledTimes(1);
    expect(UserService.updateUser).toHaveBeenCalledWith({ match: { id: userId }, data: updateUserRequestBody });

    expect(response._getStatusCode()).toEqual(500);
  });
  test("Should return 200 status code if user updated successfully", async () => {
    let userId = 61;
    let request = httpMocks.createRequest({
      body: updateUserRequestBody,
      params: {
        id: userId,
      },
    });
    let response = httpMocks.createResponse();
    let expectedResponseFromService = [1];
    UserService.updateUser = jest.fn().mockResolvedValueOnce(expectedResponseFromService);
    jest.spyOn(UserService, "updateUser");
    await UserController.update(request, response);
    expect(UserService.updateUser).toHaveBeenCalledTimes(1);
    expect(UserService.updateUser).toHaveBeenCalledWith({ match: { id: userId }, data: updateUserRequestBody });
    expect(response._getStatusCode()).toEqual(200);
    expect(response._getData()).toEqual({
      message: "User updated successfully",
    });
  });
});

describe("Delete user", () => {
  test("Should return 400 if any validation error", async () => {
    let request = httpMocks.createRequest({
      params: {
        name: "Saurabh",
      },
    });
    let expectedResponseMessage = "Validation Error!";
    let response = httpMocks.createResponse();
    await UserController.delete(request, response);
    expect(response._getStatusCode()).toEqual(400);
    expect(response._getData().message).toEqual(expectedResponseMessage);
  });

  test("Should return 500 if any error while deleting a user", async () => {
    let userId = 61;
    let request = httpMocks.createRequest({
      params: {
        id: userId,
      },
    });
    let response = httpMocks.createResponse();
    UserService.destroyUser = jest.fn().mockRejectedValueOnce(new Error("Something went wrong"));
    jest.spyOn(UserService, "destroyUser");
    await UserController.delete(request, response);
    expect(UserService.destroyUser).toHaveBeenCalledTimes(1);
    expect(UserService.destroyUser).toHaveBeenCalledWith({ id: userId });
    expect(response._getStatusCode()).toEqual(500);
  });

  test("Should return 200 status code if user deleted successfully", async () => {
    let userId = 61;
    let request = httpMocks.createRequest({
      params: {
        id: userId,
      },
    });
    let response = httpMocks.createResponse();
    let expectedResponseFromService = 0;
    UserService.destroyUser = jest.fn().mockResolvedValueOnce(expectedResponseFromService);
    jest.spyOn(UserService, "destroyUser");
    await UserController.delete(request, response);
    expect(UserService.destroyUser).toHaveBeenCalledTimes(1);
    expect(UserService.destroyUser).toHaveBeenCalledWith({ id: userId });
    expect(response._getStatusCode()).toEqual(200);
    expect(response._getData()).toEqual({
      message: "User deleted successfully",
    });
  });
});

describe("Get users list", () => {
  test("Should return 200 status code if get users list successfully", async () => {
    let limit = 10;
    let page = 1;
    let offset = (page - 1) * limit;
    let request = httpMocks.createRequest({
      query: {
        page,
        limit,
      },
    });
    let response = httpMocks.createResponse();
    UserService.getUsers = jest.fn().mockResolvedValueOnce(expectedUserListResponseFromService);
    jest.spyOn(UserService, "getUsers");
    await UserController.findAll(request, response);
    expect(UserService.getUsers).toHaveBeenCalledTimes(1);
    expect(UserService.getUsers).toHaveBeenCalledWith({ offset, limit });
    expect(response._getStatusCode()).toEqual(200);
    expect(response._getData()).toEqual({
      data: expectedUserListResponseFromService,
    });
  });

  test("Should return 500 if any error while fetching users", async () => {
    let limit = 10;
    let page = 1;
    let offset = (page - 1) * limit;
    let request = httpMocks.createRequest({
      query: {
        page,
        limit,
      },
    });
    let response = httpMocks.createResponse();
    UserService.getUsers = jest.fn().mockRejectedValueOnce(new Error("Something went wrong"));
    jest.spyOn(UserService, "getUsers");
    await UserController.findAll(request, response);
    expect(UserService.getUsers).toHaveBeenCalledTimes(1);
    expect(UserService.getUsers).toHaveBeenCalledWith({ offset, limit });
    expect(response._getStatusCode()).toEqual(500);
  });
});

describe("Get user detail", () => {
  test("Should return 400 if any validation error", async () => {
    let request = httpMocks.createRequest({
      params: {
        name: "Saurabh",
      },
    });
    let expectedResponseMessage = "Validation Error!";
    let response = httpMocks.createResponse();
    await UserController.findOne(request, response);
    expect(response._getStatusCode()).toEqual(400);
    expect(response._getData().message).toEqual(expectedResponseMessage);
  });

  test("Should return 500 if any error while fetching user detail", async () => {
    let userId = 61;
    let request = httpMocks.createRequest({
      params: {
        id: userId,
      },
    });
    let response = httpMocks.createResponse();
    UserService.getUserDetail = jest.fn().mockRejectedValueOnce(new Error("Something went wrong"));
    jest.spyOn(UserService, "getUserDetail");
    await UserController.findOne(request, response);
    expect(UserService.getUserDetail).toHaveBeenCalledTimes(1);
    expect(UserService.getUserDetail).toHaveBeenCalledWith({ match: { id: userId } });
    expect(response._getStatusCode()).toEqual(500);
  });

  test("Should return 200 status code if no error in fetching user detail", async () => {
    let userId = 61;
    let request = httpMocks.createRequest({
      params: {
        id: userId,
      },
    });
    let response = httpMocks.createResponse();
    UserService.getUserDetail = jest.fn().mockResolvedValueOnce(expectedUserDetailResponseFromService);
    jest.spyOn(UserService, "getUserDetail");
    await UserController.findOne(request, response);
    expect(UserService.getUserDetail).toHaveBeenCalledTimes(1);
    expect(UserService.getUserDetail).toHaveBeenCalledWith({ match: { id: userId } });
    expect(response._getStatusCode()).toEqual(200);
    expect(response._getData()).toEqual({
      data: expectedUserDetailResponseFromService,
    });
  });
});
