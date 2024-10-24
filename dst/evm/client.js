"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicClient = getPublicClient;
exports.getWalletClient = getWalletClient;
var viem_1 = require("viem");
var accounts_1 = require("viem/accounts");
var chains_1 = require("viem/chains");
var Infura_Key = process.env.INFURA_1;
var PRIVATE_KEY = process.env.PRIVATE_KEY;
function getChain(chainId) {
    switch (chainId) {
        case 1:
            return [chains_1.mainnet, ""];
        case 10:
            return [chains_1.optimism, "optimism-"];
        case 56:
            return [chains_1.bsc, "bsc-"];
        case 137:
            return [chains_1.polygon, "polygon-"];
        case 8453:
            return [chains_1.base, "base-"];
        case 42161:
            return [chains_1.arbitrum, "arbitrum-"];
        case 43114:
            return [chains_1.avalanche, "avalanche-"];
        default:
            return [chains_1.mainnet, ""];
    }
}
function getPublicClient(id) {
    var _a = getChain(id), network = _a[0], network_url = _a[1];
    var url = "https://".concat(network_url, "mainnet.infura.io/v3/").concat(Infura_Key);
    return (0, viem_1.createPublicClient)({
        chain: network,
        transport: (0, viem_1.http)(url),
    });
}
function getWalletClient(id) {
    var _a = getChain(id), network = _a[0], network_url = _a[1];
    var url = "https://".concat(network_url, "mainnet.infura.io/v3/").concat(Infura_Key);
    return (0, viem_1.createWalletClient)({
        account: (0, accounts_1.privateKeyToAccount)(PRIVATE_KEY),
        chain: network,
        transport: (0, viem_1.http)(url),
    });
}
