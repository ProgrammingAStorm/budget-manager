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

export default function YearSelector() {
  const years = useAppSelector(({ years }) => years);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleChange({ target: { value } }: SelectChangeEvent) {
    navigate(`/${value}`);
  }

  return (
    <>
      {years && years.length > 0 && (
        <FormControl sx={{ display: "flex" }}>
          <InputLabel>Year</InputLabel>
          <Select label="year" onChange={handleChange}>
            {years.map(({ id, value }) => {
              return (
                <MenuItem
                  key={id}
                  value={id}
                  onClick={() => dispatch(fetchTransactionsByYear(id))}
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
