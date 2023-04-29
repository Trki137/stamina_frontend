import React from "react";
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

type MyBarChartType = {
  data: BarChartDataType[];
  barLegendName: string;
  lineLegendName: string;
};

export default function MyBarChart({
  data,
  barLegendName,
  lineLegendName,
}: MyBarChartType) {
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
            fill={COLORS[1]}
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
