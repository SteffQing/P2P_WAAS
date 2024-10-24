import SupabaseInstance from "../db/supabase";
import {
  addTransaction,
  AssetType,
  getUserBalance,
  getUserIdByWallet,
} from "./payment_utils";
import alert from "./tg_alert";

export async function deposit(
  recipient: string,
  amount: number,
  asset: AssetType,
  hash: string
) {
  try {
    const userId = await getUserIdByWallet(recipient);
    const currentBalance = await getUserBalance(userId, asset);

    const { error, statusText } = await SupabaseInstance.from("Balance")
      .update({ amount: currentBalance + amount })
      .eq("userId", userId)
      .eq("assetType", asset);
    if (error) {
      await alert(statusText);
      throw `Error in balance topup for user with ${userId} on ${asset}!`;
    }

    await addTransaction(hash, asset, amount, userId);
  } catch (error) {
    console.error(error);
    await alert(JSON.stringify(error));
  }
}

export async function withdraw(
  sender: string,
  amount: number,
  asset: AssetType,
  hash: string
) {
  try {
    const userId = await getUserIdByWallet(sender);
    const currentBalance = await getUserBalance(userId, asset);

    if (currentBalance < amount) {
      await alert("Insufficient balance for withdrawal");
      throw "Insufficient balance";
    }

    const { error, statusText } = await SupabaseInstance.from("Balance")
      .update({ amount: currentBalance - amount })
      .eq("userId", userId)
      .eq("assetType", asset);
    if (error) {
      await alert(statusText);
      throw `Error in balance withdrawal for user with ${userId} on ${asset}!`;
    }

    await addTransaction(hash, asset, amount, userId, "Withdraw");
  } catch (error) {
    console.error(error);
    await alert(JSON.stringify(error));
  }
}
