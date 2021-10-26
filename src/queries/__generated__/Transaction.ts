/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Transaction
// ====================================================

export interface Transaction_getTransaction {
  __typename: "Transaction";
  id: string | null;
  from: string | null;
  to: string | null;
  timestamp: string | null;
  amount: number | null;
  fee: number | null;
  type: string | null;
}

export interface Transaction {
  getTransaction: Transaction_getTransaction | null;
}

export interface TransactionVariables {
  poolSeq?: number | null;
  index?: number | null;
}
