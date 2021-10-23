import { gql } from "@apollo/client";

export const TRANSACTIONS_QUERY = gql`
  query TransactionList($offset: Int, $limit: Int) {
    getTransactionList(offset: $offset, limit: $limit) {
      id
      from
      to
      timestamp
      amount
      fee
    }
  }
`;
