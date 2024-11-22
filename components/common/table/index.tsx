"use server";

import IdentityWise from "@/models/decorators/identityWise";
import { AwaitedReactNode } from "react";

interface ITableProps<T> {
  source: T[];
  dataSelector: DataSelector<T>;
  headers: string[];
  showIndices?: boolean;
}

type DataSelector<T> = {
  (source: T): string[];
};

interface TableRow {
  id: string;
  rowItems: string[];
}

export default async function Table<T extends IdentityWise>({
  source,
  dataSelector,
  headers,
  showIndices = true,
}: ITableProps<T>): Promise<AwaitedReactNode> {
  const tableRows = source.map(toTableRow(dataSelector));

  return (
    <table>
      <thead>
        <tr>
          {showIndices && (
            <th className="pr-3" role="table-index-header">
              #
            </th>
          )}
          {headers.map(toHeader)}
        </tr>
      </thead>
      <tbody>{tableRows.map(dataToRow(showIndices))}</tbody>
    </table>
  );

  function toTableRow(
    dataSelector: DataSelector<T>
  ): (source: T, index: number) => TableRow {
    return function (source: T) {
      return { id: source.id, rowItems: dataSelector(source) } as TableRow;
    };
  }

  function toHeader(header: string, index: number) {
    return (
      <th role="table-column-header" key={index} className="pr-3 last:pr-0">
        {header}
      </th>
    );
  }

  function dataToRow(showIndices: boolean) {
    return function Row({ id, rowItems }: TableRow, index: number) {
      return (
        <tr key={id} role="table-row">
          {showIndices && <td role="table-row-index">{index + 1}</td>}
          {rowItems.map((item, index) => (
            <td key={index} role="table-cell">
              {item}
            </td>
          ))}
        </tr>
      );
    };
  }
}
