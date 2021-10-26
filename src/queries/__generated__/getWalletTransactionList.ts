/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getWalletTransactionList
// ====================================================

export interface getWalletTransactionList_getTransactionList {
  __typename: "Transaction";
  id: string | null;
  from: string | null;
  to: string | null;
  timestamp: string | null;
  amount: number | null;
  fee: number | null;
  type: string | null;
}

export interface getWalletTransactionList {
  getTransactionList: (getWalletTransactionList_getTransactionList | null)[] | null;
}

export interface getWalletTransactionListVariables {
  pubKey?: string | null;
  offset?: number | null;
  limit?: number | null;
}
