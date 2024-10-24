import { TronWeb } from "tronweb";

const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io",
  eventServer: "https://api.trongrid.io",
});

function contract_address(address: string) {
  const hexAddress = tronWeb.address.toHex(address);
  return tronWeb.address.toChecksumAddress(hexAddress) as `0x${string}`;
}

export { tronWeb, contract_address };
