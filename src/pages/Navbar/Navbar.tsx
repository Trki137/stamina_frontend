import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { User } from "../../@types/UserType";
import { navItem } from "../../@types/NavbarType";
import NavbarItems from "./NavbarItems";

export default function Navbar() {
  const [user, setUser] = useState<null | User>(null);
  const [menuMobile, setMenuMobile] = useState<boolean>(false);
  const navItems: navItem[] = [
    {
      name: "home",
      link: "/",
      visible: ["ALL"],
    },
    {
      name: "my data",
      link: "/mydata",
      visible: ["SIGNED_IN"],
    },
    {
      name: "exercise",
      link: "/exercise",
      visible: ["SIGNED_IN"],
    },
    {
      name: "events",
      link: "/events",
      visible: ["SIGNED_IN"],
    },
  ];

  const filterNavItems = () => {
    return navItems.filter((item) => {
      if (item.visible.includes("ALL")) return item;
      if (user && item.visible.includes("SIGNED_IN")) return item;
    });
  };

  const handleMenuMobile = () =>
    setMenuMobile((prevMenuMobile) => !prevMenuMobile);

  useEffect(() => {
    const obj = localStorage.getItem("staminaUser");
    setUser(obj === null ? obj : JSON.parse(obj));
  }, [user]);
  return (
    <nav className="flex flex-row-reverse justify-between text-center bg-[#2C3531] w-full h-16 sm:flex-row">
      <div className="hidden px-3 h-full  items-center sm:flex">
        <ul className="flex w-auto">
          {filterNavItems().map((navItem) => (
            <NavbarItems mobileVersion={false} navItem={navItem} />
          ))}
        </ul>
      </div>
      <div className="flex items-center h-full px-3">
        {user && (
          <FontAwesomeIcon
            className="text-white px-2 text-[20px] cursor-pointer"
            icon={faSearch}
          />
        )}
        <FontAwesomeIcon
          className="text-white px-2 text-[20px] cursor-pointer"
          icon={faUserCircle}
        />
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
            ? "fixed w-full top-16 ease-in-out duration-[350ms] sm:hidden"
            : "fixed w-full top-[-100%] sm:hidden"
        }
      >
        <ul className="flex flex-col w-auto bg-[#2C3531]">
          {filterNavItems().map((navItem) => (
            <NavbarItems mobileVersion={true} navItem={navItem} />
          ))}
        </ul>
      </div>
    </nav>
  );
}
