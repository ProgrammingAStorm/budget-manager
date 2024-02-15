import Category from "../../../models/category";
import Transaction from "../../../models/transaction";
import { useAppSelector } from "../../../redux/hooks";
import { Transaction as TransactionComponent } from "./Transaction";

export interface CategoryProps {
  category: Category;
}

export default function Category({ category }: CategoryProps) {
  const transactionByCategory = getTransactionsByCategory(
    useAppSelector((s) => s.transactions)
  );
  return (
    <div>
      <div>{category.name}</div>

      {transactionByCategory.map((transaction) => (
        <TransactionComponent transaction={transaction} />
      ))}
    </div>
  );

  function getTransactionsByCategory(transactions: Transaction[]) {
    return transactions.filter(
      (transaction) => transaction.category === category.id
    );
  }
}
