// @ts-nocheck
import { Box, Text, DataTable, Spinner } from "grommet";
import { FormNextLink, Money } from "grommet-icons";
import Moment from "react-moment";
import { useState } from "react";
import { useQuery } from "@apollo/client";
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

  const columns = [
    {
      property: "id",
      header: <Text>ID</Text>,
      primary: true,
    },
    {
      property: "type",
      header: <Text>Type</Text>,
      render: (data: TransactionList_getTransactionList) => (
        <Text size="small">{data.type}</Text>
      ),
    },
    {
      property: "timestamp",
      header: <Text>Age</Text>,
      render: (data: TransactionList_getTransactionList) => (
        <Text size="small">
          <Moment unix fromNow>
            {data.timestamp / 1000}
          </Moment>
        </Text>
      ),
    },
    {
      property: "from",
      header: <Text>From</Text>,
      render: (data: TransactionList_getTransactionList) => (
        <>
          <Box width="small">
            <Text truncate="tip" color="neutral-2">
              {data.from}
            </Text>
          </Box>
        </>
      ),
    },
    {
      property: "arrow",
      header: <Text />,
      render: (data: TransactionList_getTransactionList) => <FormNextLink />,
    },
    {
      property: "to",
      header: <Text>To</Text>,
      render: (data: TransactionList_getTransactionList) => (
        <Box width="small">
          <Text truncate="tip" color="neutral-2">
            {data.to}
          </Text>
        </Box>
      ),
    },
    {
      property: "value",
      header: <Text>Value</Text>,
      render: (data: TransactionList_getTransactionList) => (
        <Text>
          <Money size="small" color="accent-4" />
          {" " + data.amount} CS
        </Text>
      ),
    },
    {
      property: "Fee",
      header: <Text>Fee</Text>,
      render: (data: TransactionList_getTransactionList) => (
        <Text size="xsmall">{data.fee}</Text>
      ),
    },
  ];

  return (
    <div>
      <DataTable
        fill
        background={{
          header: { color: "brand" },
          body: ["light-1", "light-3"],
          footer: { color: "brand" },
        }}
        width="large"
        columns={columns}
        data={items}
        onMore={onMore}
      />
      {gridLoading && (
        <Box align="center">
          <Spinner size="xlarge" message="Loading More" />
        </Box>
      )}
    </div>
  );
};
