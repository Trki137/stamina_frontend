import React, { Dispatch, SetStateAction, useState } from "react";
import { CardEventType, JoinUnJoinEventType } from "../../@types/EventType";
import ProfileButton from "../Button/ProfileButton";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";

type EventCardType = {
  cardInfo: CardEventType;
  setAllEvents: Dispatch<SetStateAction<CardEventType[]>>;
};

export default function EventCard({ cardInfo, setAllEvents }: EventCardType) {
  const [disappear, setDisappear] = useState<boolean>(false);

  const className = disappear
    ? "opacity-0 transition-all ease-in-out duration-[1000ms]"
    : "mx-auto w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow px-5";

  const handleJoin = (eventId: number) => {
    const user = localStorage.getItem("staminaUser");
    if (!user) return;

    const userId = JSON.parse(user).userid;
    const data: JoinUnJoinEventType = {
      userId,
      eventId,
    };

    axios
      .post(backend_paths.EVENT, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setDisappear(true);
        setTimeout(
          () =>
            setAllEvents((prevAllEvents) => {
              const newAllEvents = [];

              for (let i = 0; i < prevAllEvents.length; i++) {
                if (prevAllEvents[i].id === eventId) continue;
                newAllEvents.push(prevAllEvents[i]);
              }

              return newAllEvents;
            }),
          1500
        );
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className={className}>
      <div className="flex flex-col items-center justify-end pb-10 pt-5">
        {cardInfo.image && (
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={`data:image/jpeg;base64,${cardInfo.image}`}
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
            Location: {cardInfo.city}, {cardInfo.address}
          </p>
          <p>Time: {cardInfo.startsat} h</p>
          <p>Remaining spots: {cardInfo.remainingspace}</p>
        </div>
        <div className="flex mt-4 w-full">
          <ProfileButton
            text={"Join"}
            disabled={cardInfo.remainingspace === 0}
            handleClick={() => handleJoin(cardInfo.id)}
          />
        </div>
      </div>
    </div>
  );
}
