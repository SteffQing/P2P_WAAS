import { IDs } from "../../constants/evm";
import deploy from "./deployer";

async function main() {
  await Promise.all(IDs.map(async (ID) => await deploy(ID)));
}
main().catch((e) => console.error(e));
