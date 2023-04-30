import React, { Dispatch, SetStateAction, useState } from "react";
import { CardChallengeType, JoinUnJoinEventType } from "../../@types/EventType";
import ProfileButton from "../Button/ProfileButton";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";

type ChallengeCardType = {
  cardInfo: CardChallengeType;
  setAllChallenges: Dispatch<SetStateAction<CardChallengeType[]>>;
};

export default function ChallengeCard({
  cardInfo,
  setAllChallenges,
}: ChallengeCardType) {
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
            setAllChallenges((prevAllChallenges) => {
              const newAllEvents = [];

              for (let i = 0; i < prevAllChallenges.length; i++) {
                if (prevAllChallenges[i].id === eventId) continue;
                newAllEvents.push(prevAllChallenges[i]);
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
            Equipment:{" "}
            {cardInfo.equipment?.length > 0 ? cardInfo.equipment : "None"}
          </p>
          <p>Challenge active: {cardInfo.until}</p>
        </div>
        <div className="flex mt-4 w-full">
          <ProfileButton
            text={"Join"}
            handleClick={() => handleJoin(cardInfo.id)}
          />
        </div>
      </div>
    </div>
  );
}
