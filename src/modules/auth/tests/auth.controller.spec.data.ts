export const userLoginInvalidRequestBody = [
  {
    email: "Test User2",
    password: "1234",
  },
  {
    email: "testuser2@gmail.com",
    password: "1",
  },
  {
    email: "testuser2@gmail.com"
  },
  {
    password:"1234"
  }
];

export const userLoginRequest = {
  email: "testuser2@gmail.com",
  password: "1234",
};

export const expectedUserDetailResponseFromService = {
  id: 56,
  name: "Test User1",
  email: "testuser1@gmail.com",
  password: "$2b$09$BOmIGSq8lrSYL4hQ18lxr.ZVx8sbrs4ugfIapERc2AwT1ZrJcMurG"
};