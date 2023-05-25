import React, { useEffect, useState } from "react";
import { CardChallengeType, CardEventType } from "../../@types/EventType";
import ChallengeCard from "../../components/Cards/ChallengeCard";
import EventCard from "../../components/Cards/EventCard";
import CreateEventModal from "./CreateEventModal";
import CreateChallengeModal from "./CreateChallengeModal";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";
import ChallengePlaceholder from "./ChallengePlaceholder";
import GroupEventPlaceholder from "./GroupEventPlaceholder";

export default function Event() {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [allChallenges, setAllChallenges] = useState<CardChallengeType[]>([]);
  const [allEvents, setAllEvents] = useState<CardEventType[]>([]);

  const [createEventActive, setCreateEventActive] = useState<boolean>(false);
  const [createChallengeActive, setCreateChallengeActive] =
    useState<boolean>(false);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("staminaUser");
    if (!user) return;

    const userId = JSON.parse(user).userid;

    axios
      .get(`${backend_paths.CHALLENGE}/${userId}`)
      .then((res) => res.data)
      .then((data) => setAllChallenges(data))
      .catch((e) => console.log(e));

    axios
      .get(`${backend_paths.GROUP_EVENT}/${userId}`)
      .then((res) => res.data)
      .then((data) => setAllEvents(data))
      .catch((e) => console.log(e));
  }, []);

  let number = 3;

  if (windowWidth < 1000) number = 2;
  if (windowWidth < 700) number = 1;
  return (
    <React.Fragment>
      {createEventActive && (
        <CreateEventModal
          setAllEvents={setAllEvents}
          setActive={setCreateEventActive}
        />
      )}
      {createChallengeActive && (
        <CreateChallengeModal
          setActive={setCreateChallengeActive}
          setAllChallenges={setAllChallenges}
        />
      )}

      <div className="w-full flex flex-col justify-start items-start">
        <div className="w-full min-h-[300px]">
          <div className="pt-5">
            <h1 className="font-bold text-xl px-2 text-left mb-5">
              Challenges
            </h1>
            <div className="w-full px-2 grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 gap-x-3">
              {allChallenges.length !== 0 &&
                allChallenges.map((challenge) => (
                  <ChallengeCard
                    profile={false}
                    key={challenge.id}
                    cardInfo={challenge}
                    setAllChallenges={setAllChallenges}
                  />
                ))}

              <ChallengePlaceholder
                addMinHeight={allChallenges.length % number === 0}
                handleOpenModal={() => setCreateChallengeActive(true)}
              />
            </div>
          </div>
          <div className="w-full mx-auto mt-5 pb-10">
            <h1 className="font-bold text-xl px-2 text-left">Events</h1>
            <div className="w-full px-2 grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 gap-x-3">
              {allEvents.length !== 0 &&
                allEvents.map((event) => (
                  <EventCard
                    profile={false}
                    key={event.id}
                    cardInfo={event}
                    setAllEvents={setAllEvents}
                  />
                ))}

              <GroupEventPlaceholder
                addMinHeight={allEvents.length % number === 0}
                handleOpenModal={() => setCreateEventActive(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
