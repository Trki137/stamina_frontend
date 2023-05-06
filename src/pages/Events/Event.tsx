import React, { useEffect, useState } from "react";
import { CardChallengeType, CardEventType } from "../../@types/EventType";
import ChallengeCard from "../../components/Cards/ChallengeCard";
import EventCard from "../../components/Cards/EventCard";
import ProfileButton from "../../components/Button/ProfileButton";
import CreateEventModal from "./CreateEventModal";
import CreateChallengeModal from "./CreateChallengeModal";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";

export default function Event() {
  const [allChallenges, setAllChallenges] = useState<CardChallengeType[]>([]);
  const [allEvents, setAllEvents] = useState<CardEventType[]>([]);

  const [createEventActive, setCreateEventActive] = useState<boolean>(false);
  const [createChallengeActive, setCreateChallengeActive] =
    useState<boolean>(false);

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

  console.log(allEvents);
  console.log(allChallenges);

  console.log(allEvents);
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
        <div className="ml-auto w-1/4 p-3 flex gap-x-2">
          <ProfileButton
            text={"Create event"}
            handleClick={() => setCreateEventActive(true)}
          />
          <ProfileButton
            text={"Create challenge"}
            handleClick={() => setCreateChallengeActive(true)}
          />
        </div>
        <div className="w-full">
          <div>
            <h1 className="font-bold text-xl px-2 text-left mb-5">
              Challenges
            </h1>
            <div className="w-full px-2 grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 gap-x-3">
              {allChallenges.length === 0 && (
                <h1>There are no active challenges</h1>
              )}
              {allChallenges.length !== 0 &&
                allChallenges.map((challenge) => (
                  <ChallengeCard
                    profile={false}
                    key={challenge.id}
                    cardInfo={challenge}
                    setAllChallenges={setAllChallenges}
                  />
                ))}
            </div>
          </div>
          <div className="w-full mx-auto mt-5">
            <h1 className="font-bold text-xl px-2 text-left">Events</h1>
            <div className="w-full px-2 grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 gap-x-3">
              {allEvents.length === 0 && <h1>There are no active events</h1>}
              {allEvents.length !== 0 &&
                allEvents.map((event) => (
                  <EventCard
                    profile={false}
                    key={event.id}
                    cardInfo={event}
                    setAllEvents={setAllEvents}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
