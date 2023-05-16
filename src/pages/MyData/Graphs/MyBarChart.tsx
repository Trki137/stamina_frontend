import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { COLORS } from "../../../constants/Colors";
import { BarChartDataType } from "../../../@types/GraphsType";
import {
  getCurrentDate,
  getCurrentMonthSpan,
  getCurrentWeekSpan,
  getYearSpan,
  monthNames,
} from "../../../util/date";
import dayjs from "dayjs";

type MyBarChartType = {
  data: BarChartDataType[];
  copyData: BarChartDataType[];
  setData: Dispatch<SetStateAction<BarChartDataType[]>>;
  barLegendName: string;
  lineLegendName: string;
  active: string;
  date: string;
  setDate: Dispatch<SetStateAction<string | null>>;
  color?: string;
};

export default function MyBarChart({
  data,
  copyData,
  setData,
  barLegendName,
  lineLegendName,
  active,
  date,
  setDate,
  color,
}: MyBarChartType) {
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

  const forYear = () => {
    const year = date.substring(date.length - 5);
    const yearData: BarChartDataType[] = copyData.filter((data) =>
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
        (cal, sum) => (cal += Number(sum.barData)),
        0
      );
      const avg_calories_month_personal_count = monthData.reduce(
        (cal, sum) => (cal += Number(sum.lineData)),
        0
      );

      finalData.push({
        xAxisText: monthNames[i],
        barData: Math.trunc(
          avg_calories_month_personal_count / monthData.length
        ),
        lineData: Math.trunc(avg_calories_month_count / monthData.length),
      });
    }

    setData(finalData);
  };

  useEffect(() => {
    if (active === "YEAR") {
      forYear();
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

    const filtered = copyData?.filter((data) => {
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

    if (filtered.length > 0)
      filtered.sort((d1, d2) => {
        const date1Formatted = formatDate(d1.xAxisText);
        const date2Formatted = formatDate(d2.xAxisText);

        const date1 = dayjs(date1Formatted);
        const date2 = dayjs(date2Formatted);

        return date1.isAfter(date2) ? 1 : -1;
      });

    setData(filtered);
  }, [date]);

  const formatDate = (oldDate: string) => {
    const split = oldDate.split(".");
    return split[1] + "." + split[0] + "." + split[2];
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={250}>
        <ComposedChart data={data}>
          <XAxis dataKey={"xAxisText"} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Bar
            dataKey={"barData"}
            name={barLegendName}
            barSize={20}
            fill={color ? color : COLORS[1]}
          />
          <Line
            type={"monotone"}
            name={lineLegendName}
            dataKey={"lineData"}
            stroke={COLORS[4]}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
