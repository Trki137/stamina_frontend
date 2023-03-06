import React from "react";
import FooterSocialIcons from "./FooterSocialIcons";
import FooterCopyright from "./FooterCopyright";

export default function Footer() {
  return (
    <footer className="flex flex-col w-100 h-min mt-auto">
      <FooterSocialIcons />
      <FooterCopyright />
    </footer>
  );
}
