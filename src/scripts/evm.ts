import { generatePrivateKey, privateKeyToAddress } from "viem/accounts";
import fs from "fs";
import dotenv from "dotenv";
import { getWalletClient } from "../constants/evm/clients";
import { getEnvVariable } from "../constants/config";

// Function to write the updated environment variables to the .env file
function writeToEnv(envVariables: Record<string, string>) {
  const envConfig = dotenv.parse(fs.readFileSync(".env"));

  Object.assign(envConfig, envVariables);

  const updatedEnv = Object.keys(envConfig)
    .map((key) => `${key}="${envConfig[key]}"`)
    .join("\n");

  fs.writeFileSync(".env", updatedEnv);

  console.log(".env file has been updated with new keys.");
}

export async function genKeys() {
  const keys = {
    DEPLOYER_ADMIN: generatePrivateKey(),
    OWNER: generatePrivateKey(),
    SMARTWALLET_ADMIN: generatePrivateKey(),
    HOTWALLET_ADMIN: generatePrivateKey(),
  };

  // Write the keys to the .env file
  writeToEnv(keys);
}

export async function fundOwner(id: ID) {
  const client = getWalletClient(
    id,
    undefined,
    getEnvVariable("SMARTWALLET_ADMIN") as `0x${string}`
  );

  client.sendTransaction({
    to: privateKeyToAddress(getEnvVariable("DEPLOYER_ADMIN") as `0x${string}`),
    value: BigInt("100000000000000000"),
  });
  console.log("Funded");
}

export function getAddr() {
  const admins = {
    Owner: privateKeyToAddress(getEnvVariable("OWNER") as `0x${string}`),
    Deployer: privateKeyToAddress(
      getEnvVariable("DEPLOYER_ADMIN") as `0x${string}`
    ),
    SmartAdmin: privateKeyToAddress(
      getEnvVariable("SMARTWALLET_ADMIN") as `0x${string}`
    ),
    HotAdmin: privateKeyToAddress(
      getEnvVariable("HOTWALLET_ADMIN") as `0x${string}`
    ),
  };
  console.log(admins);
}
