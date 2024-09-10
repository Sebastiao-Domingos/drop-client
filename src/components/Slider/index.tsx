"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value: number) {
  return `${value}kz`;
}

const minDistance = 10;

export default function MinimumDistanceSlider() {
  const [precos, setPrecos] = React.useState<number[]>([10, 90]);

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPrecos([Math.min(newValue[0], precos[1] - minDistance), precos[1]]);
    } else {
      setPrecos([precos[0], Math.max(newValue[1], precos[0] + minDistance)]);
    }
  };

  return (
    <div title="Preço mínimo e máximo">
      <Box sx={{ width: "auto", minWidth: "160px" }}>
        <Slider
          getAriaLabel={() => "Intervalo de preços"}
          value={precos}
          onChange={handleChange1}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
        />
      </Box>
      <div className="flex justify-between text-xs">
        <span>Min: {precos[0]}</span>
        <span>Max: {precos[1]}</span>
      </div>
    </div>
  );
}

export { MinimumDistanceSlider };
