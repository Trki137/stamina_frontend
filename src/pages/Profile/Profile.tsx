import React, { useEffect, useState } from "react";
import ProfileHead from "./ProfileHead";
import Tab from "../../components/Tab/Tab";
import JoinedChallenges from "./JoinedChallenges";
import JoinedGroupEvents from "./JoinedGroupEvents";
import { CardChallengeType, CardEventType } from "../../@types/EventType";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";
import { ProfileData } from "../../@types/Profile";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { id } = useParams();
  const [tabIndexActive, setTabIndexActive] = useState<number>(0);
  const [challenges, setChallenges] = useState<CardChallengeType[]>([]);
  const [groupEvents, setGroupEvents] = useState<CardEventType[]>([]);
  useEffect(() => {
    if (!id) return;

    axios
      .get(`${backend_paths.EVENT}/${id}`)
      .then((res) => res.data)
      .then((data: ProfileData) => {
        setChallenges(data.my_challenges);
        setGroupEvents(data.my_events);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="w-full">
      <div className="w-10/12 m-auto">
        <ProfileHead />
        <Tab
          setTabIndexActive={setTabIndexActive}
          tabIndexActive={tabIndexActive}
          headElements={["Challenge", "Event"]}
        />
      </div>
      {tabIndexActive === 0 && (
        <JoinedChallenges
          setAllChallenges={setChallenges}
          challengesInfo={challenges}
        />
      )}
      {tabIndexActive === 1 && (
        <JoinedGroupEvents
          setAllEvents={setGroupEvents}
          eventInfo={groupEvents}
        />
      )}
    </div>
  );
}
