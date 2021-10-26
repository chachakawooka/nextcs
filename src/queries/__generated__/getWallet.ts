/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getWallet
// ====================================================

export interface getWallet_getWallet {
  __typename: "Wallet";
  id: string | null;
  balance: number | null;
  lastTransactionId: string | null;
}

export interface getWallet {
  getWallet: getWallet_getWallet | null;
}

export interface getWalletVariables {
  pubKey?: string | null;
}
