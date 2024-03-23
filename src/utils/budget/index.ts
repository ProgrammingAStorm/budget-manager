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
  //TODO make it do the logic for withdrawls instead of all transactions

  const withdrawlsByCategories = getTransactionsByCategories(
    withdrawls,
    categories
  );
  const withdrawlsBySubCategories = getTransactionsBySubCategories(
    withdrawls,
    subCategories
  );

  const averageSpendingByCategories = getAverageSpendingByCategories(
    withdrawlsByCategories,
    categories
  );
  const percentageOfSpendingByCategories = getPercentageOfSpendingByCategories(
    categories,
    averageSpendingByCategories,
    totalIncome
  );

  const averageSpendingBySubCategory = getAverageSpendingBySubCategory(
    subCategories,
    withdrawlsBySubCategories
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
    divisions,
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
