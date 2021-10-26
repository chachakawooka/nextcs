import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import { Box, Grid, Heading, Text } from "grommet";
import { GetServerSideProps } from "next";
import { WALLET_QUERY, WALLET_TRANSACTIONS_QUERY } from "../../queries/wallets";
import { client } from "../../utils/apollo";

import { getWallet_getWallet } from "../../queries/__generated__/getWallet";

import { WalletTransactionList } from "../../components/TransactionList";

type Data = {
  wallet: getWallet_getWallet;
};

const Wallet = ({ wallet }: Data) => {
  const router = useRouter();
  const { key } = router.query;

  return (
    <Box>
      <Heading level={1} textAlign="center" fill>
        Account: {key}
      </Heading>
      <Box align="left">
        <Heading level="2" size="small">
          Balance
        </Heading>
        <Text>{wallet.balance} CS</Text>
      </Box>

      <Box align="center" pad="medium">
        <Heading level="2">Transactions</Heading>
        <WalletTransactionList pubKey={key ? key.toString() : ""} />
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let pubKey = context.query.key;

  const data = await client.query({
    query: WALLET_QUERY,
    variables: { pubKey: pubKey },
  });
  const wallet = data.data.getWallet;

  return {
    props: {
      wallet,
    },
  };
};

export default Wallet;
