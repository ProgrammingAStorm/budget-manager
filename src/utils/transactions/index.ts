import Enumberable from "linq";
import Transaction from "../../models/transaction";

function getTransactionsByCategories(
  transactions: Enumberable.IEnumerable<Transaction>,
  categories: Enumberable.IEnumerable<string>
): Enumberable.IDictionary<string, Enumberable.IEnumerable<Transaction>> {
  return categories.toDictionary(
    (category) => category,
    (category) =>
      transactions.where((transaction) => transaction.category === category)
  );
}

export { getTransactionsByCategories };
