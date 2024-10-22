"use server";

import Table from "@/components/common/table";
import { TransactionsByCategory } from "@/models/transaction";
import { GetTransactionsByCategories } from "@/repo";

export default async function Home() {
  const categories = await GetTransactionsByCategories();

  return (
    <>
      <h1 className="text-4xl text-center">Budget Tracker</h1>

      {categories.map(MapToCategories)}
    </>
  );
}

function MapToCategories({ category, transactions }: TransactionsByCategory) {
  const transactionTotal = transactions
    .map((transaction) => transaction.value)
    .reduce((prev, cur) => prev + cur);

  return (
    <section
      key={category.id}
      className="p-4 shadow-md rounded-md bg-white max-w-full"
    >
      <h2 className="flex justify-between">
        <span>{category.name}</span>{" "}
        <span>{"$" + transactionTotal.toLocaleString()}</span>
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
