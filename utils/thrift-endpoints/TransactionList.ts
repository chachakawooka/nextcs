import getClient from "./client";
import { gql } from "apollo-server-micro";
import {
  TransactionsGetResult,
  SealedTransaction,
} from "../../src/thrift/api_types";
import { cleanTransaction } from "./helper";

export const TransactionListTypeDefs = gql`
  type Query {
    getTransactionList(offset: Int, limit: Int): [Transaction]
  }
`;

export const TransactionListResolvers = {
  Query: {
    getTransactionList: async (_root: any, args: any) => {
      const client = getClient();
      let returnValue: any[] = [];

      await client
        .TransactionsListGet(args.offset, args.limit)
        .then((res: TransactionsGetResult) => {
          res.transactions.forEach((transaction: SealedTransaction) => {
            returnValue.push(cleanTransaction(transaction));
          });
        });
      return returnValue;
    },
  },
};
