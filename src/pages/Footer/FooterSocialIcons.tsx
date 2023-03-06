import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function FooterSocialIcons() {
  return (
    <div
      style={{ opacity: 0.95, background: "#2C3531" }}
      className="flex justify-center items-center py-3 text-l text-white w-100"
    >
      <FontAwesomeIcon
        icon={faFacebookF}
        className="px-3 text-xl cursor-pointer"
      />
      <FontAwesomeIcon
        icon={faInstagram}
        className="px-3 text-xl cursor-pointer"
      />
      <FontAwesomeIcon
        icon={faTwitter}
        className="px-3 text-xl cursor-pointer"
      />
      <FontAwesomeIcon
        icon={faTiktok}
        className="px-3 text-xl cursor-pointer"
      />
    </div>
  );
}
