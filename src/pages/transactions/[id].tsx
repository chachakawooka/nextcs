import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import { Box, Grid, Heading } from "grommet";
import { GetServerSideProps } from "next";
import { TRANSACTION_QUERY } from "../../queries/transactions";
import { client } from "../../utils/apollo";
import { Transaction_getTransaction } from "../../queries/__generated__/Transaction";

type Data = {
  transaction: Transaction_getTransaction;
};

const Transaction = ({ transaction }: Data) => {
  return (
    <Box>
      <Heading level={1} textAlign="center" fill>
        Transaction: {transaction.id}
      </Heading>
      <Grid columns="1/3" gap="medium" justify="center">
        <Box align="left">
          <Heading level="2" size="small">
            From
          </Heading>
          {transaction.from}
        </Box>
        <Box align="center">
          <Heading level="2" size="small">
            Amount
          </Heading>
          {transaction.amount} CS
        </Box>
        <Box align="right">
          <Heading level="2" size="small" textAlign="end">
            To
          </Heading>
          {transaction.to}
        </Box>
      </Grid>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  /* @ts-ignore */
  let args = context.query.id.split(".");

  const data = await client.query({
    query: TRANSACTION_QUERY,
    variables: { poolSeq: parseInt(args[0]), index: parseInt(args[1]) },
  });

  const transaction = data.data.getTransaction;

  return {
    props: {
      transaction,
    },
  };
};

export default Transaction;
