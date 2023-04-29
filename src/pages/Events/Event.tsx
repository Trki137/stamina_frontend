import React, { useEffect, useState } from "react";
import { CardChallengeType, CardEventType } from "../../@types/EventType";
import ChallengeCard from "../../components/Cards/ChallengeCard";
import EventCard from "../../components/Cards/EventCard";
import ProfileButton from "../../components/Button/ProfileButton";
import CreateEventModal from "./CreateEventModal";
import CreateChallengeModal from "./CreateChallengeModal";
import {
  Option,
  SelectValue,
} from "react-tailwindcss-select/dist/components/type";
import { allWorkoutsType } from "../../@types/WorkoutType";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";

export default function Event() {
  const [selectedWorkout, setSelectedWorkout] = useState<Option | null>(null);
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
  const [allWorkouts, setAllWorkouts] = useState<allWorkoutsType[]>([]);

  const [createEventActive, setCreateEventActive] = useState<boolean>(false);
  const [createChallengeActive, setCreateChallengeActive] =
    useState<boolean>(false);

  useEffect(() => {
    axios
      .get(backend_paths.WORKOUT)
      .then((res) => res.data)
      .then((data) => setAllWorkouts(data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (value: SelectValue) => {
    setSelectedWorkout(value as Option);
  };

  const getWorkoutSelectFormat = () => {
    return allWorkouts.map((workout) => ({
      value: `${workout.workoutid}`,
      label: workout.name,
    }));
  };

  return (
    <React.Fragment>
      {createEventActive && (
        <CreateEventModal setActive={setCreateEventActive} />
      )}
      {createChallengeActive && (
        <CreateChallengeModal
          selectedWorkout={selectedWorkout}
          workoutSelectFormat={getWorkoutSelectFormat()}
          handleSelectChange={handleChange}
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
