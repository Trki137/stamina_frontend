import React, { useState } from "react";
import { CardChallengeType, CardEventType } from "../../@types/EventType";
import ChallengeCard from "../../components/Cards/ChallengeCard";
import EventCard from "../../components/Cards/EventCard";
import ProfileButton from "../../components/Button/ProfileButton";
import CreateEventModal from "./CreateEventModal";
import CreateChallengeModal from "./CreateChallengeModal";

export default function Event() {
  const [allChallenges, setAllChallenges] = useState<CardChallengeType[]>([]);
  const [allEvents, setAllEvents] = useState<CardEventType[]>([
    {
      startsAt: "10:00",
      remainingSpace: 10,
      id: 1,
      createdBy: "Dean Trkulja",
      location: {
        address: "Radiceva",
        city: "Zagreb",
      },
      name: "Velesajam turnir",
      description:
        "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image: "/images/data.jpeg",
    },
    {
      startsAt: "10:00",
      remainingSpace: 10,
      id: 2,
      createdBy: "Dean Trkulja",
      location: {
        address: "Radiceva",
        city: "Zagreb",
      },
      name: "Velesajam turnir",
      description:
        "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image: null,
    },
    {
      startsAt: "10:00",
      remainingSpace: 10,
      id: 3,
      createdBy: "Dean Trkulja",
      location: {
        address: "Radiceva",
        city: "Zagreb",
      },
      name: "Velesajam turnir",
      description:
        "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image: "/images/data.jpeg",
    },
  ]);

  const [createEventActive, setCreateEventActive] = useState<boolean>(false);
  const [createChallengeActive, setCreateChallengeActive] =
    useState<boolean>(false);

  return (
    <React.Fragment>
      {createEventActive && (
        <CreateEventModal setActive={setCreateEventActive} />
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
            <h1 className="font-bold text-xl px-2">Challenges</h1>
            <div>
              {allChallenges.map((challenge) => (
                <ChallengeCard cardInfo={challenge} />
              ))}
            </div>
          </div>
          <div className="w-full mx-auto">
            <h1 className="font-bold text-xl px-2">Events</h1>
            <div className="w-full px-2 grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 gap-x-3">
              {allEvents.map((event) => (
                <EventCard key={event.id} cardInfo={event} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}