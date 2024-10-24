"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicClient = getPublicClient;
exports.getWalletClient = getWalletClient;
var viem_1 = require("viem");
var chains_1 = __importDefault(require("./chains"));
var accounts_1 = require("viem/accounts");
var config_1 = require("../config");
var INFURA_KEY = (0, config_1.getEnvVariable)("INFURA_KEY_1");
var PRIVATE_KEY = (0, config_1.getEnvVariable)("DEPLOYER_ADMIN");
function getPublicClient(id, INFURA_KEY_) {
    var _a = (0, chains_1.default)(id), network = _a[0], network_url = _a[1];
    var url = "https://".concat(network_url, ".infura.io/v3/").concat(INFURA_KEY_ !== null && INFURA_KEY_ !== void 0 ? INFURA_KEY_ : INFURA_KEY);
    return (0, viem_1.createPublicClient)({
        chain: network,
        transport: (0, viem_1.http)(url),
    });
}
function getWalletClient(id, INFURA_KEY_, PRIVATE_KEY_) {
    var _a = (0, chains_1.default)(id), network = _a[0], network_url = _a[1];
    var url = "https://".concat(network_url, ".infura.io/v3/").concat(INFURA_KEY_ !== null && INFURA_KEY_ !== void 0 ? INFURA_KEY_ : INFURA_KEY);
    return (0, viem_1.createWalletClient)({
        account: (0, accounts_1.privateKeyToAccount)(PRIVATE_KEY_ !== null && PRIVATE_KEY_ !== void 0 ? PRIVATE_KEY_ : PRIVATE_KEY),
        chain: network,
        transport: (0, viem_1.http)(url),
    });
}
