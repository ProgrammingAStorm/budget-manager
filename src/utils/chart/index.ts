import { PieChartProps } from "@mui/x-charts";
import Budget from "../../models/budget";
import Enumerable from "linq";

function getPieChartParamsFromBudget(budget: Budget): PieChartProps {
  const divisions = Enumerable.from(budget.divisions);

  return {
    series: [
      {
        data: divisions
          .select(({ percentage }, id) => {
            return {
              id,
              value: percentage,
              label: `$${(percentage * budget.totalIncome).toLocaleString()}`,
            };
          })
          .toArray(),
      },
    ],
    xAxis: [{ data: divisions.select((d) => d.category).toArray() }],
    height: 500,
    slotProps: {
      legend: { hidden: true },
    },
  };
}

export { getPieChartParamsFromBudget };
