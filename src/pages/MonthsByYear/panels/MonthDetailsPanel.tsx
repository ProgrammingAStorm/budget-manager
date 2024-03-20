import Transaction from "../../../models/transaction";
import { useAppSelector } from "../../../redux/hooks";
import Details from "../components/Details";
import Category from "../components/Category";
import Panel from "../components/Panel";

interface MonthDetailsPanelProps {
  month: string;
}

export default function MonthDetailsPanel({ month }: MonthDetailsPanelProps) {
  const categories = useAppSelector((s) => s.categories);
  const transactionsByMonthByYear = useAppSelector(({ transactions }) =>
    getTransactionsByMonth(transactions)
  );
  const actualTransactionsByMonthByYear = getActualTransactions(
    useAppSelector(({ transactions }) => getTransactionsByMonth(transactions))
  );

  //TODO refactor with IEnumberable and use helper function :)
  const categoriesInMonth = getCategoriesFromTransactions(
    transactionsByMonthByYear
  );

  return (
    <Panel display="block">
      {transactionsByMonthByYear && transactionsByMonthByYear.length > 0 && (
        <>
          <Details transactions={actualTransactionsByMonthByYear} />
          {categoriesInMonth.map((categoryId) => (
            <Category
              key={categoryId}
              category={
                categories.find((category) => category.id == categoryId)!
              }
              month={month}
            />
          ))}
        </>
      )}
    </Panel>
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
