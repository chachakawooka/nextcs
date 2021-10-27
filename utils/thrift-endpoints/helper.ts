import { SealedTransaction, WalletData } from "../../src/thrift/api_types";
import bs58 from "bs58";

export const cleanTransaction = (transaction: SealedTransaction) => {
  let amount = transaction.trxn.amount.integral ?? 0;
  amount =
    amount + convertFraction(transaction?.trxn?.amount?.fraction?.buffer);

  return {
    id: transaction.id.poolSeq + "." + transaction.id.index,
    from: bs58.encode(Buffer.from(transaction.trxn.source)),
    to: bs58.encode(Buffer.from(transaction.trxn.target)),
    amount: amount,
    timestamp: transaction.trxn.timeCreation,
    fee: fee_to_double(transaction.trxn.fee.commission),
    type: getType(transaction.trxn.type),
  };
};

export const cleanWallet = (wallet: WalletData) => {
  let amount = wallet.balance.integral ?? 0;
  amount = amount + convertFraction(wallet?.balance?.fraction?.buffer);

  return {
    id: wallet.walletId,
    balance: amount,
    lastTransactionId: wallet.lastTransactionId,
  };
};

export const getType = (id: number): string => {
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

//Converts from Uint8 buffer to integer
export const convert = (buffer: any) => {
  var result = 0;
  for (var i = 0; i < buffer.length; i++) {
    result += buffer[i] * Math.pow(256, buffer.length - i - 1);
  }
  return result;
};

export const convertFraction = (Uint8Arr: any) => {
  let fraction = convert(Uint8Arr);
  fraction = prependZeros(fraction);
  return fraction;
};

export const prependZeros = (fraction: any) => {
  if (fraction === 0) {
    fraction = "0.0";
  } else {
    if (fraction.toString().length != 18) {
      fraction = fraction.toString().padStart(18, "0");
    }
  }
  fraction = "0." + fraction;
  return parseFloat(fraction);
};

export const fee = (v: number) => {
  let s = v > 0 ? 0 : 1;
  v = Math.abs(v);
  let exp = v === 0 ? 0 : Math.log10(v);
  exp = Math.floor(exp >= 0 ? exp + 0.5 : exp - 0.5);
  v /= Math.pow(10, exp);
  if (v >= 1) {
    v *= 0.1;
    ++exp;
  }
  v = Number((v * 1024).toFixed(0));
  return { exp: exp + 18, man: v === 1024 ? 1023 : v };
};

const fee_to_double = (fee: any) => {
  const kTensPows = [
    1e-18,
    1e-17,
    1e-16,
    1e-15,
    1e-14,
    1e-13,
    1e-12,
    1e-11,
    1e-10,
    1e-9,
    1e-8,
    1e-7,
    1e-6,
    1e-5,
    1e-4,
    1e-3,
    1e-2,
    1e-1,
    1,
    1e1,
    1e2,
    1e3,
    1e4,
    1e5,
    1e6,
    1e7,
    1e8,
    1e9,
    1e10,
    1e11,
    1e12,
    1e13,
  ];
  const sign = fee / 32768 != 0 ? 1 : -1;
  const fee_double_ =
    parseFloat((sign * (fee % 1024) * 1) / 1024) *
    kTensPows[Math.floor((fee % 32768) / 1024)];
  return fee_double_.toFixed(17); // toFixed(17) is to avoid rounding errors
};
