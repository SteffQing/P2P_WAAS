"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getChainAndRPC;
var chains_1 = require("viem/chains");
function getChainAndRPC(chainId) {
    switch (chainId) {
        case 11155111:
            return [chains_1.sepolia, "sepolia"];
        case 421614:
            return [chains_1.arbitrumSepolia, "arbitrum-sepolia"];
        case 43113:
            return [chains_1.avalancheFuji, "avalanche-fuji"];
        case 80002:
            return [chains_1.polygonAmoy, "polygon-amoy"];
        default:
            return [chains_1.sepolia, "sepolia"];
    }
}
