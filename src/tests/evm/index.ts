import { IDs } from "../../constants/evm";
import getChainAndRPC from "../../constants/evm/chains";
import token_test from "./tokens";

export default async function main() {
  for (let id of IDs) {
    const name = getChainAndRPC(id)[0].name;
    try {
      const token_Info = await token_test(id);
      console.log(`Token Info for Tokens on ${name}`);
      console.log(JSON.stringify(token_Info), "\n\n");
    } catch (error) {
      console.error("Error querying token on " + name);
    }
  }
}
