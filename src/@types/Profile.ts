export type ProfileInfoType = {
  username: string;
  email: string;
  description: string | null;
  image: string | null;
  name: string;
  numoffollowers: string;
  numoffollowing: string;
  isfollowing: boolean;
};

export type ProfileUpdateType = {
  firstname: string;
  lastname: string;
  email: string;
  description: string;
  username: string;
};
