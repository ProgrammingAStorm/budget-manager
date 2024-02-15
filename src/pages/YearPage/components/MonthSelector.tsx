import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export default function MonthSelector({ months }: { months: string[] }) {
  const currentYear = useParams().year;
  const navigate = useNavigate();

  function handleChange({ target: { value } }: SelectChangeEvent) {
    
  }

  return (
    <>
      {months && months.length > 0 && (
        <FormControl sx={{ display: "flex", width: "50%" }}>
          <InputLabel>Month</InputLabel>
          <Select label="month" onChange={handleChange} value={months[0]}>
            {months.map((value, index) => {
              return (
                <MenuItem key={index} value={value} onClick={() => navigate(`/${currentYear}/${value}`)}>
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
