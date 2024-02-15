import { useParams } from "react-router-dom";
import Transaction from "../../models/transaction";
import { useAppSelector } from "../../redux/hooks";
import Category from "./components/Category";
import Details from "./components/Details";

export default function MonthByYear() {
  const month = useParams().month!;
  const categories = useAppSelector((s) => s.categories);

  const transactionsByMonthByYear = useAppSelector(({ transactions }) =>
    getTransactionsByMonth(transactions)
  );
  const actualTransactionsByMonthByYear = getActualTransactions(
    useAppSelector(({ transactions }) => getTransactionsByMonth(transactions))
  );

  const categoriesInMonth = getCategoriesFromTransactions(
    transactionsByMonthByYear
  );

  return (
    <>
      {transactionsByMonthByYear && transactionsByMonthByYear.length > 0 && (
        <>
          <Details
            transactionsByMonthByYear={actualTransactionsByMonthByYear}
          />
          {categoriesInMonth.map((categoryId) => (
            <Category
              key={categoryId}
              category={
                categories.find((category) => category.id == categoryId)!
              }
            />
          ))}
        </>
      )}
    </>
  );

  function getTransactionsByMonth(transactions: Transaction[]) {
    return transactions.filter((transaction) => transaction.month === month);
  }

  function getCategoriesFromTransactions(transactions: Transaction[]) {
    return transactions
      .map((transaction) => transaction.category)
      .filter(
        (category, index, categories) => categories.indexOf(category) === index
      );
  }

  function getActualTransactions(transactions: Transaction[]) {
    return transactions.map(({ amount }) => amount);
  }
}
