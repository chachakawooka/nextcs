import getClient from "./client";
import { gql } from "apollo-server-micro";
import {
  TransactionsGetResult,
  SealedTransaction,
} from "../../thrift/api_types";
import bs58 from "bs58";

export const TransactionListTypeDefs = gql`
  type Transaction {
    id: String
    from: String
    to: String
    amount: Float
    timestamp: String
    fee: Float
  }

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
            returnValue.push({
              id: transaction.id.poolSeq + "." + transaction.id.index,
              from: bs58.encode(Buffer.from(transaction.trxn.source)),
              to: bs58.encode(Buffer.from(transaction.trxn.target)),
              amount: transaction.trxn.amount.integral,
              timestamp: transaction.trxn.timeCreation,
              fee: transaction.trxn.fee.commission,
            });
          });
        });
      return returnValue;
    },
  },
};
