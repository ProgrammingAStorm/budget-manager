import type SubCategory from "../../../models/subCategory";
import type Transaction from "../../../models/transaction";
import { useAppSelector } from "../../../redux/hooks";
import Details from "./Details";
import { Transaction as TransactionComponent } from "./Transaction";

export interface SubCategoryProps {
  subCategoryId: string;
  month: string;
}

export default function SubCategory({
  subCategoryId,
  month,
}: SubCategoryProps) {
  const subCategory = getCategoryById(
    useAppSelector(({ subCategories }) => subCategories)
  );
  const transactionsBySubCategory = getTransactionsBySubCategoryByMonth(
    useAppSelector(({ transactions }) => transactions)
  );

  return (
    <div>
      {subCategory?.name}

      <Details
        transactions={getActualTransactions(transactionsBySubCategory)}
      />

      {transactionsBySubCategory.map((transaction) => (
        <TransactionComponent key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );

  function getCategoryById(subCategories: SubCategory[]) {
    return subCategories.find(({ id }) => id === subCategoryId);
  }

  function getTransactionsBySubCategoryByMonth(transactions: Transaction[]) {
    return transactions.filter(
      (transaction) =>
        transaction.subCategory === subCategoryId && transaction.month === month
    );
  }

  function getActualTransactions(transactions: Transaction[]) {
    return transactions.map(({ amount }) => amount);
  }
}
