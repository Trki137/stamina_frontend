export type User = {
  id: number;
  username: string;
  email: string;
  description: string;

  image: string;
};

export type UserSignUp = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export type UserSignIn = {
  username: string;
  password: string;
};
