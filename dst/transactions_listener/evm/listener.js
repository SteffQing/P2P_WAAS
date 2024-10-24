"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupListeners;
var viem_1 = require("viem");
var process_logs_1 = require("./utils/process_logs");
var contracts_1 = require("../../constants/evm/contracts");
var clients_1 = require("../../constants/evm/clients");
var tokens_1 = require("../../constants/evm/tokens");
var config_1 = require("../../constants/config");
var INFURA_KEY = (0, config_1.getEnvVariable)("INFURA_KEY_3");
function setupListeners(id, wallets) {
    var client = (0, clients_1.getPublicClient)(id, INFURA_KEY);
    var tokens = (0, tokens_1.getTokens)(id);
    // Watch for Smart Wallet Events
    client.watchEvent({
        onLogs: function (logs) { return (0, process_logs_1.process_smart_wallet_logs)(logs, id); },
        address: wallets,
        events: (0, viem_1.parseAbi)([
            "event ReceivedETH(uint amount)",
            "event SentETH(uint amount)",
            "event SentToken(string symbol, uint amount)",
        ]),
        strict: true,
    });
    // Watch for ERC20 Token Events
    client.watchEvent({
        address: tokens,
        onLogs: function (logs) { return (0, process_logs_1.process_erc20_logs)(logs, id, client); },
        event: (0, viem_1.parseAbiItem)("event Transfer(address indexed from, address indexed to, uint256 value)"),
        args: { to: wallets },
        strict: true,
    });
    // Watch for Hot Wallet Transactions
    client.watchEvent({
        address: contracts_1.HOT_WALLET_CONTRACT,
        onLogs: function (logs) { return (0, process_logs_1.process_hot_wallet_logs)(logs, id); },
        events: (0, viem_1.parseAbi)([
            "event SentETH(address sender, uint amount)",
            "event SentToken(address sender, string symbol, uint amount)",
        ]),
        strict: true,
    });
}
