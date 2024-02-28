export default interface Division {
  category: string;
  subCategory: string | null;
  subDivisions: Division[];
}
