import { Box, Button, Paper, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
//import { selectBudgets } from "../../../redux/slices/budgetSlice";
import Panel from "../components/Panel";
import { generateBudgetFromTransactions } from "../../../redux/thunks/budgetThunks";

export default function BudgetReportPanel() {
  const budgets = useAppSelector((s) => s.budgets);
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(generateBudgetFromTransactions());
  }

  if (budgets.length === 0) {
    return (
      <Panel display={"flex"}>
        <Box
          sx={{
            flexGrow: 1,
            display: "grid",
            placeItems: "center",
          }}
          component={"main"}
        >
          <Paper
            component={"article"}
            sx={{
              padding: "1.5rem",
            }}
          >
            <Box
              sx={{
                marginBlock: ".25rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">No budgets found.</Typography>
              <Typography variant="body1">
                Generate one based off of transactions?
              </Typography>
            </Box>
            <Button
              variant="outlined"
              sx={{
                marginBlock: ".25rem",
                marginInline: "auto",
                display: "block",
              }}
              onClick={handleClick}
            >
              Go!
            </Button>
          </Paper>
        </Box>
      </Panel>
    );
  }

  return (
    <Panel display="block">
      <div></div>
    </Panel>
  );
}
