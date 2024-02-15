import { useParams } from "react-router-dom";
import Transaction from "../../models/transaction";
import { useAppSelector } from "../../redux/hooks";

export default function MonthByYear() {
  const month = useParams().month!;
  const transactionsByMonthByYear = useAppSelector(({ transactions }) =>
    getTransactionsByMonth(transactions)
  );
  const totalSpending = Math.abs(getTotalWithdrawls(transactionsByMonthByYear));

  return (
    <>
      {transactionsByMonthByYear &&
       transactionsByMonthByYear.length > 0 && (
        <>
          <div>Total Spending: {totalSpending}</div>

          {transactionsByMonthByYear.map(({ id, amount }) => {
            return (
              <div key={id}>{amount}</div>
            )
          })}
        </>
       )}
    </>
  );

  function getTransactionsByMonth(transactions: Transaction[]) {
    return transactions.filter((transaction) => transaction.month === month);
  }

  function getWithdrawlsFromTransactions(transactions: Transaction[]) {
    return transactions.filter(({amount}) => amount < 0);
  }

  function getTotalWithdrawls(transactions: Transaction[]) {
    return getWithdrawlsFromTransactions(transactions).map(({amount}) => amount)
                                                      .reduce((cur, prev) => cur + prev, 0)
  }
}
