import React, { Dispatch, SetStateAction } from "react";
import { CardChallengeType } from "../../@types/EventType";
import ChallengeCard from "../../components/Cards/ChallengeCard";

type JoinedChallenges = {
  challengesInfo: CardChallengeType[];
  setAllChallenges: Dispatch<SetStateAction<CardChallengeType[]>>;
};

export default function JoinedChallenges({
  challengesInfo,
  setAllChallenges,
}: JoinedChallenges) {
  return (
    <div className="w-full mt-3">
      <div className="grid grid-cols-1 gap-y-3 md:grid-cols-2 md:gap-x-3 xl:grid-cols-3">
        {challengesInfo.map((info) => (
          <ChallengeCard
            key={info.id}
            profile={true}
            cardInfo={info}
            setAllChallenges={setAllChallenges}
          />
        ))}
      </div>
    </div>
  );
}
