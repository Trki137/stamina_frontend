import React, { Dispatch, SetStateAction, useState } from "react";
import { CardEventType, JoinUnJoinEventType } from "../../@types/EventType";
import ProfileButton from "../Button/ProfileButton";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import CreateEventModal from "../../pages/Events/CreateEventModal";

type EventCardType = {
  cardInfo: CardEventType;
  setAllEvents: Dispatch<SetStateAction<CardEventType[]>>;
  profile: boolean;
};

export default function EventCard({
  cardInfo,
  setAllEvents,
  profile,
}: EventCardType) {
  const [disappear, setDisappear] = useState<boolean>(false);
  const [updateActive, setUpdateActive] = useState<boolean>(false);
  const active = new Date(cardInfo.startsat).getTime() > new Date().getTime();

  const className = disappear
    ? "relative opacity-0 transition-all ease-in-out duration-[1000ms]"
    : !active
    ? "relative mx-auto w-full max-w-sm bg-white opacity-60 border border-gray-200 rounded-lg shadow px-5"
    : "relative mx-auto w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow px-5";

  const user = localStorage.getItem("staminaUser");
  let canAccess = false;
  if (user) {
    const username = JSON.parse(user).username;
    canAccess = username === cardInfo.createdby;
  }

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

  const handleCancel = (id: number) => {
    const user = localStorage.getItem("staminaUser");
    if (!user) return;

    const userId = JSON.parse(user).userid;
    const data: JoinUnJoinEventType = {
      userId,
      eventId: id,
    };

    axios
      .delete(backend_paths.EVENT, {
        data,
      })
      .then((res) => {
        setDisappear(true);
        setTimeout(
          () =>
            setAllEvents((prevAllChallenges) => {
              const newAllEvents = [];

              for (let i = 0; i < prevAllChallenges.length; i++) {
                if (prevAllChallenges[i].id === cardInfo.id) continue;
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
    <React.Fragment>
      {profile && updateActive && (
        <CreateEventModal
          setActive={setUpdateActive}
          setAllEvents={setAllEvents}
          oldData={cardInfo}
        />
      )}
      <div className={className}>
        {profile && canAccess && active && (
          <FontAwesomeIcon
            icon={faPencil}
            onClick={() => setUpdateActive(true)}
            className="absolute right-3 top-2 text-green-700 cursor-pointer"
          />
        )}
        <div className="flex flex-col items-center justify-end pb-10 pt-5">
          {cardInfo.image && (
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={
                cardInfo.image.startsWith("http")
                  ? cardInfo.image
                  : `data:image/jpeg;base64,${cardInfo.image}`
              }
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
            {!profile && (
              <ProfileButton
                text={"Join"}
                disabled={cardInfo.remainingspace === 0}
                handleClick={() => handleJoin(cardInfo.id)}
              />
            )}
            {profile && canAccess && active && (
              <ProfileButton
                text={"Cancel"}
                handleClick={() => handleCancel(cardInfo.id)}
              />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
