import Budget from "../../models/budget";
import Transaction from "../../models/transaction";
import Enumerable from "linq";
import { getTransactionsByCategories } from "../transactions";
//import { store } from "../../redux/store";
import Division from "../../models/division";

function generateBudget(
  name: string,
  transactions: Enumerable.IEnumerable<Transaction>,
  categories: Enumerable.IEnumerable<string>,
  subCategories: Enumerable.IEnumerable<string>,
  subCategoriesByCategory: Enumerable.IDictionary<
    string,
    Enumerable.IEnumerable<string>
  >
): Budget {
  const totalIncome = getTotalIncomeFromTransactions(transactions);

  const transactionsByCategories = getTransactionsByCategories(
    transactions,
    categories
  );
  const transactionsBySubCategories = getTransactionsBySubCategories(
    transactions,
    subCategories
  );

  const averageSpendingByCategories = getAverageSpendingByCategories(
    transactionsByCategories,
    categories
  );
  const percentageOfSpendingByCategories = getPercentageOfSpendingByCategories(
    categories,
    averageSpendingByCategories,
    totalIncome
  );

  const averageSpendingBySubCategory = getAverageSpendingBySubCategory(
    subCategories,
    transactionsBySubCategories
  );
  const percentageOfSpendingBySubCategories =
    getPercentageOfSpendingBySubCategories(
      subCategories,
      averageSpendingBySubCategory,
      totalIncome
    );

  const divisions = generateDivisions(
    categories,
    subCategoriesByCategory,
    percentageOfSpendingByCategories,
    percentageOfSpendingBySubCategories
  );

  return {
    name,
    totalIncome,
    divisions: divisions,
  } as unknown as Budget;
}

function getTotalIncomeFromTransactions(
  transactions: Enumerable.IEnumerable<Transaction>
): number {
  return transactions
    .select(({ amount }) => amount)
    .where((amount) => amount > 0)
    .sum();
}

function getAverageSpendingByCategories(
  transactionsByCategories: Enumerable.IDictionary<
    string,
    Enumerable.IEnumerable<Transaction>
  >,
  categories: Enumerable.IEnumerable<string>
): Enumerable.IDictionary<string, number> {
  return categories.toDictionary(
    (category) => category,
    (category) => {
      const transactionsByCategory = transactionsByCategories.get(category);

      const totalExpendatures = transactionsByCategory.where(
        (transaction) => transaction.amount < 0
      );
      const totalSpending = totalExpendatures
        .select((transaction) => transaction.amount)
        .sum();

      return totalSpending / totalExpendatures.toArray().length;
    }
  );
}

function getPercentageOfSpendingByCategories(
  categories: Enumerable.IEnumerable<string>,
  averageSpendingByCategories: Enumerable.IDictionary<string, number>,
  totalIncome: number
): Enumerable.IDictionary<string, number> {
  return categories.toDictionary(
    (category) => category,
    (category) =>
      Math.abs(averageSpendingByCategories.get(category) / totalIncome)
  );
}

function generateDivisions(
  categories: Enumerable.IEnumerable<string>,
  subCategoriesByCategory: Enumerable.IDictionary<
    string,
    Enumerable.IEnumerable<string>
  >,
  percentageOfSpendingByCategories: Enumerable.IDictionary<string, number>,
  percentageOfSpendingBySubCategories: Enumerable.IDictionary<string, number>
): Division[] {
  return categories
    .select((category) => {
      const subCategories = subCategoriesByCategory.get(category);
      const percentage = percentageOfSpendingByCategories.get(category);

      if (subCategories.length === 0) {
        return {
          category,
          subCategory: category,
          percentage,
          subDivisions: [],
        } as unknown as Division;
      }

      return {
        category,
        percentage,
        subCategory: category,
        subDivisions: subCategories
          .select((subCategory) => {
            const subCategoryPercentage =
              percentageOfSpendingBySubCategories.get(subCategory);

            return {
              category,
              subCategory,
              percentage: subCategoryPercentage,
              subDivions: [],
            } as unknown as Division;
          })
          .toArray(),
      } as unknown as Division;
    })
    .toArray();
}

function getTransactionsBySubCategories(
  transactions: Enumerable.IEnumerable<Transaction>,
  subCategories: Enumerable.IEnumerable<string>
) {
  return subCategories.toDictionary(
    (subCategory) => subCategory,
    (subCategory) =>
      transactions.where((transaction) => {
        return transaction.subCategory === subCategory;
      })
  );
}

function getAverageSpendingBySubCategory(
  subCategories: Enumerable.IEnumerable<string>,
  transactionsBySubCategories: Enumerable.IDictionary<
    string,
    Enumerable.IEnumerable<Transaction>
  >
) {
  return subCategories.toDictionary(
    (subCategory) => subCategory,
    (subCategory) => {
      const transactionsBySubCategory =
        transactionsBySubCategories.get(subCategory);

      const totalExpendatures = transactionsBySubCategory.where(
        (transaction) => transaction.amount < 0
      );
      const totalSpending = totalExpendatures
        .select((transaction) => transaction.amount)
        .sum();

      return totalSpending / totalExpendatures.toArray().length;
    }
  );
}

function getPercentageOfSpendingBySubCategories(
  subCategories: Enumerable.IEnumerable<string>,
  averageSpendingBySubCategory: Enumerable.IDictionary<string, number>,
  totalIncome: number
) {
  return subCategories.toDictionary(
    (subCategory) => subCategory,
    (subCategory) =>
      Math.abs(averageSpendingBySubCategory.get(subCategory) / totalIncome)
  );
}

export { generateBudget };
