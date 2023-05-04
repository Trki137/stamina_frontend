import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { COLORS } from "../../../constants/Colors";
import { ActivityDataType } from "../../../@types/GraphsType";

type PieChartType = {
  title: string;
  data: ActivityDataType[];
};

export default function MyPieChart({ title, data }: PieChartType) {
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="mb-3 mt-3 w-full flex flex-col items-center align-center justify-center text-center">
      <p className="font-bold">{title.toUpperCase()}</p>
      <div className="w-full">
        <ResponsiveContainer width="100%" height={250} className="text-center">
          <PieChart>
            <Legend
              layout={"horizontal"}
              verticalAlign={"bottom"}
              align={"center"}
            />
            <Pie
              dataKey={"value"}
              nameKey={"name"}
              data={data}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
