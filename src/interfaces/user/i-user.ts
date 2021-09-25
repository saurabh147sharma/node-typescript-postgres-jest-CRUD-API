enum Gender{
  'Male',
  'Female',
  'Other'
}

export interface ICreateUser {
  id?: number;
  name: string;
  email: string;
  gender: Gender;
  password: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  gender: Gender;
  password: string;
}
