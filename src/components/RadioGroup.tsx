import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InfoIcon from "@mui/icons-material/Info";
import { IconButton, Tooltip } from "@mui/material";
const tooltips = [
  "Score Recommendation: it works by sorting the movies by the similartiy of the selected movies using different keys shuch as :genres, keywords, etc",
  "Filter Recommendation: it works by filtering the movies and keeps only movies that has the similartiy of the selected movies using different keys shuch as :genres, keywords ,etc",
];
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
        className="text-gray-700 dark:text-gray-300 gap-8"
        row
      >
        {values.map((item, i) => (
          <div className="flex">
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
              sx={{
                marginRight: "0px",
              }}
            />
            <Tooltip
              title={tooltips[i]}
              slotProps={{
                transition: { timeout: 500 },
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -14],
                      },
                    },
                  ],
                },
              }}
            >
              <IconButton
                sx={{
                  color: " rgb(59, 130, 246)",
                  "&:hover": {
                    color: " rgb(114, 164, 245)",
                  },
                }}
              >
                <InfoIcon
                  sx={{
                    fontSize: "20px",
                  }}
                />
              </IconButton>
            </Tooltip>
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
