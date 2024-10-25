import { parseAbiItem } from "viem";
import { DEPLOYER_CONTTRACT } from "../../constants/evm/contracts";
import { ABI } from "../../abi/Deployer";
import { addWalletToDB } from "../../constants/wallets";
import { getPublicClient, getWalletClient } from "../../constants/evm/clients";

const COUNT = 5;

export default async function deploy(id: ID) {
  const publicClient = getPublicClient(id);
  const walletClient = getWalletClient(id); // Default is Deployer Wallet

  const unwatch = publicClient.watchEvent({
    address: DEPLOYER_CONTTRACT,
    onLogs: (logs) =>
      logs.map(async (log) => await addWalletToDB(log.args.wallet)),
    event: parseAbiItem("event WalletCreated(address indexed wallet)"),
    strict: true,
  });

  for (let index = 0; index < COUNT; index++) {
    const hash = await walletClient.writeContract({
      address: DEPLOYER_CONTTRACT,
      abi: ABI,
      functionName: "deployWallet",
    });
    await publicClient.waitForTransactionReceipt({
      confirmations: 5,
      hash,
    });
  }

  return unwatch();
}
