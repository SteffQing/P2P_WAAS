import { IDs } from "../../constants/evm";
import deploy from "./deployer";

export default async function main() {
  const hashes = await Promise.all(IDs.map(async (ID) => await deploy(ID)));
  console.log(hashes);
}
main().catch((e) => console.error(e));
