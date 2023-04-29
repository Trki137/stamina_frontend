import React from "react";
import { CardChallengeType } from "../../@types/EventType";
import ProfileButton from "../Button/ProfileButton";

type ChallengeCardType = {
  cardInfo: CardChallengeType;
};

export default function ChallengeCard({ cardInfo }: ChallengeCardType) {
  return (
    <div className="mx-auto w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow px-5">
      <div className="flex flex-col items-center justify-end pb-10 pt-5">
        {cardInfo.image && (
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={process.env.PUBLIC_URL + cardInfo.image}
            alt="No image"
          />
        )}
        <h5 className="mb-1 text-xl font-medium text-gray-900">
          {cardInfo.createdBy}
        </h5>
        <span className="text-sm text-[#917543]">{cardInfo.name}</span>
        <div className="text-left mt-6 space-y-3">
          <p>Description: {cardInfo.description}</p>
          <p>Equipment: {cardInfo.equipment} h</p>
          <p>Challenge active: {cardInfo.until}</p>
        </div>
        <div className="flex mt-4 w-full">
          <ProfileButton text={"Join"} />
        </div>
      </div>
    </div>
  );
}
