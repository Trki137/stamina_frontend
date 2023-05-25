import React, { useEffect, useState } from "react";
import MyPieChart from "./Graphs/MyPieChart";
import { ActivityDataType, BarChartDataType } from "../../@types/GraphsType";
import MyBarChart from "./Graphs/MyBarChart";
import BarChartTimeChooser from "./Graphs/BarChartTimeChooser";
import { getCurrentMonthSpan } from "../../util/date";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";
import {
  AvgDataType,
  ExerciseDataType,
  MyDataType,
} from "../../@types/ExerciseDataTypes";
import { COLORS } from "../../constants/Colors";

export default function MyData() {
  const [activityData, setActivityData] = useState<ActivityDataType[]>([]);
  const [caloriesData, setCaloriesData] = useState<BarChartDataType[]>([]);
  const [barCaloriesData, setBarCaloriesData] = useState<BarChartDataType[]>(
    []
  );
  const [timeData, setTimeData] = useState<BarChartDataType[]>([]);
  const [barTimeData, setBarTimeData] = useState<BarChartDataType[]>([]);
  const [hearthData, setHearthData] = useState<BarChartDataType[]>([]);
  const [barHearthData, setBarHearthData] = useState<BarChartDataType[]>([]);
  const [activeForCalories, setActiveForCalories] = useState<string>("WEEK");
  const [dateForCalories, setDateForCalories] = useState<string | null>(null);
  const [activeForTime, setActiveForTime] = useState<string>("WEEK");
  const [dateForTime, setDateForTime] = useState<string | null>(null);
  const [activeForHearth, setActiveForHearth] = useState<string>("WEEK");
  const [dateForHearth, setDateForHearth] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("staminaUser");
    if (!user) return;

    const userId = JSON.parse(user).userid;
    if (!userId) return;

    axios
      .get(`${backend_paths.DATA}/${userId}`)
      .then((res) => res.data)
      .then((data: ExerciseDataType) => {
        const activityData: ActivityDataType[] = [];
        const calData: BarChartDataType[] = [];
        const timeData: BarChartDataType[] = [];
        const hearthData: BarChartDataType[] = [];

        const myData: MyDataType[] = data.userData;
        const avgData: AvgDataType[] = data.avgData;

        for (let i = 0; i < myData.length; i++) {
          const date = myData[i].date;

          const sportIndex = activityData.findIndex(
            (eData) => eData.name === myData[i].name
          );
          if (sportIndex === -1) {
            activityData.push({
              name: myData[i].name,
              value: Number(myData[i].time),
            });
          } else activityData[sportIndex].value += Number(myData[i].time);

          const index = avgData.findIndex((eData) => eData.date === date);

          let avgCal = 0;
          let avgTime = 0;
          let avgHearthRate = 0;

          if (index !== -1) {
            avgCal = avgData[index].avgcalories;
            avgTime = Number(avgData[index].avgtime);
            avgHearthRate = avgData[index].avg_hearth_rate;
          }

          calData.push({
            xAxisText: date,
            lineData: avgCal,
            barData: myData[i].calories,
          });
          timeData.push({
            xAxisText: date,
            lineData: avgTime,
            barData: Number(myData[i].time),
          });
          hearthData.push({
            xAxisText: date,
            lineData: avgHearthRate,
            barData:
              myData[i].avg_hearth_rate == null ? 0 : myData[i].avg_hearth_rate,
          });
        }

        console.log(myData);
        console.log(timeData);

        for (let i = 0; i < avgData.length; i++) {
          const index = myData.findIndex(
            (eData) => eData.date === avgData[i].date
          );
          if (index !== -1) continue;

          calData.push({
            xAxisText: avgData[i].date,
            lineData: avgData[i].avgcalories,
            barData: 0,
          });
          timeData.push({
            xAxisText: avgData[i].date,
            lineData: Number(avgData[i].avgtime),
            barData: 0,
          });
          hearthData.push({
            xAxisText: avgData[i].date,
            lineData: avgData[i].avg_hearth_rate,
            barData: 0,
          });
        }

        setCaloriesData(calData);
        setTimeData(timeData);
        setHearthData(hearthData);
        setActivityData(activityData);
        setBarHearthData(hearthData);
        setBarCaloriesData(calData);
        setBarTimeData(timeData);

        setDateForCalories(getCurrentMonthSpan());
        setDateForHearth(getCurrentMonthSpan());
        setDateForTime(getCurrentMonthSpan());
      })
      .catch((e) => console.log(e));
  }, []);

  const hasDataForDisplay =
    timeData.length != 0 || hearthData.length != 0 || caloriesData.length != 0;

  return (
    <React.Fragment>
      {!hasDataForDisplay && (
        <div className="w-full mt-4">
          <p className="mx-auto">There are no data to display</p>
        </div>
      )}
      {hasDataForDisplay && (
        <div className="w-full flex flex-col items-center align-center">
          <div className="w-full space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-y-10 p-10">
            {dateForCalories && (
              <div className="w-full">
                <BarChartTimeChooser
                  setDate={setDateForCalories}
                  setActive={setActiveForCalories}
                  active={activeForCalories}
                  date={dateForCalories}
                />
                <MyBarChart
                  data={barCaloriesData}
                  copyData={caloriesData}
                  setData={setBarCaloriesData}
                  active={activeForCalories}
                  date={dateForCalories}
                  setDate={setDateForCalories}
                  barLegendName={"My calories"}
                  lineLegendName={"Average calories  (other users)"}
                />
              </div>
            )}

            {dateForHearth && (
              <div className="w-full">
                <BarChartTimeChooser
                  setDate={setDateForHearth}
                  setActive={setActiveForHearth}
                  active={activeForHearth}
                  date={dateForHearth}
                />
                <MyBarChart
                  data={barHearthData}
                  copyData={hearthData}
                  setData={setBarHearthData}
                  active={activeForHearth}
                  date={dateForHearth}
                  setDate={setDateForHearth}
                  barLegendName={"My average hearth rate"}
                  lineLegendName={"Average hearth rate  (other users)"}
                  color={COLORS[3]}
                />
              </div>
            )}

            {dateForTime && (
              <div className="w-full">
                <BarChartTimeChooser
                  setDate={setDateForTime}
                  setActive={setActiveForTime}
                  active={activeForTime}
                  date={dateForTime}
                />
                <MyBarChart
                  data={barTimeData}
                  copyData={timeData}
                  setData={setBarTimeData}
                  active={activeForTime}
                  date={dateForTime}
                  setDate={setDateForTime}
                  barLegendName={"My average workout time"}
                  lineLegendName={"Average workout time (other users)"}
                  color={COLORS[6]}
                />
              </div>
            )}
          </div>

          {activityData.length > 0 && (
            <div className="w-1/3 ">
              <MyPieChart data={activityData} title={"My Activities"} />
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
}
