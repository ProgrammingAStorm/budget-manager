import Enumberable from "linq";
import Transaction from "../../models/transaction";

function getCategoriesFromTransactions(
  transactions: Enumberable.IEnumerable<Transaction>
) {
  return transactions.select((t) => t.category).distinct();
}

export { getCategoriesFromTransactions };
