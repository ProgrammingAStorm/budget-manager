import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Month from "../../../models/month";
import MonthDisplay from "./MonthDisplay";

export default function MonthSelector({
  months,
  setIsMonthSelected,
}: {
  months: string[];
  setIsMonthSelected: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const currentYear = useParams().year;
  const navigate = useNavigate();

  function handleChange({ target: { value } }: SelectChangeEvent) {}

  return (
    <>
      {months && months.length > 0 && (
        <Box
          component={"section"}
          sx={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(4, 1fr)",
            padding: ".5rem",
            gap: ".5rem",
          }}
        >
          {Object.keys(Month)
            .filter((month) => months.includes(month))
            .map((month, index) => (
              <MonthDisplay
                key={index}
                month={month}
                setIsMonthSelected={setIsMonthSelected}
              />
            ))}
        </Box>
      )}
    </>
  );
}
