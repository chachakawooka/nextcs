import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { TransactionList as TransactionListComponent } from "./TransactionList";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "TransactionList",
  component: TransactionListComponent,
};

const Template: Story<ComponentProps<typeof TransactionListComponent>> = (
  args
) => <TransactionListComponent {...args} />;

export const TransactionList = Template.bind({});
TransactionList.args = {};
