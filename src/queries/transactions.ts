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
      type
    }
  }
`;

export const TRANSACTION_QUERY = gql`
  query Transaction($poolSeq: Int, $index: Int) {
    getTransaction(poolSeq: $poolSeq, index: $index) {
      id
      from
      to
      timestamp
      amount
      fee
      type
    }
  }
`;
