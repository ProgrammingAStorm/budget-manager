import { Category } from "../category";
import IdentityWise from "@/models/decorators/identityWise";

export interface Transaction extends IdentityWise {
  id: string;
  value: number;
  categoryId: string;
  name: string;
  comment: string;
  timestamp: Date;
}

export type TransactionsByCategory = {
  category: Category;
  transactions: Transaction[];
};
