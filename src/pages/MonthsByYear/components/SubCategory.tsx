import type SubCategory from "../../../models/subCategory";
import type Transaction from "../../../models/transaction";
import { useAppSelector } from "../../../redux/hooks";
import { Transaction as TransactionComponent } from "./Transaction";

export interface SubCategoryProps {
  subCategoryId: string;
}

export default function SubCategory({ subCategoryId }: SubCategoryProps) {
  const subCategory = getCategoryById(
    useAppSelector(({ subCategories }) => subCategories)
  );
  const transactionsBySubCategory = getTransactionsBySubCategory(
    useAppSelector(({ transactions }) => transactions)
  );

  return (
    <div>
      {subCategory?.name}

      {transactionsBySubCategory.map((transaction) => (
        <TransactionComponent key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );

  function getCategoryById(subCategories: SubCategory[]) {
    return subCategories.find(({ id }) => id === subCategoryId);
  }

  function getTransactionsBySubCategory(transactions: Transaction[]) {
    return transactions.filter(
      (transaction) => transaction.subCategory === subCategoryId
    );
  }
}