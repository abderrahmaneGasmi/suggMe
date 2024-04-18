import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
export default function ControlledRadioButtonsGroup({
  value,
  setValue,
  title,
  values,
}: {
  value: string;
  setValue: (type: string) => void;
  values: { value: string; label: string }[];
  title: string;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
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
        {title}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
        className="text-gray-700 dark:text-gray-300"
        row
      >
        {values.map((item) => (
          <FormControlLabel
            value={item.value}
            key={item.value}
            control={
              <Radio
                sx={{
                  color: "rgb(234 179 8)",
                  "&.Mui-checked": {
                    color: "rgb(234 179 8)",
                  },
                }}
              />
            }
            label={item.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
