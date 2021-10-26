import { Box, Spinner } from "grommet";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { WALLET_TRANSACTIONS_QUERY } from "../../queries/wallets";

import {
  getWalletTransactionList,
  getWalletTransactionList_getTransactionList,
  getWalletTransactionListVariables,
} from "../../queries/__generated__/getWalletTransactionList";

import { TransactionDataTable } from "./TransactionDataTable";

type Props = { pubKey: string };

export const WalletTransactionList = ({ pubKey }: Props) => {
  const [items, setItems] = useState<
    (getWalletTransactionList_getTransactionList | null)[]
  >([]);

  const [gridLoading, setGridLoading] = useState(false);

  const { data, fetchMore, loading, error } = useQuery<
    getWalletTransactionList,
    getWalletTransactionListVariables
  >(WALLET_TRANSACTIONS_QUERY, {
    variables: { pubKey, offset: 0, limit: 100 },
  });

  if (loading) return <>Loading...</>;
  if (error) return <pre>{error.message}</pre>;
  const newItems = data?.getWalletTransactionList;
  if (items.length === 0 && newItems) setItems(newItems);

  const onMore = async () => {
    setGridLoading(true);
    await fetchMore({
      variables: { offset: items.length, limit: 100 },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;
        if (fetchMoreResult && fetchMoreResult.getWalletTransactionList) {
          setItems([...items, ...fetchMoreResult.getWalletTransactionList]);
          setGridLoading(false);
        }
        return fetchMoreResult;
      },
    });
  };

  return (
    <div>
      <TransactionDataTable items={items} onMore={onMore} />
      {gridLoading && (
        <Box align="center">
          <Spinner size="xlarge" message="Loading More" />
        </Box>
      )}
    </div>
  );
};
