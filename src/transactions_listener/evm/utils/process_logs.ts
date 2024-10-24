import { formatEther, formatUnits, parseAbi, PublicClient } from "viem";
import {
  depositETH,
  depositToken,
  withdrawETH,
  withdrawToken,
} from "./process_txns";

const get_amount = (amount: bigint, id: ID, isETH: boolean = true) => {
  const isBsc = id === 56;
  if (isETH) {
    return Number(formatEther(amount));
  }
  // isToken -> USDT | USDC
  if (isBsc) return Number(formatEther(amount)); //18 on BSC
  return Number(formatUnits(amount, 6));
};

export function process_smart_wallet_logs(logs: SmartWalletLogs, id: ID) {
  logs.map(async (log) => {
    const { eventName, transactionHash, args, address } = log;
    switch (eventName) {
      case "ReceivedETH":
        await depositETH(
          id,
          get_amount(args.amount, id),
          address,
          transactionHash
        );
        break;
      case "SentETH":
        await withdrawETH(
          id,
          get_amount(args.amount, id),
          address,
          transactionHash
        );
        break;
      case "SentToken":
        await withdrawToken(
          get_amount(args.amount, id, false),
          address,
          args.symbol,
          transactionHash
        );
        break;
    }
  });
}
export function process_erc20_logs(
  logs: Erc20Logs,
  id: ID,
  client: PublicClient
) {
  logs.map(async (log) => {
    const { transactionHash, args, address } = log;
    const symbol = await client.readContract({
      address: address,
      abi: parseAbi(["function symbol() view returns (string memory)"]),
      functionName: "symbol",
    });
    await depositToken(
      id,
      get_amount(args.value, id, false),
      args.to,
      symbol.toUpperCase(),
      transactionHash,
      address
    );
  });
}
export function process_hot_wallet_logs(logs: HotWalletLogs, id: ID) {
  logs.map(async (log) => {
    const { eventName, transactionHash, args } = log;
    switch (eventName) {
      case "SentETH":
        await withdrawETH(
          id,
          get_amount(args.amount, id),
          args.sender,
          transactionHash
        );
        break;
      case "SentToken":
        await withdrawToken(
          get_amount(args.amount, id, false),
          args.sender,
          args.symbol,
          transactionHash
        );
        break;
    }
  });
}
