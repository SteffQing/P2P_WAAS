import { erc20Abi } from "viem";
import { getPublicClient } from "../../constants/evm/clients";
import { getTokens } from "../../constants/evm/tokens";

export default async function token_test(id: ID) {
  const tokens = getTokens(id);
  const client = getPublicClient(id);
  const token_Info = [];
  for (let token of tokens) {
    const symbol = await client.readContract({
      address: token,
      abi: erc20Abi,
      functionName: "symbol",
    });
    const name = await client.readContract({
      address: token,
      abi: erc20Abi,
      functionName: "name",
    });
    const decimals = await client.readContract({
      address: token,
      abi: erc20Abi,
      functionName: "decimals",
    });

    token_Info.push({ token, symbol, decimals, name });
  }

  return token_Info;
}
