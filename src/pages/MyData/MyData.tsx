import React, { useEffect, useState } from "react";
import MyPieChart from "./Graphs/MyPieChart";
import { ActivityDataType, BarChartDataType } from "../../@types/GraphsType";
import MyBarChart from "./Graphs/MyBarChart";
import BarChartTimeChooser from "./Graphs/BarChartTimeChooser";
import {
  getCurrentDate,
  getCurrentMonthSpan,
  getCurrentWeekSpan,
  getYearSpan,
  monthNames,
} from "../../util/date";
import { caloriesData as cData } from "../../constants/MockData";

export default function MyData() {
  const [activityData, setActivityData] = useState<ActivityDataType[]>([
    {
      name: "Football",
      value: 323003,
    },
    {
      name: "Running",
      value: 123302,
    },
    {
      name: "Gym",
      value: 223003,
    },
  ]);

  const [caloriesData, setCaloriesData] = useState<BarChartDataType[]>(cData);
  const [barData, setBarData] = useState<BarChartDataType[]>(caloriesData);
  const [active, setActive] = useState<string>("WEEK");
  const [date, setDate] = useState<string>(getCurrentWeekSpan());

  function dataForYear() {
    const year = date.substring(date.length - 5);
    console.log(year);
    const yearData: BarChartDataType[] = caloriesData.filter((data) =>
      data.xAxisText.endsWith(year)
    );

    const finalData: BarChartDataType[] = [];

    for (let i = 0; i < 12; i++) {
      const month = i + 1;

      const monthData: BarChartDataType[] = yearData.filter((data) => {
        const dataMonth = Number(data.xAxisText.split(".")[1]);
        return month === dataMonth;
      });

      if (monthData.length === 0) {
        finalData.push({
          xAxisText: monthNames[i],
          barData: 0,
          lineData: 0,
        });
        continue;
      }

      const avg_calories_month_count = monthData.reduce(
        (cal, sum) => (cal += sum.barData),
        0
      );
      const avg_calories_month_personal_count = monthData.reduce(
        (cal, sum) => (cal += sum.lineData),
        0
      );

      finalData.push({
        xAxisText: monthNames[i],
        barData: avg_calories_month_count / monthData.length,
        lineData: avg_calories_month_personal_count / monthData.length,
      });
    }

    setBarData(finalData);
  }

  useEffect(() => {
    if (active === "YEAR") {
      dataForYear();
      return;
    }
    let [start, end] = date.split(" - ");

    if (!end) end = start;

    let [day, month, year] = start
      .substring(
        0,
        date.indexOf(" - ") !== -1 ? date.indexOf(" - ") : date.length
      )
      .trim()
      .split(".");
    const startDate = Date.parse(`${year}-${month}-${day}`);

    [day, month, year] = end
      .substring(
        0,
        date.indexOf(" - ") !== -1 ? date.indexOf(" - ") : date.length
      )
      .trim()
      .split(".");
    const endDate = Date.parse(`${year}-${month}-${day}`);
    const filtered = caloriesData?.filter((data) => {
      [day, month, year] = data.xAxisText
        .substring(
          0,
          date.indexOf(" - ") !== -1 ? date.indexOf(" - ") : date.length
        )
        .trim()
        .split(".");
      const dateValue = Date.parse(`${year}-${month}-${day}`);
      return dateValue >= startDate && dateValue <= endDate;
    });
    setBarData(filtered);
  }, [date]);

  useEffect(() => {
    switch (active) {
      case "DAY": {
        setDate(getCurrentDate());
        break;
      }
      case "WEEK": {
        setDate(getCurrentWeekSpan());
        break;
      }
      case "MONTH": {
        setDate(getCurrentMonthSpan());
        break;
      }
      case "YEAR": {
        setDate(getYearSpan());
        break;
      }
    }
  }, [active]);

  return (
    <div className="w-full">
      <div className="w-full">
        <BarChartTimeChooser
          setDate={setDate}
          setActive={setActive}
          active={active}
          date={date}
        />
        <MyBarChart
          data={barData}
          barLegendName={"Average calories"}
          lineLegendName={"My calories"}
        />
      </div>
      <div className="w-1/3">
        <MyPieChart data={activityData} title={"My Activities"} />
      </div>
    </div>
  );
}
