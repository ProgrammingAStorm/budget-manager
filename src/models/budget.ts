import Division from "./division";

export default interface Budget {
  id: string;
  totalIncome: number;
  divisions: Division[];
}
