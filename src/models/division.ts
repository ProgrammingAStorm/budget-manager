export default interface Division {
  category: string;
  subCategory: string;
  subDivisions: Division[];
  percentage: number;
}
