import RedisInstance from "../db/redis";
import SupabaseInstance from "../db/supabase";
import alert from "../utils/tg_alert";

type Network = Database["public"]["Enums"]["Network"];

export async function getWallets(network: Network) {
  const wallets = await RedisInstance.smembers(network);
  return wallets;
}

export async function addWalletToDB(wallet: string, network: Network = "EVM") {
  const exists = await RedisInstance.sismember(network, wallet);
  if (exists === 1) return;

  const { error, statusText } = await SupabaseInstance.from("Wallet").insert([
    { address: wallet, network },
  ]);
  if (error) await alert(statusText);

  await RedisInstance.sadd(network, wallet);
}
