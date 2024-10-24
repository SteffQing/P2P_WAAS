import { IDs } from "../../constants/evm";
import deploy from "./deployer";

export default async function evm() {
  await Promise.all(IDs.map(async (ID) => await deploy(ID)));
}
evm().catch((e) => console.error(e));
