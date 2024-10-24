import RedisInstance from "../db/redis";
import SupabaseInstance from "../db/supabase";

type Network = Database["public"]["Enums"]["Network"];

export async function getWallets(network: Network) {
  const wallets = await RedisInstance.smembers(network);
  return wallets;
}

export async function addWalletToDB(wallet: string, network: Network = "EVM") {
  await RedisInstance.sadd(network, wallet);
  await SupabaseInstance.from("Wallet").insert({
    address: wallet,
    network: network,
  });
}
