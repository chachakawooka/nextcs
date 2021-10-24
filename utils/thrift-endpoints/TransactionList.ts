import getClient from "./client";
import { gql } from "apollo-server-micro";
import {
  TransactionsGetResult,
  SealedTransaction,
} from "../../src/thrift/api_types";
import { convertFraction, prependZeros } from "./convert";
import bs58 from "bs58";

export const TransactionListTypeDefs = gql`
  type Transaction {
    id: String
    from: String
    to: String
    amount: Float
    timestamp: String
    fee: Float
    type: String
  }

  type Query {
    getTransactionList(offset: Int, limit: Int): [Transaction]
  }
`;

const getType = (id: number): string => {
  switch (id) {
    case 0:
      return "Transfer";
    case 1:
      return "Contract Deploy";
    case 2:
      return "Contract Call";
    case 3:
      return "Contract State";
    case 4:
      return "Contract Replenish";
    case 5:
      return "Token Deploy";
    case 6:
      return "Token Transfer";
    case 7:
      return "Delegation";
    case 8:
      return "Delegation Revoke";
    case 9:
      return "Hold";
    case 10:
      return "Release";
    case 11:
      return "Cancel Hold";
    case 12:
      return "Delayed Transfer";
    case 13:
      return "Update Boostrap List";
    case 14:
      return "Update Settings";
    case 15:
      return "Malformed";
    case 16:
      return "Contract Emmitted";
    case 17:
      return "Utility";
    default:
      return "Unknown";
  }
};

export const TransactionListResolvers = {
  Query: {
    getTransactionList: async (_root: any, args: any) => {
      const client = getClient();
      let returnValue: any[] = [];
      await client
        .TransactionsListGet(args.offset, args.limit)
        .then((res: TransactionsGetResult) => {
          res.transactions.forEach((transaction: SealedTransaction) => {
            let amount = transaction.trxn.amount.integral ?? 0;
            amount =
              amount +
              convertFraction(transaction?.trxn?.amount?.fraction?.buffer);
            returnValue.push({
              id: transaction.id.poolSeq + "." + transaction.id.index,
              from: bs58.encode(Buffer.from(transaction.trxn.source)),
              to: bs58.encode(Buffer.from(transaction.trxn.target)),
              amount: amount,
              timestamp: transaction.trxn.timeCreation,
              fee: transaction.trxn.fee.commission,
              type: getType(transaction.trxn.type),
            });
          });
        });
      return returnValue;
    },
  },
};
