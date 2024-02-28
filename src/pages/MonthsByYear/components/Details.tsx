export interface DetailsProps {
  transactions: number[];
}

export default function Details({ transactions }: DetailsProps) {
  const [totalWithdrawls, totalDeposits] = getTotals(transactions);

  return (
    <>
      Total Withdrawls: {totalWithdrawls}
      Total Deposits: {totalDeposits}
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
