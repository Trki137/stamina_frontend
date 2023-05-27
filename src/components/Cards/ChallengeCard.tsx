import React, { Dispatch, SetStateAction, useState } from "react";
import { CardChallengeType, JoinUnJoinEventType } from "../../@types/EventType";
import ProfileButton from "../Button/ProfileButton";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";
import FailTag from "../../pages/Profile/FailTag";
import SuccessTag from "../../pages/Profile/SuccessTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import CreateChallengeModal from "../../pages/Events/CreateChallengeModal";
import { useParams } from "react-router-dom";

type ChallengeCardType = {
  cardInfo: CardChallengeType;
  setAllChallenges: Dispatch<SetStateAction<CardChallengeType[]>>;
  profile: boolean;
};

export default function ChallengeCard({
  cardInfo,
  setAllChallenges,
  profile,
}: ChallengeCardType) {
  const { id } = useParams();
  const [disappear, setDisappear] = useState<boolean>(false);
  const [updateActive, setUpdateActive] = useState<boolean>(false);

  const dateFormatted =
    cardInfo.until.split(".")[1] +
    "." +
    cardInfo.until.split(".")[0] +
    "." +
    cardInfo.until.split(".")[2];

  const user = localStorage.getItem("staminaUser");

  let canAccess = false;
  let canCancel = false;
  if (user) {
    const username = JSON.parse(user).username;
    const userid = JSON.parse(user).userid;
    canAccess = username === cardInfo.createdby;
    canCancel = id == userid;
  }

  const active = dayjs(new Date()).diff(dayjs(dateFormatted), "days") <= 0;

  const className = disappear
    ? "relative opacity-0 transition-all ease-in-out duration-[1000ms]"
    : cardInfo.finished || !active
    ? "relative mx-auto w-full max-w-sm bg-white opacity-60 border border-gray-200 rounded-lg shadow px-5"
    : "relative mx-auto w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow px-5";

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
            setAllChallenges((prevAllChallenges) => {
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

  const handleFinishChallenge = (id: number) => {
    const user = localStorage.getItem("staminaUser");
    if (!user) return;

    const userId = JSON.parse(user).userid;
    const data: JoinUnJoinEventType = {
      userId,
      eventId: id,
    };
    axios
      .put(backend_paths.EVENT, data)
      .then((res) =>
        setAllChallenges((prevChallenge) =>
          prevChallenge.map((c) =>
            c.id === id
              ? {
                  ...c,
                  finished: true,
                }
              : c
          )
        )
      )
      .catch((e) => console.log(e));
  };

  return (
    <React.Fragment>
      {updateActive && (
        <CreateChallengeModal
          setActive={setUpdateActive}
          setAllChallenges={setAllChallenges}
          oldValues={cardInfo}
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
        {profile && cardInfo.finished && <SuccessTag />}
        {profile && !cardInfo.finished && !active && <FailTag />}
        <div className="flex flex-col items-center justify-end pb-10 pt-5">
          {cardInfo.image && (
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={`data:image/jpeg;base64,${cardInfo.image}`}
              alt="missing"
            />
          )}
          <h5 className="mb-1 text-xl font-medium text-gray-900">
            {cardInfo.createdby}
          </h5>
          <span className="text-sm text-[#917543]">{cardInfo.name}</span>
          <div className="text-left mt-6 space-y-3">
            <p>Description: {cardInfo.description}</p>
            <p>Challenge active: {cardInfo.until}</p>
          </div>
          <div className="flex mt-4 w-full align-middle">
            {!profile && (
              <ProfileButton
                text={"Join"}
                handleClick={() => handleJoin(cardInfo.id)}
              />
            )}
            {profile && (
              <div className="w-full flex space-x-3">
                {profile && canCancel && !cardInfo.finished && (
                  <ProfileButton
                    text={"Cancel"}
                    handleClick={() => handleCancel(cardInfo.id)}
                  />
                )}

                {profile &&
                  canCancel &&
                  cardInfo.finished !== undefined &&
                  !cardInfo.finished && (
                    <ProfileButton
                      text={"Finish"}
                      handleClick={() => handleFinishChallenge(cardInfo.id)}
                    />
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
