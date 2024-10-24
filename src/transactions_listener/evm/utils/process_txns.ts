// In depositToken, use SmartWalletClient to deposit to Hot Wallet

import { ABI } from "../../../abi/SmartWallet";
import getChainAndRPC from "../../../constants/evm/chains";
import {
  getPublicClient,
  getWalletClient,
} from "../../../constants/evm/clients";
import { getWithdrawalFees } from "../../../constants/evm/fees";
import { AssetType } from "../../../utils/payment_utils";
import { deposit, withdraw } from "../../../utils/payments";

const SMARTWALLET_ADMIN = process.env.SMARTWALLET_ADMIN as `0x${string}`;
const INFURA_KEY = process.env.INFURA_KEY_3;

async function depositETH(
  id: ID,
  amount: number,
  address: string,
  hash: string
) {
  const symbol = getChainAndRPC(id)[0].nativeCurrency.symbol as AssetType;
  await deposit(address, amount, symbol, hash);
}

async function withdrawETH(
  id: ID,
  amount: number,
  address: string,
  hash: string
) {
  const symbol = getChainAndRPC(id)[0].nativeCurrency.symbol as AssetType;
  await withdraw(address, amount, symbol, hash);
}

async function withdrawToken(
  amount: number,
  address: string,
  symbol: string,
  hash: string
) {
  console.log("Withdraw Token: ", amount, symbol, address, hash);
  await withdraw(address, amount, symbol as AssetType, hash);
}

const MIN_TOKEN_AMOUNT = 1;
async function depositToken(
  id: ID,
  amount: number,
  address: `0x${string}`,
  symbol: string,
  hash: string,
  token_address: `0x${string}`
) {
  if (amount > MIN_TOKEN_AMOUNT) {
    const pubClient = getPublicClient(id);
    const fee = await pubClient.estimateContractGas({
      address,
      abi: ABI,
      functionName: "depositERC20Token",
      args: [token_address],
    });
    const withdrawalFee = await getWithdrawalFees(id);
    const totalFees = Number(fee) + withdrawalFee.tokenFees;
    if (amount < totalFees) return;
    const client = getWalletClient(id, INFURA_KEY, SMARTWALLET_ADMIN);
    await client.writeContract({
      address: address,
      abi: ABI,
      functionName: "depositERC20Token",
      args: [token_address],
    });
  }
  console.log("Deposit Token: ", amount, symbol, address, hash);
  await deposit(address, amount, symbol as AssetType, hash);
}

export { depositETH, depositToken, withdrawETH, withdrawToken };
