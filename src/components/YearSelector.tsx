import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";

export default function YearSelector() {
  const years = useAppSelector(({ years }) => years);
  const navigate = useNavigate();

  function handleChange({ target: { value } }: SelectChangeEvent) {
    navigate(`/${value}`);
  }

  return (
    <>
      {years && years.length > 0 && (
        <FormControl sx={{ display: "flex", width: "50%" }}>
          <InputLabel>Year</InputLabel>
          <Select label="year" onChange={handleChange}>
            {years.map(({ id, value }) => {
              return (
                <MenuItem key={id} value={value}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </>
  );
}
