import Division from "./division";

export default interface Budget {
  id: string;
  name: string;
  totalIncome: number;
  divisions: Division[];
}
