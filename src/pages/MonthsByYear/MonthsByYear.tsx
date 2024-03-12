import { useParams } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import MonthDetailsPanel from "./panels/MonthDetailsPanel";
import BudgetReportPanel from "./panels/BudgetReportPanel";

export default function MonthByYear() {
  const month = useParams().month;
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_: unknown, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        aria-label="Month Page Tabs"
        component={"nav"}
      >
        <Tab label="Details" />
        <Tab label="Budget Report" />
      </Tabs>

      {(() => {
        return {
          0: <MonthDetailsPanel month={month!} />,
          1: <BudgetReportPanel />,
        }[tabIndex];
      })()}
    </>
  );
}
