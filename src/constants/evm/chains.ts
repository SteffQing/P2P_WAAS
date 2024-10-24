import { type Chain } from "viem";
import {
  mainnet,
  arbitrum,
  polygon,
  bsc,
  base,
  avalanche,
  optimism,
} from "viem/chains";

export default function getChainAndRPC(chainId: ID): [Chain, string] {
  switch (chainId) {
    case 1:
      return [mainnet, ""];
    case 10:
      return [optimism, "optimism-"];
    case 56:
      return [bsc, "bsc-"];
    case 137:
      return [polygon, "polygon-"];
    case 8453:
      return [base, "base-"];
    case 42_161:
      return [arbitrum, "arbitrum-"];
    case 43_114:
      return [avalanche, "avalanche-"];
    default:
      return [mainnet, ""];
  }
}
