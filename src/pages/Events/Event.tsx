import React, { useState } from "react";
import { CardChallengeType, CardEventType } from "../../@types/EventType";
import ChallengeCard from "../../components/Cards/ChallengeCard";
import EventCard from "../../components/Cards/EventCard";
import ProfileButton from "../../components/Button/ProfileButton";

export default function Event() {
  const [allChallenges, setAllChallenges] = useState<CardChallengeType[]>([]);
  const [allEvents, setAllEvents] = useState<CardEventType[]>([]);

  const [createEventActive, setCreateEventActive] = useState<boolean>(false);
  const [createChallengeActive, setCreateChallengeActive] =
    useState<boolean>(false);

  return (
    <div className="w-full flex flex-col justify-start items-start">
      <div className="ml-auto w-1/4 p-3 flex gap-x-2">
        <ProfileButton text={"Create event"} />
        <ProfileButton text={"Create challenge"} />
      </div>
      <div>
        <div>
          <h1 className="font-bold text-xl px-2">Challenges</h1>
          <div>
            {allChallenges.map((challenge) => (
              <ChallengeCard cardInfo={challenge} />
            ))}
          </div>
        </div>
        <div>
          <h1 className="font-bold text-xl px-2">Events</h1>
          <div>
            {allEvents.map((event) => (
              <EventCard cardInfo={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
