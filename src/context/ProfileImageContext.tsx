import React, { createContext, useState } from "react";
import { Image } from "../@types/UserType";

export const ProfileImageContext = createContext<null | Image>(null);

type UsersProp = {
  children: React.ReactNode;
};

export default function ProfileImageProvider({ children }: UsersProp) {
  const [image, setImage] = useState<string>("");

  const value = {
    image,
    setImage,
  };

  return (
    <ProfileImageContext.Provider value={value}>
      {children}
    </ProfileImageContext.Provider>
  );
}
