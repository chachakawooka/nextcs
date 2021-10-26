// @ts-nocheck
import { Text, Box, DataTable } from "grommet";
import Link from "next/link";
import { TransactionList_getTransactionList } from "../../queries/__generated__/TransactionList";
import { Money, FormNextLink } from "grommet-icons";
import Moment from "react-moment";

type Props = {
  items: (TransactionList_getTransactionList | null)[];
  onMore: Promise;
};

export const TransactionDataTable = ({ items, onMore }: Props) => {
  console.log("wat");
  const columns = [
    {
      property: "id",
      header: <Text>ID</Text>,
      primary: true,
      render: (data: TransactionList_getTransactionList) => (
        <Text color="neutral-2">
          <Link href={`/transactions/${data.id}`}>{data.id}</Link>
        </Text>
      ),
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
              <Link href={`/wallet/${data.from}`}>{data.from}</Link>
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
            <Link href={`/wallet/${data.to}`}>{data.to}</Link>
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
  );
};
