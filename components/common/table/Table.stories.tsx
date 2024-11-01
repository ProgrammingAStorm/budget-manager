"use server";

import { Meta, StoryObj } from "@storybook/react";
import Table from ".";

const meta: Meta<typeof Table> = {
  component: Table,
};
export default meta;

type PersonStory = StoryObj<typeof Table<Person>>;

// interface TemplateData {}

// const Template = (args: ITableProps<TemplateData>) => <Table {...args} />;

// export const BasicTable = Template.bind({});

// console.log(BasicTable.arguments);

type Person = {
  name: string;
  height: string;
  weight: number;
  birthday: Date;
};

export const Primary: PersonStory = {
  args: {
    source: [
      {
        name: "Joe",
        height: "5ft 6in",
        weight: 150,
        birthday: new Date(),
      },
      {
        name: "Joe",
        height: "5ft 6in",
        weight: 150,
        birthday: new Date(),
      },
      {
        name: "Joe",
        height: "5ft 6in",
        weight: 150,
        birthday: new Date(),
      },
      {
        name: "Joe",
        height: "5ft 6in",
        weight: 150,
        birthday: new Date(),
      },
      {
        name: "Joe",
        height: "5ft 6in",
        weight: 150,
        birthday: new Date(),
      },

      {
        name: "Joe",
        height: "5ft 6in",
        weight: 150,
        birthday: new Date(),
      },
      {
        name: "Joe",
        height: "5ft 6in",
        weight: 150,
        birthday: new Date(),
      },
      {
        name: "Joe",
        height: "5ft 6in",
        weight: 150,
        birthday: new Date(),
      },
    ],
    dataSelector: (source: Person) => [source.name],
    headerSelector: () => ["Name"],
  },
};
