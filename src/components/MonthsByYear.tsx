import { useParams } from "react-router-dom";
import Transaction from "../models/transaction";
import { useAppSelector } from "../redux/hooks";

export default function MonthByYear() {
  const month = useParams().month!;

  const transactionsByMonthByYear = useAppSelector(({ transactions }) =>
    getTransactionsByMonth(transactions)
  );

  function getTransactionsByMonth(transactions: Transaction[]) {
    return transactions.filter((transaction) => transaction.month === month);
  }

  return (
    <>
      {transactionsByMonthByYear.map(({ id, amount }) => (
        <div key={id}>{amount}</div>
      ))}
    </>
  );
}
