import React from "react";

type SidebarType = {
  children: React.ReactNode;
  sidebarActive: boolean;
};

export default function Sidebar({ children, sidebarActive }: SidebarType) {
  const sidebarClass = sidebarActive
    ? "fixed rounded-tl-xl rounded-bl-xl shadow-xl right-0 bg-white  translate-x-0 z-[100] min-w-[350px] border border-gray-200 w-1/4 h-full linear duration-[350ms]"
    : "fixed rounded-tl-xl rounded-bl-xl shadow-xl top-0 right-0  translate-x-full bg-white z-[100] min-w-[350px] border border-gray-200 w-1/4 h-full linear duration-[350ms]";

  return (
    <React.Fragment>
      <div className={sidebarClass}>{children}</div>
    </React.Fragment>
  );
}
