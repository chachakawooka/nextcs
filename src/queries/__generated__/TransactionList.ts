/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TransactionList
// ====================================================

export interface TransactionList_getTransactionList {
  __typename: "Transaction";
  id: string | null;
  from: string | null;
  to: string | null;
  timestamp: string | null;
  amount: number | null;
  fee: number | null;
}

export interface TransactionList {
  getTransactionList: TransactionList_getTransactionList[];
}

export interface TransactionListVariables {
  offset?: number | null;
  limit?: number | null;
}
