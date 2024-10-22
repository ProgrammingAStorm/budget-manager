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
  return (
    <section key={category.id} className="mt-10">
      <h2>{category.name}</h2>

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
