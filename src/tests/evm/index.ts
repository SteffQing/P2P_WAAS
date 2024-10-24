import { IDs } from "../../constants/evm";
import getChainAndRPC from "../../constants/evm/chains";
import token_test from "./tokens";

export default async function main() {
  for (let id of IDs) {
    const token_Info = await token_test(id);
    console.log(`Token Info for Tokens on ${getChainAndRPC(id)[0].name}\n`);
    console.log(JSON.stringify(token_Info), "\n\n");
  }
}
