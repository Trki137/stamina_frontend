import React, { Dispatch, SetStateAction } from "react";

type ProfileTabType = {
  tabIndexActive: number;
  setTabIndexActive: Dispatch<SetStateAction<number>>;
  headElements: string[];
};

export default function Tab({
  tabIndexActive,
  setTabIndexActive,
  headElements,
}: ProfileTabType) {
  const activeClass =
    "active text-[#917543] cursor-pointer inline-block p-4 border-b-2 border-[#917543] rounded-t-lg hover:text-gray-600 hover:border-[#917543]";
  const nonActiveClass =
    "cursor-pointer inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-[#917543] hover:border-[#917543]";

  return (
    <div className="m-auto w-5/6 sm:w-2/3 xl:w-5/12 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {headElements.map((element, index) => (
          <li className="mr-2" key={index}>
            <p
              className={
                tabIndexActive === index ? activeClass : nonActiveClass
              }
              onClick={() => setTabIndexActive(index)}
            >
              {element}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
