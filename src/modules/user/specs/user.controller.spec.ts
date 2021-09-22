import { Request, Response } from "express";
import UserController from "../user.controller";

describe("Get users", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let response = {};

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      statusCode: 0,
      send: jest.fn().mockImplementation((result) => {
        response = result;
      }),
    };
  });

  test("Users list", () => {
    const expectedStatusCode = 200;
    const expectedResponse = {
      users: [
        {
          name: "Saurabh",
          age: 30,
        },
        {
          name: "Gaurav",
          age: 25,
        },
      ],
    };

    UserController.findAll(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.statusCode).toBe(expectedStatusCode);
    expect(response).toEqual(expectedResponse);
  });
});
