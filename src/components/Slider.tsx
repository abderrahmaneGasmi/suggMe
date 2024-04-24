import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { FormLabel } from "@mui/material";

export default function DiscreteSlider({
  label,
  max,
  min,
  step,
  value,
  updateValue,
  labelDisplay,
}: {
  min: number;
  max: number;
  step: number;
  label: string;
  value: number;
  updateValue: (value: number) => void;
  labelDisplay: string;
}) {
  return (
    <Box sx={{ width: 300 }}>
      <FormLabel
        id="demo-controlled-radio-buttons-group"
        sx={{
          fontSize: "25px",
          fontWeight: 500,
          color: "rgb(234 179 8)",
          "&.Mui-focused": {
            color: "rgb(239 198 69)",
          },
        }}
      >
        {label}
      </FormLabel>
      <div className="flex ml-2">
        <Slider
          aria-label={label}
          defaultValue={30}
          getAriaValueText={(value) => `${value} ${labelDisplay}`}
          valueLabelDisplay="on"
          shiftStep={step}
          value={value}
          step={step}
          marks
          min={min}
          onChange={(_, value) => updateValue(value as number)}
          max={max}
          sx={{
            color: "rgb(239 198 69)",
            "& .MuiSlider-markLabel": {
              color: "rgb(239 198 69)",
            },
            "& .MuiSlider-thumb": {
              color: "rgb(239 198 69)",
            },
            "& .MuiSlider-track": {
              color: "rgb(239 198 69)",
            },
            "& .MuiSlider-rail": {
              color: "rgb(239 198 69)",
            },
            "& .MuiSlider-valueLabel": {
              backgroundColor: "rgb(239 198 69)",
              color: "white",
            },
          }}
        />
      </div>
    </Box>
  );
}
