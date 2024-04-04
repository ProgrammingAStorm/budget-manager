import { Box, Button, Paper, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Panel from "../components/Panel";
import { generateBudgetFromTransactions } from "../../../redux/thunks/budgetThunks";
import { PieChart } from "@mui/x-charts";
import { getPieChartParamsFromBudget } from "../../../utils/chart";

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
      <Typography variant="h1" textAlign={"center"} marginBlock={"1.25rem"}>
        Budget
      </Typography>
      <PieChart {...getPieChartParamsFromBudget(budgets[0])} />
    </Panel>
  );
}

// const barChartsParams = {
//   xAxis: [
//     {
//       data: ['page A', 'page B', 'page C', 'page D', 'page E'],
//       scaleType: 'band' as const,
//     },
//   ],
//   series: [
//     { data: [2, 5, 3, 4, 1], stack: '1', label: 'Series x' },
//     { data: [10, 3, 1, 2, 10], stack: '1', label: 'Series y' },
//     { data: [10, 3, 1, 2, 10], stack: '1', label: 'Series z' },
//   ],
//   margin: { top: 10, right: 10 },
//   height: 200,
//   slotProps: {
//     legend: {
//       hidden: true,
//     },
//   },
// };
