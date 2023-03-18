import React from "react";
import ButtonLink from "../../components/Button/ButtonLink";
import { ExerciseCardType } from "../../@types/ExerciseCard";

type OptionCardType = {
  data: ExerciseCardType;
};

export default function OptionCard({ data }: OptionCardType) {
  return (
    <div className="m-auto max-w-sm bg-white border border-gray-200 rounded-lg  sm:flex sm:max-w-2xl lg:max-w-3xl sm:max-h-56 ">
      <img
        className="rounded-t-lg sm:w-5/12"
        src={process.env.PUBLIC_URL + data.imagePath}
        alt=""
      />
      <div className="sm:relative sm:py-5 sm:w-full">
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {data.title}
          </h5>
          {data.description.map((text) => (
            <p key={text} className="mb-3 font-normal text-gray-700">
              {text}
            </p>
          ))}
          <div className="sm:absolute sm:w-[150px] sm:bottom-2 sm:right-0">
            <ButtonLink address={data.link} text={data.linkText} />
          </div>
        </div>
      </div>
    </div>
  );
}
