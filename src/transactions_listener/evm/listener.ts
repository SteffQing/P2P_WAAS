import { parseAbi, parseAbiItem } from "viem";
import {
  process_erc20_logs,
  process_hot_wallet_logs,
  process_smart_wallet_logs,
} from "./utils/process_logs";
import { HOT_WALLET_CONTRACT } from "../../constants/evm/contracts";
import { getPublicClient } from "../../constants/evm/clients";
import { getTokens } from "../../constants/evm/tokens";
import { getEnvVariable } from "../../constants/config";

const INFURA_KEY = getEnvVariable("INFURA_KEY_3");
export default function setupListeners(id: ID, wallets: `0x${string}`[]) {
  const client = getPublicClient(id, INFURA_KEY);
  const tokens = getTokens(id);

  // Watch for Smart Wallet Events
  client.watchEvent({
    onLogs: (logs) => process_smart_wallet_logs(logs, id),
    address: wallets,
    events: parseAbi([
      "event ReceivedETH(uint amount)",
      "event SentETH(uint amount)",
      "event SentToken(string symbol, uint amount)",
    ]),
    strict: true,
  });

  // Watch for ERC20 Token Events
  client.watchEvent({
    address: tokens,
    onLogs: (logs) => process_erc20_logs(logs, id, client),
    event: parseAbiItem(
      "event Transfer(address indexed from, address indexed to, uint256 value)"
    ),
    args: { to: wallets },
    strict: true,
  });

  // Watch for Hot Wallet Transactions
  client.watchEvent({
    address: HOT_WALLET_CONTRACT,
    onLogs: (logs) => process_hot_wallet_logs(logs, id),
    events: parseAbi([
      "event SentETH(address sender, uint amount)",
      "event SentToken(address sender, string symbol, uint amount)",
    ]),
    strict: true,
  });
}
