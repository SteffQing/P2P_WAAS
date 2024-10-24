"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tronWeb = void 0;
exports.contract_address = contract_address;
var tronweb_1 = require("tronweb");
var tronWeb = new tronweb_1.TronWeb({
    fullHost: "https://api.trongrid.io",
    eventServer: "https://api.trongrid.io",
});
exports.tronWeb = tronWeb;
function contract_address(address) {
    var hexAddress = tronWeb.address.toHex(address);
    return tronWeb.address.toChecksumAddress(hexAddress);
}
