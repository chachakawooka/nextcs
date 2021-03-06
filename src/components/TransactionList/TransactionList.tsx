import { Box, Spinner } from "grommet";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { TRANSACTIONS_QUERY } from "../../queries/transactions";

import {
  TransactionListVariables,
  TransactionList as TransactionListType,
  TransactionList_getTransactionList,
} from "../../queries/__generated__/TransactionList";

import { TransactionDataTable } from "./TransactionDataTable";

type Props = {};

export const TransactionList = ({}: Props) => {
  const [items, setItems] = useState<
    (TransactionList_getTransactionList | null)[]
  >([]);

  const [gridLoading, setGridLoading] = useState(false);

  const { data, fetchMore, loading, error } = useQuery<
    TransactionListType,
    TransactionListVariables
  >(TRANSACTIONS_QUERY, {
    variables: { offset: 0, limit: 100 },
  });

  if (loading) return <>Loading...</>;
  if (error) return <pre>{error.message}</pre>;
  const newItems = data?.getTransactionList;
  if (items.length === 0 && newItems) setItems(newItems);

  const onMore = async () => {
    setGridLoading(true);
    await fetchMore({
      variables: { offset: items.length, limit: 100 },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;
        if (fetchMoreResult && fetchMoreResult.getTransactionList) {
          setItems([...items, ...fetchMoreResult.getTransactionList]);
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
