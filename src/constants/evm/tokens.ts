export function getTokens(id: ID) {
  switch (id) {
    case 1:
      return ETH_Tokens;
    case 10:
      return OP_Tokens;
    case 56:
      return BSC_Tokens;
    case 137:
      return POL_Tokens;
    case 8453:
      return BASE_Tokens;
    case 42161:
      return ARB_Tokens;
    case 43_114:
      return AVAX_Tokens;

    default:
      return ETH_Tokens;
  }
}

// USDT & USDC
const ETH_Tokens = [
  "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
] as `0x${string}`[];
const BSC_Tokens = [
  "0x55d398326f99059fF775485246999027B3197955",
  "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
] as `0x${string}`[];
const POL_Tokens = [
  "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
] as `0x${string}`[];
const BASE_Tokens = [
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
] as `0x${string}`[]; // Does not have USDT
const ARB_Tokens = [
  "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
  "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
] as `0x${string}`[];
const OP_Tokens = [
  "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
  "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
] as `0x${string}`[];
const AVAX_Tokens = [
  "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
  "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
] as `0x${string}`[];
