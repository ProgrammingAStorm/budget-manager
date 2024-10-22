import { Category } from "@/models/category";
import { Transaction, TransactionsByCategory } from "@/models/transaction";

export const GetCategories = async (): Promise<Category[]> =>
  fetch("http://localhost:3001/categories").then((res) => res.json());

export const GetTransactionsByCategoryId = async (
  id: string
): Promise<Transaction[]> =>
  fetch(`http://localhost:3001/transactions?categoryId=${id}`).then((res) =>
    res.json()
  );

export const GetTransactionsByCategories = async (): Promise<
  TransactionsByCategory[]
> =>
  Promise.all(
    (await GetCategories()).map(async (category) => {
      return {
        category,
        transactions: await GetTransactionsByCategoryId(category.id),
      };
    })
  );
