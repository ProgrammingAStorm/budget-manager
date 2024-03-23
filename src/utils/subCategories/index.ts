import Enumerable from "linq";
import Transaction from "../../models/transaction";

function getSubCategoriesFromTransactions(
  transactions: Enumerable.IEnumerable<Transaction>
) {
  return transactions
    .select((transaction) => transaction.subCategory)
    .distinct();
}

export { getSubCategoriesFromTransactions };
