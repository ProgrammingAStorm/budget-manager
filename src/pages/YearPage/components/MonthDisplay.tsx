import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function MonthDisplay({
  month,
  setIsMonthSelected,
}: {
  month: string;
  setIsMonthSelected: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const year = useParams().year;
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function handleSubmit() {
    navigate(`/${year}/${month}`);
    setIsMonthSelected(true);
  }

  return (
    <Box>
      <Card
        component={"article"}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: expanded ? "100%" : "fit-content",
        }}
      >
        <CardHeader
          title={month}
          action={
            <IconButton onClick={handleExpandClick}>
              <ExpandMoreIcon
                sx={{
                  transform: !expanded ? "rotate(0deg)" : "rotate(180deg)",
                }}
              />
            </IconButton>
          }
        />
        {expanded && <CardContent sx={{ flex: 1 }}></CardContent>}
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
