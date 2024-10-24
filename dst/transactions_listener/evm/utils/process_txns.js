"use strict";
// In depositToken, use SmartWalletClient to deposit to Hot Wallet
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.depositETH = depositETH;
exports.depositToken = depositToken;
exports.withdrawETH = withdrawETH;
exports.withdrawToken = withdrawToken;
var SmartWallet_1 = require("../../../abi/SmartWallet");
var chains_1 = __importDefault(require("../../../constants/evm/chains"));
var clients_1 = require("../../../constants/evm/clients");
var payments_1 = require("../../../utils/payments");
var config_1 = require("../../../constants/config");
var SMARTWALLET_ADMIN = (0, config_1.getEnvVariable)("SMARTWALLET_ADMIN");
var INFURA_KEY = (0, config_1.getEnvVariable)("INFURA_KEY_3");
function depositETH(id, amount, address, hash) {
    return __awaiter(this, void 0, void 0, function () {
        var symbol;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    symbol = (0, chains_1.default)(id)[0].nativeCurrency.symbol;
                    return [4 /*yield*/, (0, payments_1.deposit)(address, amount, symbol, hash)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function withdrawETH(id, amount, address, hash) {
    return __awaiter(this, void 0, void 0, function () {
        var symbol;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    symbol = (0, chains_1.default)(id)[0].nativeCurrency.symbol;
                    return [4 /*yield*/, (0, payments_1.withdraw)(address, amount, symbol, hash)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function withdrawToken(amount, address, symbol, hash) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Withdraw Token: ", amount, symbol, address, hash);
                    return [4 /*yield*/, (0, payments_1.withdraw)(address, amount, symbol, hash)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var MIN_TOKEN_AMOUNT = 1;
var MAX_GAS_COST = BigInt(100000);
function depositToken(id, amount, address, symbol, hash, token_address) {
    return __awaiter(this, void 0, void 0, function () {
        var pubClient, fee, client;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(amount > MIN_TOKEN_AMOUNT)) return [3 /*break*/, 3];
                    pubClient = (0, clients_1.getPublicClient)(id);
                    return [4 /*yield*/, pubClient.estimateContractGas({
                            address: address,
                            abi: SmartWallet_1.ABI,
                            functionName: "depositERC20Token",
                            args: [token_address],
                        })];
                case 1:
                    fee = _a.sent();
                    if (fee > MAX_GAS_COST)
                        return [2 /*return*/];
                    client = (0, clients_1.getWalletClient)(id, INFURA_KEY, SMARTWALLET_ADMIN);
                    return [4 /*yield*/, client.writeContract({
                            address: address,
                            abi: SmartWallet_1.ABI,
                            functionName: "depositERC20Token",
                            args: [token_address],
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    console.log("Deposit Token: ", amount, symbol, address, hash);
                    return [4 /*yield*/, (0, payments_1.deposit)(address, amount, symbol, hash)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
