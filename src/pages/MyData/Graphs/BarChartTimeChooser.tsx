import React, { Dispatch, SetStateAction } from "react";
import MyDatePicker from "./MyDatePicker";

type BarChartTimeChooserType = {
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
  date: string;
  setDate: Dispatch<SetStateAction<string | null>>;
};
export default function BarChartTimeChooser({
  active,
  setActive,
  date,
  setDate,
}: BarChartTimeChooserType) {
  const paragraphActive = "font-bold text-[#917543] cursor-pointer mr-3";
  const paragraphNotActive = "text-black mr-3 cursor-pointer";

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex w-full justify-center">
        <p
          onClick={() => setActive("DAY")}
          className={active === "DAY" ? paragraphActive : paragraphNotActive}
        >
          DAY
        </p>
        <p
          onClick={() => setActive("WEEK")}
          className={active === "WEEK" ? paragraphActive : paragraphNotActive}
        >
          WEEK
        </p>
        <p
          onClick={() => setActive("MONTH")}
          className={active === "MONTH" ? paragraphActive : paragraphNotActive}
        >
          MONTH
        </p>
        <p
          onClick={() => setActive("YEAR")}
          className={active === "YEAR" ? paragraphActive : paragraphNotActive}
        >
          YEAR
        </p>
      </div>
      <div className="w-fit flex items-center justify-between my-2 text-xl">
        <MyDatePicker date={date} setDate={setDate} intervalType={active} />
      </div>
    </div>
  );
}
