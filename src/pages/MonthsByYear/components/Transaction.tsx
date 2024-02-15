import type Transaction from "../../../models/transaction";

export interface TransactionProps {
  transaction: Transaction;
}

export function Transaction({
  transaction: { name, amount },
}: TransactionProps) {
  return (
    <div>
      {name} {amount}
    </div>
  );
}
