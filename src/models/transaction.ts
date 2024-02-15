import Category from "./category";
import SubCategory from "./subCategory";

export default interface Transaction {
  id: string;
  name?: string;
  amount: number;
  year: number;
  month: string;
  category: Category;
  subCategory: SubCategory;
}
