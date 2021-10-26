import getClient from "./client";
import { gql } from "apollo-server-micro";
import { TransactionGetResult } from "../../src/thrift/api_types";
import { cleanTransaction } from "./helper";

export const TransactionTypeDefs = gql`
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
    getTransaction(poolSeq: Int, index: Int): Transaction
  }
`;

export const TransactionResolvers = {
  Query: {
    getTransaction: async (_root: any, args: any) => {
      const client = getClient();
      let returnValue: any = {};
      await client.TransactionGet(args).then((res: TransactionGetResult) => {
        returnValue = cleanTransaction(res.transaction);
      });
      return returnValue;
    },
  },
};
