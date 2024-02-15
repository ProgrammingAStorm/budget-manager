import { useParams } from "react-router-dom";
import Transaction from "../../models/transaction";
import { useAppSelector } from "../../redux/hooks";
import Category from "./components/Category";

export default function MonthByYear() {
  const month = useParams().month!;
  const categories = useAppSelector((s) => s.categories);
  const transactionsByMonthByYear = useAppSelector(({ transactions }) =>
    getTransactionsByMonth(transactions)
  );
  const totalSpending = Math.abs(getTotalWithdrawls(transactionsByMonthByYear));
  const categoriesInMonth = getCategoriesFromTransactions(
    transactionsByMonthByYear
  );

  return (
    <>
      {transactionsByMonthByYear && transactionsByMonthByYear.length > 0 && (
        <>
          <div>Total Spending: -${totalSpending.toLocaleString()}</div>

          {categoriesInMonth.map((categoryId) => (
            <Category
              key={categoryId}
              category={
                categories.find((category) => category.id == categoryId)!
              }
            />
          ))}

          {/* {transactionsByMonthByYear.map(({ id, amount }) => {
            return <div key={id}>{amount}</div>;
          })} */}
        </>
      )}
    </>
  );

  function getTransactionsByMonth(transactions: Transaction[]) {
    return transactions.filter((transaction) => transaction.month === month);
  }

  function getWithdrawlsFromTransactions(transactions: Transaction[]) {
    return transactions.filter(({ amount }) => amount < 0);
  }

  function getTotalWithdrawls(transactions: Transaction[]) {
    return getWithdrawlsFromTransactions(transactions)
      .map(({ amount }) => amount)
      .reduce((cur, prev) => cur + prev, 0);
  }

  function getCategoriesFromTransactions(transactions: Transaction[]) {
    return transactions
      .map((transaction) => transaction.category)
      .filter(
        (category, index, categories) => categories.indexOf(category) === index
      );
  }
}
