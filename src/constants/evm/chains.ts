import { type Chain } from "viem";
import {
  sepolia,
  arbitrumSepolia,
  avalancheFuji,
  polygonAmoy,
} from "viem/chains";

export default function getChainAndRPC(chainId: ID): [Chain, string] {
  switch (chainId) {
    case 11155111:
      return [sepolia, "sepolia"];
    case 421_614:
      return [arbitrumSepolia, "arbitrum-sepolia"];
    case 43_113:
      return [avalancheFuji, "avalanche-fuji"];
    case 80_002:
      return [polygonAmoy, "polygon-amoy"];
    default:
      return [sepolia, "sepolia"];
  }
}
