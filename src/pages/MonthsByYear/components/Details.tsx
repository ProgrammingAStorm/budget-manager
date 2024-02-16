import Transaction from "../../../models/transaction";

export interface DetailsProps {
  transactionsByMonthByYear: number[];
}

export default function Details({ transactionsByMonthByYear }: DetailsProps) {
  const [totalWithdrawls, totalDeposits] = getTotals(transactionsByMonthByYear);

  return (
    <>
      Total Withdrawls: {totalWithdrawls}
      Total Deposits: {totalDeposits}
      <div className="text-xl"> asd</div>
    </>
  );

  function getTotals(transactions: number[]) {
    return [getTotalWithdrawls(transactions), getTotalDeposits(transactions)];

    function getWithdrawlsFromTransactions(transactions: number[]) {
      return transactions.filter((transaction) => transaction < 0);
    }

    function getTotalWithdrawls(transactions: number[]) {
      return Math.abs(
        getWithdrawlsFromTransactions(transactions).reduce(
          (cur, prev) => cur + prev,
          0
        )
      );
    }

    function getTotalDeposits(transactions: number[]) {
      return getDepositsFromTransactions(transactions).reduce(
        (cur, prev) => cur + prev,
        0
      );
    }

    function getDepositsFromTransactions(transactions: number[]) {
      return transactions.filter((transaction) => transaction > 0);
    }
  }
}
