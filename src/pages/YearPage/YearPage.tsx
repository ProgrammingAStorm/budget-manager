import { Outlet } from "react-router-dom";
import MonthSelector from "./components/MonthSelector";
import Transaction from "../../models/transaction";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";

export default function YearPage() {
  const [isMonthSelected, setIsMonthSelected] = useState(false);

  const months = getMonthsFromTransactions(
    useAppSelector((s) => s.transactions)
  );

  function getMonthsFromTransactions(transactions: Transaction[]) {
    return transactions
      .map((transaction) => transaction.month)
      .filter((month, index, months) => months.indexOf(month) === index);
  }

  return (
    <>
      {!isMonthSelected && (
        <MonthSelector
          months={months}
          setIsMonthSelected={setIsMonthSelected}
        />
      )}

      <Outlet />
    </>
  );
}
