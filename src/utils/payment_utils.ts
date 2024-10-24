import SupabaseInstance from "../db/supabase";
import alert from "./tg_alert";
import cuid from "cuid";

export type AssetType = Database["public"]["Enums"]["AssetType"];
export type TransactionType = Database["public"]["Enums"]["TransactionType"];

export async function getUserIdByWallet(walletAddress: string) {
  const { error, data, statusText } = await SupabaseInstance.from("Wallet")
    .select("userId")
    .eq("address", walletAddress);
  if (error) {
    await alert(statusText);
    throw "Wallet may not be existing 🥹";
  }

  const userId = data[0].userId;
  if (!userId) {
    await alert(walletAddress + " is not linked to any user");
    throw "Wallet may be existing but is not linked to a user 🫠";
  }
  return userId;
}

export async function getUserBalance(userId: string, asset: AssetType) {
  const { error, data, statusText } = await SupabaseInstance.from("Balance")
    .select("amount")
    .eq("userId", userId)
    .eq("assetType", asset);
  if (error) {
    await alert(statusText);
    throw "Balance could not be queried";
  }

  return data[0].amount;
}

export async function addTransaction(
  hash: string,
  crypto: AssetType,
  amount: number,
  userId: string,
  type: TransactionType = "Deposit"
) {
  const { error, statusText } = await SupabaseInstance.from(
    "Transaction"
  ).insert({
    hash,
    crypto,
    amount,
    userId,
    status: "Completed",
    id: cuid(),
    transactionType: type,
  });
  if (error) {
    await alert(statusText);
    throw "Error occured while attempting to create a transaction object for this deposit~";
  }
}
