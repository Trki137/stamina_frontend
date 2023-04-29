import React from "react";
import { CardEventType } from "../../@types/EventType";
import ProfileButton from "../Button/ProfileButton";

type EventCardType = {
  cardInfo: CardEventType;
};

export default function EventCard({ cardInfo }: EventCardType) {
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
          {cardInfo.createdby}
        </h5>
        <span className="text-sm text-[#917543]">{cardInfo.name}</span>
        <div className="text-left mt-6 space-y-3">
          <p>Description: {cardInfo.description}</p>
          <p>
            Location: {cardInfo.location.city}, {cardInfo.location.address}
          </p>
          <p>Time: {cardInfo.startsAt} h</p>
          <p>Remaining spots: {cardInfo.remainingSpace}</p>
        </div>
        <div className="flex mt-4 w-full">
          <ProfileButton
            text={"Join"}
            disabled={cardInfo.remainingSpace === 0}
          />
        </div>
      </div>
    </div>
  );
}
