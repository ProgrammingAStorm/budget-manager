import Budget from "../../models/budget";
import Transaction from "../../models/transaction";
import Enumerable from "linq";
import {
  getTransactionsByCategories,
  getWithdrawlsFromTransactions,
} from "../transactions";
import Division from "../../models/division";
import { getCategoriesFromTransactions } from "../categories";
import { RootState } from "../../redux/store";
import { getSubCategoriesFromTransactions } from "../subCategories";

function generateBudget(
  name: string,
  totalIncome: number,
  withdrawls: Enumerable.IEnumerable<Transaction>,
  categories: Enumerable.IEnumerable<string>,
  subCategories: Enumerable.IEnumerable<string>,
  subCategoriesByCategory: Enumerable.IDictionary<
    string,
    Enumerable.IEnumerable<string>
  >
): Budget {
  const withdrawlsByCategories = getTransactionsByCategories(
    withdrawls,
    categories
  );
  const withdrawlsBySubCategories = getTransactionsBySubCategories(
    withdrawls,
    subCategories
  );

  const totalSpendingByCategories = getTotalSpendingByCategories(
    withdrawlsByCategories,
    categories
  );
  const percentageOfSpendingByCategories = getPercentageOfSpendingByCategories(
    categories,
    totalSpendingByCategories,
    totalIncome
  );

  const totalSpendingBySubCategory = getTotalSpendingBySubCategory(
    subCategories,
    withdrawlsBySubCategories
  );
  const percentageOfSpendingBySubCategories =
    getPercentageOfSpendingBySubCategories(
      subCategories,
      totalSpendingBySubCategory,
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
    divisions,
  } as unknown as Budget;
}
//move all of these to their respective utility files
function getTotalIncomeFromTransactions(
  transactions: Enumerable.IEnumerable<Transaction>
): number {
  return transactions
    .select(({ amount }) => amount)
    .where((amount) => amount > 0)
    .sum();
}

function getTotalSpendingByCategories(
  transactionsByCategories: Enumerable.IDictionary<
    string,
    Enumerable.IEnumerable<Transaction>
  >,
  categories: Enumerable.IEnumerable<string>
): Enumerable.IDictionary<string, number> {
  return categories.toDictionary(
    (category) => category,
    (category) => {
      return transactionsByCategories
        .get(category)
        .where((transaction) => transaction.amount < 0)
        .select((transaction) => transaction.amount)
        .sum();
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
    .where(
      (category) =>
        percentageOfSpendingByCategories.get(category) !== null ||
        !isNaN(percentageOfSpendingByCategories.get(category))
    )
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

function getTotalSpendingBySubCategory(
  subCategories: Enumerable.IEnumerable<string>,
  transactionsBySubCategories: Enumerable.IDictionary<
    string,
    Enumerable.IEnumerable<Transaction>
  >
) {
  return subCategories.toDictionary(
    (subCategory) => subCategory,
    (subCategory) => {
      return transactionsBySubCategories
        .get(subCategory)
        .where((transaction) => transaction.amount < 0)
        .select((transaction) => transaction.amount)
        .sum();
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

function prepareDataForBudgetGeneration(store: RootState) {
  const transactions = Enumerable.from<Transaction>(store.transactions);
  const withdrawls = getWithdrawlsFromTransactions(transactions);
  const categories = getCategoriesFromTransactions(withdrawls);
  const subCategories = getSubCategoriesFromTransactions(withdrawls);

  const totalIncome = getTotalIncomeFromTransactions(transactions);
  const subCategoriesByCategory = getSubCategoriesByCategory(categories);

  return {
    totalIncome,
    withdrawls,
    categories,
    subCategories,
    subCategoriesByCategory,
  };

  function getSubCategoriesByCategory(
    categories: Enumerable.IEnumerable<string>
  ) {
    const subCategories = Enumerable.from(store.subCategories);

    return categories.toDictionary(
      (category) => category,
      (category) =>
        subCategories
          .where((subCategories) => subCategories.parentCategory === category)
          .select((subCategory) => subCategory.id)
    );
  }
}

export { generateBudget, prepareDataForBudgetGeneration };
