import React from "react";
import ButtonLink from "../../components/Button/ButtonLink";
import { routes } from "../../api/paths";

export default function HomeNotRegistered() {
  return (
    <section className="relative w-full ">
      <div className="z-20 flex items-center justify-end relative h-full text-white container mx-auto">
        <div className="max-w-sm flex flex-col justify-items items-center">
          <p className="leading-normal text-center mb-3">
            The mind is the most important part of achieving any fitness goal.
            Mental change always comes before physical change
          </p>
          <div className="w-3/4">
            <ButtonLink text={"Get Started"} address={routes.signUp} />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 h-auto z-10">
        <img
          src={process.env.PUBLIC_URL + "/images/BannerNotRegistered.jpg"}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
