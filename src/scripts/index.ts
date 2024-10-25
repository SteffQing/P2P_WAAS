import { IDs } from "../constants/evm";
import { addWalletToDB, getWallets } from "../constants/wallets";
import { fundOwner, genKeys, getAddr } from "./evm";

async function main() {
  //   await genKeys();
  // for (let id of IDs) {
  //   await fundOwner(id);
  // }
  // getAddr();
  const wallets = await getWallets("EVM");
  console.log(wallets);
  for (let wallet of wallets) {
    await addWalletToDB(wallet);
  }
}
main();
