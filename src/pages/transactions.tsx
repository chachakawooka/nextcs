import type { NextPage } from "next";

import { Main } from "grommet";

import { TransactionList } from "../components/TransactionList";

const Transactions: NextPage = () => {
  return (
    <>
      <Main>
        <TransactionList />
      </Main>
    </>
  );
};

export default Transactions;
