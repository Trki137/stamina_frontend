import React from "react";
import ReactSlider, { ReactSliderProps } from "react-slider";

import cn from "classnames";

export default function RangeSlider<T extends number | readonly number[]>(
  _props: ReactSliderProps<T>
) {
  const isVertical = _props.orientation === "vertical";

  return (
    <ReactSlider
      {..._props}
      renderThumb={(props, state) => (
        <div
          {...props}
          className={cn({
            "h-full": !isVertical,
            "w-full": isVertical,
            "aspect-square rounded-full  bg-[#2C3531] text-xs text-white flex items-center justify-center cursor-grab":
              true,
          })}
        >
          {state.value}
        </div>
      )}
      renderTrack={(props, state) => {
        const points = Array.isArray(state.value) ? state.value.length : null;
        const isMulti = points && points > 0;
        const isLast = isMulti ? state.index === points : state.index === 1;
        const isFirst = state.index === 0;
        return (
          <div
            {...props}
            className={cn({
              "h-1/4 top-1/2 -translate-y-1/2": !isVertical,
              "w-1/4 left-1/2 -translate-x-1/2": isVertical,
              "rounded-full": true,
              "bg-gray-200": isMulti ? isFirst || isLast : isLast,
              "bg-[#2C3531]": isMulti ? !isFirst || !isLast : isFirst,
            })}
          ></div>
        );
      }}
    />
  );
}
