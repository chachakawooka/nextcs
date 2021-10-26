// @ts-nocheck
import getClient from "./client";
import { gql } from "apollo-server-micro";
import {
  WalletDataGetResult,
  SealedTransaction,
  TransactionsGetResult,
} from "../../src/thrift/api_types";
import { cleanWallet, cleanTransaction } from "./helper";
import bs58 from "bs58";

export const WalletTypeDefs = gql`
  type Wallet {
    id: String
    balance: Float
    lastTransactionId: String
  }

  type Query {
    getWallet(pubKey: String): Wallet
  }

  type Query {
    getWalletTransactionList(
      pubKey: String
      offset: Int
      limit: Int
    ): [Transaction]
  }
`;

export const WalletResolvers = {
  Query: {
    getWallet: async (_root: any, args: any) => {
      const client = getClient();
      let returnValue: any = {};
      await client
        .WalletDataGet(bs58.decode(args.pubKey))
        .then((res: WalletDataGetResult) => {
          returnValue = cleanWallet(res.walletData);
        });

      return returnValue;
    },
    getWalletTransactionList: async (_root: any, args: any) => {
      const client = getClient();
      let returnValue: any[] = [];

      await client
        .TransactionsGet(bs58.decode(args.pubKey), args.offset, args.limit)
        .then((res: TransactionsGetResult) => {
          res.transactions.forEach((transaction: SealedTransaction) => {
            returnValue.push(cleanTransaction(transaction));
          });
        });
      return returnValue;
    },
  },
};
