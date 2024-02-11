import Category from "./category";
import Month from "./month";
import SubCategory from "./subCategory";

export default interface Transaction {
    id: string,
    amount: number,
    year: number,
    month: Month,
    category: Category,
    subCategory: SubCategory
} 