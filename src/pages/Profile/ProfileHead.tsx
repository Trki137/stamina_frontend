import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import ProfileButton from "../../components/Button/ProfileButton";

export default function ProfileHead() {
  return (
    <React.Fragment>
      <div className="flex  flex-col w-9/12 justify-end items-start sm:w-11/12 md:w-9/12 m-auto">
        <div className=" flex w-full items-center justify-center gap-x-2 pt-10 pb-3">
          <div className="w-3/12 flex justify-center items-center">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="w-full h-full max-w-[120px] max-h-[120px] p-1 rounded-full border-2 border-gray-700 text-gray-700"
            />
          </div>
          <div className="flex w-9/12 sm:w-1/3  flex-col gap-y-4 justify-start">
            <div className="flex flex-col max-w-[250px] w-full sm:flex-row   sm:items-center sm:justify-start sm:gap-x-8">
              <p className="text-2xl font-bold ">Trki</p>
              <ProfileButton text="Edit profile" />
            </div>
            <div className="hidden sm:flex sm:items-center sm:justify-start sm:gap-x-8">
              <p>
                Followers: <b>40</b>
              </p>
              <p>
                Following: <b>53</b>
              </p>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-start sm:gap-x-8">
              <p className="text-sm font-bold">Dean Trkulja</p>
              <p className="text-[0.7rem]">Description</p>
            </div>
          </div>
        </div>
        <div className=" sm:hidden">
          <p className="text-sm font-bold">Dean Trkulja</p>
          <p className="text-[0.7rem]">Description</p>
        </div>
      </div>
    </React.Fragment>
  );
}
