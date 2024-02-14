import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { months } from "../../../models/month";

export default function MonthSelector() {
  const currentYear = useParams().year;
  const navigate = useNavigate();

  function handleChange({ target: { value } }: SelectChangeEvent) {
    navigate(`/${currentYear}/${value}`);
  }

  return (
    <>
      {months && months.length > 0 && (
        <FormControl sx={{ display: "flex", width: "50%" }}>
          <InputLabel>Month</InputLabel>
          <Select label="month" onChange={handleChange}>
            {months.map((value, index) => {
              return (
                <MenuItem key={index} value={value}>
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
