"use server";

import { Meta, StoryObj } from "@storybook/react";
import Table from ".";
import IdentityWise from "@/models/decorators/identityWise";
import { Transaction } from "@/models/transaction";
import { expect, waitFor, within } from "@storybook/test";

const meta: Meta<typeof Table> = {
  component: Table,
};
export default meta;

type TableStory<T extends IdentityWise> = StoryObj<typeof Table<T>>;

// TODO: Implement If Needed
// function generateTableStoryArgTypes(options: {}) {
//   return {};
// }

interface Person extends IdentityWise {
  name: string;
  height: string;
  weight: number;
  birthday: Date;
}

type PersonStory = TableStory<Person>;

export const Basic: PersonStory = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () =>
      expect(await canvas.findAllByRole("table-cell")).toHaveLength(32)
    );

    await waitFor(async () =>
      expect(
        (
          await canvas.findAllByRole("table-cell")
        ).filter((element) => element.textContent)
      ).toHaveLength(32)
    );

    await waitFor(async () =>
      (
        await canvas.findAllByRole("table-row-index")
      ).forEach((indexElement, index) =>
        expect(indexElement.textContent).toEqual((++index).toString())
      )
    );

    await waitFor(async () =>
      expect(await canvas.findByRole("table-index-header")).toHaveTextContent(
        "#"
      )
    );

    await waitFor(async () =>
      expect(await canvas.findAllByRole("table-column-header")).toHaveLength(4)
    );
  },
  args: {
    source: [
      {
        id: "1",
        name: "Joe",
        height: "5ft 6in",
        weight: 150,
        birthday: new Date(),
      },
      {
        id: "2",
        name: "Joe",
        height: "5ft 6in",
        weight: 150,
        birthday: new Date(),
      },
      {
        id: "3",
        name: "Joe",
        height: "5ft 6in",
        weight: 150,
        birthday: new Date(),
      },
      {
        id: "4",
        name: "Joe",
        height: "5ft 6in",
        weight: 150,
        birthday: new Date(),
      },
      {
        id: "5",
        name: "Joe",
        height: "5ft 6in",
        weight: 150,
        birthday: new Date(),
      },
      {
        id: "6",
        name: "Joe",
        height: "5ft 6in",
        weight: 150,
        birthday: new Date(),
      },
      {
        id: "7",
        name: "Joe",
        height: "5ft 6in",
        weight: 150,
        birthday: new Date(),
      },
      {
        id: "8",
        name: "Joe",
        height: "5ft 6in",
        weight: 150,
        birthday: new Date(),
      },
    ],
    dataSelector: (source) => [
      source.name,
      source.height,
      source.weight.toLocaleString() + "lbs",
      source.birthday.toLocaleDateString(),
    ],
    headers: ["Name", "Height", "Weight", "Birthday"],
  },
  argTypes: {
    dataSelector: {
      name: "dataSelector",
      description: "Selector method for row data.",
      control: {
        type: "inline-radio",
      },
      options: ["Name", "Height", "Weight", "Birthday"],
      mapping: {
        Name: (source: Person) => [source.name],
        Height: (source: Person) => [source.height],
        Weight: (source: Person) => [source.weight],
        Birthday: (source: Person) => [source.birthday],
      },
    },
  },
};

type TransactionStory = TableStory<Transaction>;

export const WithTransactions: TransactionStory = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () =>
      expect(canvas.queryByRole("table-row-index")).toBeNull()
    );

    await waitFor(async () =>
      expect(canvas.queryByRole("table-index-header")).toBeNull()
    );

    await waitFor(async () =>
      expect(await canvas.findAllByRole("table-cell")).toHaveLength(20)
    );

    await waitFor(async () =>
      expect(
        (
          await canvas.findAllByRole("table-cell")
        ).filter((element) => element.textContent)
      ).toHaveLength(10)
    );
  },
  args: {
    source: [
      {
        id: "1",
        value: 40,
        categoryId: "1",
        name: "",
        comment: "",
        timestamp: new Date(),
      },
      {
        id: "2",
        value: 30,
        categoryId: "1",
        name: "",
        comment: "",
        timestamp: new Date(),
      },
      {
        id: "3",
        value: 25,
        categoryId: "1",
        name: "",
        comment: "",
        timestamp: new Date(),
      },
      {
        id: "4",
        value: 1350,
        categoryId: "2",
        name: "",
        comment: "",
        timestamp: new Date(),
      },
      {
        id: "5",
        value: 1350,
        categoryId: "2",
        name: "",
        comment: "",
        timestamp: new Date(),
      },
    ],
    dataSelector: (transaction) => [
      transaction.name,
      "$" + transaction.value.toLocaleString(),
      transaction.comment,
      transaction.timestamp.toLocaleDateString(),
    ],
    headers: ["Name", "Value", "Comment", "Timestamp"],
    showIndices: false,
  },
  argTypes: {
    dataSelector: {
      name: "dataSelector",
      description: "Selector method for row data.",
      control: {
        type: "inline-radio",
      },
      options: ["Name", "Value", "Comment", "Timestamp"],
      mapping: {
        Name: (source: Transaction) => [source.name],
        Value: (source: Transaction) => [source.value.toLocaleString()],
        Comment: (source: Transaction) => [source.comment],
        Timestamp: (source: Transaction) => [
          source.timestamp.toLocaleDateString(),
        ],
      },
    },
  },
};

type EmptyStory = TableStory<never>;

export const Empty: EmptyStory = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () =>
      expect(canvas.queryByRole("table-cell")).toBeNull()
    );
  },
  args: {
    source: [],
    dataSelector: () => ["something"],
    headers: ["Name", "Value", "Comment", "Timestamp"],
  },
};
