import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { fetchTransactionsByYear } from "../redux/thunks/transactionThunks";
import { useState } from "react";

export default function YearSelector() {
  const years = useAppSelector(({ years }) => years);
  const [selectedMonth, setSelectedMonth] = useState(
    years.length > 0 ? years[0].value : ""
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleChange({ target: { value } }: SelectChangeEvent) {
    setSelectedMonth(value);
    navigate(`/${value}`);
  }

  function handleClick(id: string) {
    dispatch(fetchTransactionsByYear(id));
  }

  return (
    <>
      {years && years.length > 0 && (
        <FormControl sx={{ display: "flex" }}>
          <InputLabel>Year</InputLabel>
          <Select label="year" onChange={handleChange} value={selectedMonth}>
            {years.map(({ id, value }) => {
              return (
                <MenuItem
                  key={id}
                  value={value}
                  onClick={() => handleClick(id)}
                >
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
