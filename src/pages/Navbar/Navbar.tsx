import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { User } from "../../@types/UserType";
import { navItem } from "../../@types/NavbarType";
import NavItems from "./NavItems";
import MobileNavItem from "./MobileNavItem";
import { routes } from "../../api/paths";

type NavbarType = {
  handleSearchActiveChange: () => void;
  userSetter: Dispatch<SetStateAction<boolean>>;
  userBoolean: boolean;
};

export default function Navbar({
  handleSearchActiveChange,
  userSetter,
  userBoolean,
}: NavbarType) {
  const [user, setUser] = useState<null | User>(null);
  const [menuMobile, setMenuMobile] = useState<boolean>(false);
  const [userMenuActive, setUserMenuActive] = useState<boolean>(false);

  const navItems: navItem[] = [
    {
      name: "home",
      link: routes.home,
      visible: ["ALL"],
    },
    {
      name: "my data",
      link: routes.myData,
      visible: ["SIGNED_IN"],
    },
    {
      name: "exercise",
      link: routes.workout,
      visible: ["SIGNED_IN"],
    },
    {
      name: "events",
      link: routes.events,
      visible: ["SIGNED_IN"],
    },
  ];

  let userNavItems: navItem[] = [
    {
      name: "Sign in",
      link: routes.signIn,
      visible: ["NOT_SIGNED_IN"],
    },
    {
      name: "Sign up",
      link: routes.signUp,
      visible: ["NOT_SIGNED_IN"],
    },
    {
      name: "Profile",
      link: `${routes.profile}/${user?.userid}`,
      visible: ["SIGNED_IN"],
    },
    {
      name: "Sign out",
      link: "/",
      visible: ["SIGNED_IN"],
    },
  ];

  const filterNavItems = () => {
    return navItems.filter((item) => {
      if (item.visible.includes("ALL")) return item;
      if (user && item.visible.includes("SIGNED_IN")) return item;
      return false;
    });
  };

  const filterUserNavItems = () => {
    return userNavItems.filter((item) => {
      if (!user && item.visible.includes("NOT_SIGNED_IN")) return item;
      if (user && item.visible.includes("SIGNED_IN")) return item;
      return false;
    });
  };

  const getImage = () => {
    if (user) {
      if (user.image.startsWith("http")) {
        return user.image;
      } else return `data:image/jpeg;base64,${user.image}`;
    }
  };

  const handleMenuMobile = () =>
    setMenuMobile((prevMenuMobile) => !prevMenuMobile);

  const handleUserIcon = () =>
    setUserMenuActive((prevUserMenuActive) => !prevUserMenuActive);

  useEffect(() => {
    const obj = localStorage.getItem("staminaUser");
    if (obj === null) {
      setUser(null);
      return;
    }
    const user: User = JSON.parse(obj);
    setUser(user);
    if (navItems[2].link.includes("undefined"))
      navItems[2].link = `${routes.profile}/${user.userid}`;
  }, [userBoolean]);

  return (
    <nav className="relative flex flex-row-reverse justify-between text-center bg-[#2C3531] w-full h-16 sm:flex-row">
      <div className="hidden px-3 h-full items-center sm:flex">
        <ul className="flex w-auto">
          {filterNavItems().map((navItem) => (
            <NavItems
              key={navItem.name}
              mobileVersion={false}
              navItem={navItem}
            />
          ))}
        </ul>
      </div>
      <div className="flex items-center h-full px-3">
        {user && (
          <FontAwesomeIcon
            className="text-white px-2 text-[20px] cursor-pointer"
            icon={faSearch}
            onClick={handleSearchActiveChange}
          />
        )}

        {!user && (
          <FontAwesomeIcon
            className="text-white px-2 text-[20px] cursor-pointer"
            icon={faUserCircle}
            onClick={handleUserIcon}
          />
        )}
        {user && !user.image && (
          <FontAwesomeIcon
            className="text-white px-2 text-[20px] cursor-pointer"
            icon={faUserCircle}
            onClick={handleUserIcon}
          />
        )}
        {user && user?.image && (
          <img
            className="w-6 h-6 rounded-full cursor-pointer"
            src={getImage()}
            alt="Something went wrong"
            onClick={handleUserIcon}
          />
        )}
        {menuMobile ? (
          <FontAwesomeIcon
            className="text-white px-2 text-[20px] cursor-pointer sm:hidden"
            icon={faXmark}
            onClick={handleMenuMobile}
          />
        ) : (
          <FontAwesomeIcon
            className="text-white px-2 text-[20px] cursor-pointer sm:hidden"
            icon={faBars}
            onClick={handleMenuMobile}
          />
        )}
      </div>

      <div
        className={
          menuMobile
            ? "fixed w-full z-40 top-16 ease-in-out duration-[350ms] sm:hidden"
            : "fixed w-full top-[-100%] sm:hidden"
        }
      >
        <ul className="flex flex-col w-auto bg-[#2C3531]">
          {filterNavItems().map((navItem) => (
            <NavItems
              key={navItem.name}
              mobileVersion={true}
              navItem={navItem}
            />
          ))}
        </ul>
      </div>

      {userMenuActive && (
        <div className="z-40 absolute right-10 top-[30px] my-4 h-min text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow sm:right-2.5">
          <ul className="py-2">
            {filterUserNavItems().map((navItem) => (
              <MobileNavItem
                setUser={userSetter}
                key={navItem.name}
                navItem={navItem}
              />
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
