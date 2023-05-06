import React, { Dispatch, SetStateAction } from "react";
import { CardEventType } from "../../@types/EventType";
import EventCard from "../../components/Cards/EventCard";

type JoinedGroupEventsType = {
  eventInfo: CardEventType[];
  setAllEvents: Dispatch<SetStateAction<CardEventType[]>>;
};

export default function JoinedGroupEvents({
  eventInfo,
  setAllEvents,
}: JoinedGroupEventsType) {
  return (
    <div className="w-full mt-3">
      <div className="grid grid-cols-1 gap-y-3 md:grid-cols-2 md:gap-x-3 xl:grid-cols-3">
        {eventInfo.map((info) => (
          <EventCard
            key={info.id}
            profile={true}
            cardInfo={info}
            setAllEvents={setAllEvents}
          />
        ))}
      </div>
    </div>
  );
}
