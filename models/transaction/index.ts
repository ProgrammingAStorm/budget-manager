import { Category } from "../category";

export type Transaction = {
  id: string;
  value: number;
  categoryId: string;
  name: string;
  comment: string;
  timestamp: Date;
};

export type TransactionsByCategory = {
  category: Category;
  transactions: Transaction[];
};
