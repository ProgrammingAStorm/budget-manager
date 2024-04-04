import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { fetchTransactionsByYear } from "../redux/thunks/transactionThunks";
import { useState } from "react";
import Year from "../models/year";

export default function YearSelector() {
  const years = useAppSelector(({ years }) => years);
  const [selectedMonth, setSelectedMonth] = useState(
    years.length > 0 ? years[0].value : ""
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleClick({ id, value }: Year) {
    dispatch(fetchTransactionsByYear(id));
    setSelectedMonth(value);
    navigate(`year/${value}`);
  }

  return (
    <>
      {years && years.length > 0 && (
        <FormControl sx={{ display: "flex" }}>
          <InputLabel>Year</InputLabel>
          <Select label="year" value={selectedMonth}>
            {years.map(({ id, value }) => {
              return (
                <MenuItem
                  key={id}
                  value={value}
                  onClick={() => handleClick({ id, value })}
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
