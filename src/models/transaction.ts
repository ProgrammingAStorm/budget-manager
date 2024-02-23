export default interface Transaction {
  id: string | null;
  name: string;
  amount: number;
  year: string;
  month: string;
  category: string;
  subCategory: string;
}
