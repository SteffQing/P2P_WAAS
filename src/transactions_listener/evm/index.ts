import { IDs } from "../../constants/evm";
import { getWallets } from "../../constants/wallets";
import setupListeners from "./listener";

async function main() {
  const wallets = (await getWallets("EVM")) as `0x${string}`[];
  IDs.forEach((ID) => setupListeners(ID, wallets)); // Synchronous event listener setup
}
main().catch((e) => console.error(e));
