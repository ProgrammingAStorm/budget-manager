"use server";

import Table from "@/components/common/table";
import { TransactionsByCategory } from "@/models/transaction";
import { GetTransactionsByCategories } from "@/repo";

export default async function Home() {
  const transactionsByCategory = await GetTransactionsByCategories();

  const total: string = transactionsByCategory
    .flatMap(({ transactions }) => transactions)
    .map((transaction) => transaction.value)
    .reduce((prev, cur) => prev + cur)
    .toLocaleString();

  return (
    <main className="w-full min-h-screen grid place-items-center ">
      <header>
        <h1 className="text-4xl text-center">Budget Tracker</h1>
        <h2 className="text-2xl text-center">Transactions Total: ${total}</h2>
      </header>

      {transactionsByCategory.map(MapToCategoryDisplays)}
    </main>
  );
}

function MapToCategoryDisplays({
  category,
  transactions,
}: TransactionsByCategory) {
  const categoryTotal = transactions
    .map((transaction) => transaction.value)
    .reduce((prev, cur) => prev + cur);

  return (
    <section
      key={category.id}
      className="p-4 shadow-md rounded-md bg-white max-w-full"
    >
      <h2 className="flex justify-between">
        <span>{category.name}</span>{" "}
        <span>{"$" + categoryTotal.toLocaleString()}</span>
      </h2>

      <Table
        source={transactions}
        headerSelector={() => ["Name", "Value", "Comment", "Timestamp"]}
        dataSelector={(transaction) => [
          transaction.name,
          "$" + transaction.value.toLocaleString(),
          transaction.comment,
          transaction.timestamp.toString(),
        ]}
      />
    </section>
  );
}
