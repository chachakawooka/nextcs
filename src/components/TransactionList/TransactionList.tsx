import { InfiniteScroll, Box, Text } from "grommet";
import { Key, useEffect, useState } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { TRANSACTIONS_QUERY } from "../../queries/transactions";
import {
  TransactionListVariables,
  TransactionList as TransactionListType,
  TransactionList_getTransactionList,
} from "../../queries/__generated__/TransactionList";

type Props = {};

export const TransactionList = ({}: Props) => {
  const [items, setItems] = useState<
    (TransactionList_getTransactionList | null)[]
  >([]);

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
    await fetchMore({
      variables: { offset: items.length, limit: 100 },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;
        if (fetchMoreResult && fetchMoreResult.getTransactionList) {
          setItems([...items, ...fetchMoreResult.getTransactionList]);
        }
        return fetchMoreResult;
      },
    });
  };

  return (
    <div>
      {/* @ts-ignore */}
      <InfiniteScroll items={items} onMore={onMore}>
        {(item: any) => (
          <Box
            key={item.id}
            pad="medium"
            border={{ side: "bottom" }}
            align="center"
          >
            <Text>{item.id}</Text>
          </Box>
        )}
      </InfiniteScroll>
    </div>
  );
};
