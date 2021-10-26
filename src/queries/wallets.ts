import { gql } from "@apollo/client";

export const WALLET_QUERY = gql`
  query getWallet($pubKey: String) {
    getWallet(pubKey: $pubKey) {
      id
      balance
      lastTransactionId
    }
  }
`;

export const WALLET_TRANSACTIONS_QUERY = gql`
  query getWalletTransactionList($pubKey: String, $offset: Int, $limit: Int) {
    getWalletTransactionList(pubKey: $pubKey, offset: $offset, limit: $limit) {
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
