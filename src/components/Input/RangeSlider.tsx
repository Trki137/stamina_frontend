import React, { Dispatch, SetStateAction } from "react";
import { Box, Slider } from "@mui/material";

type RangeSliderType = {
  min: number;
  max: number;
  value: number[];
  setValue: Dispatch<SetStateAction<number[]>>;
};
export default function RangeSlider({
  min,
  max,
  value,
  setValue,
}: RangeSliderType) {
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  console.log(value);
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        min={min}
        max={max}
        getAriaLabel={() => "Time"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={() => `${value}`}
      />
    </Box>
  );
}
