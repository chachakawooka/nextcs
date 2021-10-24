import type { NextPage } from "next";

import { Main } from "grommet";

import { TransactionList } from "../components/TransactionList";

const Home: NextPage = () => {
  return (
    <>
      <Main>
        <TransactionList />
      </Main>
    </>
  );
};

export default Home;
