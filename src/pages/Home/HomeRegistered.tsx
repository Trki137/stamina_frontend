import React from "react";
import HomeCard from "./HomeCard";
import { cardInfoArray } from "../../constants/CardInfo";
import { routes } from "../../api/paths";
import Banner from "./Banner";

export default function HomeRegistered() {
  return (
    <div className="w-full min-h-max flex flex-col items-center">
      <div className="relative w-full h-full" style={{ minHeight: "450px" }}>
        <Banner
          text="Challenge yourself by accepting others challenge or even better create your own"
          btnText="Go to events"
          address={routes.events}
          image="bannerRegistered.jpg"
        />
      </div>
      <div className=" py-8 w-full flex flex-col items-center justify-center sm:h-max-52 md:flex md:flex-row md:justify-evenly">
        {cardInfoArray.map((cardInfo) => (
          <HomeCard key={cardInfo.title} cardInfo={cardInfo} />
        ))}
      </div>
    </div>
  );
}
