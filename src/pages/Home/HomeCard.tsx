import React from "react";
import { CardInfoType } from "../../@types/HomeCardType";
import ButtonLink from "../../components/Button/ButtonLink";

type HomeCardType = {
  cardInfo: CardInfoType;
};

export default function HomeCard({ cardInfo }: HomeCardType) {
  return (
    <div className="mx-auto w-full max-w-xl p-10 shadow-lg rounded-lg mt-3 mb-3 md:m-0 md:max-w-[300px] lg:max-w-[400px]">
      <h1 className="mb-4  text-lg font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl">
        {cardInfo.title}
      </h1>
      <p>{cardInfo.bodyText}</p>
      <div className="w-full  mx-auto pt-5">
        <ButtonLink text={cardInfo.btnText} address={cardInfo.address} />
      </div>
    </div>
  );
}
