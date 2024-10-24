import { privateKeyToAddress } from "viem/accounts";
import { ABI, BYTECODE } from "../../abi/Deployer";
import { getWalletClient } from "../../constants/evm/clients";

const INFURA_KEY = process.env.INFURA_KEY_2;
const PRIVATE_KEY = process.env.OWNER as `0x${string}`;

const DEPLOYER_ADMIN_KEY = process.env.DEPLOYER_ADMIN as `0x${string}`;
const HOTWALLET_ADMIN = process.env.HOTWALLET_ADMIN as `0x${string}`;
const SMARTTWALLET_ADMIN_KEY = process.env.SMARTWALLET_ADMIN as `0x${string}`;

function deploymentArgs() {
  const DEPLOYER_ADMIN = privateKeyToAddress(DEPLOYER_ADMIN_KEY);
  const SMARTTWALLET_ADMIN = privateKeyToAddress(SMARTTWALLET_ADMIN_KEY);
  return [DEPLOYER_ADMIN, HOTWALLET_ADMIN, SMARTTWALLET_ADMIN] as const;
}

export default async function deployContract(id: ID) {
  const walletClient = getWalletClient(id, INFURA_KEY, PRIVATE_KEY);

  const hash = await walletClient.deployContract({
    abi: ABI,
    bytecode: `0x${BYTECODE}`,
    args: deploymentArgs(),
  });

  return hash;
}
