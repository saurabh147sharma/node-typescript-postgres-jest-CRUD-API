export const createUserRequestBody = {
  name: "Test User2",
  email: "testuser2@gmail.com",
  gender: "Female",
  password: "1234",
};

export const createUserInvalidRequestBody = [
  {
    name: "Test User2",
    email: "testuser2@gmail.com",
  },
  {
    name: "Test User2",
    password: "1234",
  },
  {
    email: "testuser2@gmail.com",
    password: "1234",
  },
];

export const updateUserInvalidRequestBody = [
  {
    name: "Test User2",
    password: "1234",
  },
  {
    gender: "Male",
    name: "Test User",
  },
];

export const updateUserRequestBody = {
  name: "Test User2",
  email: "testuser2@gmail.com",
};

export const expectedUserListResponseFromService = [
  {
    id: 1,
    name: "Saurabh Kumar",
    email: "saurabh.kumar2@tothenew.com",
    gender: "Male",
  },
  {
    id: 3,
    name: "Saurabh",
    email: "saurabh.kumar3@tothenew.com",
    gender: "Male",
  },
];

export const expectedUserDetailResponseFromService = {
  id: 56,
  name: "Test User1",
  email: "testuser1@gmail.com",
};
