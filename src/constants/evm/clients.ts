import { createPublicClient, createWalletClient, http } from "viem";
import getChainAndRPC from "./chains";
import { privateKeyToAccount } from "viem/accounts";
import { getEnvVariable } from "../config";

const INFURA_KEY = getEnvVariable("INFURA_KEY_1");
const PRIVATE_KEY = getEnvVariable("DEPLOYER_ADMIN") as `0x${string}`;

export function getPublicClient(id: ID, INFURA_KEY_?: string) {
  const [network, network_url] = getChainAndRPC(id);
  const url = `https://${network_url}.infura.io/v3/${
    INFURA_KEY_ ?? INFURA_KEY
  }`;

  return createPublicClient({
    chain: network,
    transport: http(url),
  });
}

export function getWalletClient(
  id: ID,
  INFURA_KEY_?: string,
  PRIVATE_KEY_?: `0x${string}`
) {
  const [network, network_url] = getChainAndRPC(id);
  const url = `https://${network_url}.infura.io/v3/${
    INFURA_KEY_ ?? INFURA_KEY
  }`;

  return createWalletClient({
    account: privateKeyToAccount(PRIVATE_KEY_ ?? PRIVATE_KEY),
    chain: network,
    transport: http(url),
  });
}
