import { Dispatch, SetStateAction } from "react";

export type User = {
  userid: number;
  username: string;
  email: string;
  description: string;

  image: string;
};

export type UserSignUp = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export type UserSignIn = {
  username: string;
  password: string;
};

export interface Image {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}

export type SearchBarUser = {
  name: string;
  followedby: string;
  image: string | null;
  userid: number;
  username: string;
  isfollowing: string;
};

export type FollowerOrFollowing = {
  userid: number;
  username: string;
  name: string;
  image: string | null;
};
