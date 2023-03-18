import React, { Dispatch, SetStateAction } from "react";

type ProfileTabType = {
  tabIndexActive: number;

  setTabIndexActive: Dispatch<SetStateAction<number>>;
};

export default function ProfileTab({
                                     tabIndexActive,
                                     setTabIndexActive,
                                   }: ProfileTabType) {

  const activeClass = "active text-[#917543] cursor-pointer inline-block p-4 border-b-2 border-[#917543] rounded-t-lg hover:text-gray-600 hover:border-[#917543]";
  const nonActiveClass = "cursor-pointer inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-[#917543] hover:border-[#917543]";

  return (
      <div
          className="m-auto w-5/6 sm:w-2/3 xl:w-5/12 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <p className={tabIndexActive === 0 ? activeClass : nonActiveClass}
               onClick={() => setTabIndexActive(0)}>
              Challenges
            </p>
          </li>
          <li className="mr-2">
            <p
                className={tabIndexActive === 1 ? activeClass : nonActiveClass}
                onClick={() => setTabIndexActive(1)}
            >
              Events
            </p>
          </li>
        </ul>
      </div>
  );
}
