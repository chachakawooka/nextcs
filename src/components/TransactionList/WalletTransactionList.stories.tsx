import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { WalletTransactionList as WalletTransactionListComponent } from "./WalletTransactionList";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "WalletTransactionList",
  component: WalletTransactionListComponent,
};

const Template: Story<ComponentProps<typeof WalletTransactionListComponent>> = (
  args
) => <WalletTransactionListComponent {...args} />;

export const WalletTransactionList = Template.bind({});
WalletTransactionList.args = {
  pubKey: "EAWyN1Zmy8Jy22sdo1E1SMdnMMJRNRVesTAorLcrLFtu",
};
