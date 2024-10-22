"use server";

import { AwaitedReactNode } from "react";

interface ITableProps<T> {
  source: T[];
  dataSelector: DataSelector<T>;
  headerSelector: HeaderSelector;
}

type DataSelector<T> = {
  (source: T): string[];
};

type HeaderSelector = {
  (): string[];
};

export default async function Table<T>({
  source,
  dataSelector,
  headerSelector,
}: ITableProps<T>): Promise<AwaitedReactNode> {
  const data = source.map(dataSelector);
  const headers = headerSelector();

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          {headers.map(ToHeader)}
        </tr>
      </thead>

      <tbody>{data.map(DataToRow)}</tbody>
    </table>
  );
}

function ToHeader(header: string, index: number) {
  return <th key={index}>{header}</th>;
}

function DataToRow(data: string[], index: number) {
  return (
    <tr key={index}>
      <td>{index + 1}</td>
      {data.map((value, index) => (
        <td key={index}>{value}</td>
      ))}
    </tr>
  );
}
