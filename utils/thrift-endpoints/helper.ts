import { SealedTransaction } from "../../src/thrift/api_types";
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
    fee: transaction.trxn.fee.commission,
    type: getType(transaction.trxn.type),
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
