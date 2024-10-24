export function getTokens(id: ID) {
  switch (id) {
    case 11155111:
      return SEP_Tokens;
    case 421_614:
      return ARBSEP_Tokens;
    case 43_113:
      return FUJI_Tokens;
    case 80_002:
      return AMOY_Tokens;
    default:
      return SEP_Tokens;
  }
}

// USDT & USDC
const SEP_Tokens = [
  "0x9c3aEe8249Cc582Efd0232A0f76A10C10c2a195d",
  "0x8E780c77d78F893AE6d8896fcaD23B72046d421D",
] as `0x${string}`[];
const ARBSEP_Tokens = [
  "0xa9EBa0cc148FC3Ab7E9863Cdb6907cEcBD8B1dAD",
  "0xf75150d730CE97C1551e97df39c0A049024e4C25",
] as `0x${string}`[];
const FUJI_Tokens = [
  "0x27eFb6ed5c8BB0aF20652DE311a3639B8ff2FBa1",
  "0x5b5d1DD0D07506e139f6c1D508Ad0Cf88c81c219",
] as `0x${string}`[];
const AMOY_Tokens = [
  "0xa9EBa0cc148FC3Ab7E9863Cdb6907cEcBD8B1dAD",
] as `0x${string}`[]; // Does not have USDT
