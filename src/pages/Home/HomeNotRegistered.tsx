import React from "react";
import { routes } from "../../api/paths";
import Banner from "./Banner";

export default function HomeNotRegistered() {
  return (
    <div className="relative w-full ">
      <Banner
        text="The mind is the most important part of achieving any fitness goal.Mental change always comes before physical change"
        btnText="Get Started"
        address={routes.signUp}
        image={"BannerNotRegistered.jpg"}
      />
    </div>
  );
}
