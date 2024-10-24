import { createPublicClient, erc20Abi, http, parseAbi } from "viem";
import { tron } from "viem/chains";
import { contract_address, tronWeb } from "./config";

const TRON_GRID = process.env.TRON_GRID;
const client = createPublicClient({
  chain: tron,
  transport: http("https://api.trongrid.io/jsonrpc", { key: TRON_GRID }),
});

async function trx() {
  tronWeb.addListener("", () => {});
  const contract = tronWeb.contract(
    erc20Abi,
    "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"
  );
  const symbol = await contract.symbol().call();
  console.log(symbol);
}
trx();
