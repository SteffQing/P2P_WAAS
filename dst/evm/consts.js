"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotWallet = exports.DeployerWallet = void 0;
exports.getWallets = getWallets;
exports.addWallet = addWallet;
exports.getTokens = getTokens;
var wallets = new Set([
    "0x1a26Eaa78510AFB2F894bC486Ab26418578d2B9F",
    "0x34239f35B4660D9605E11466FfD16C64DABf23B7",
]);
function getWallets(id) {
    return __awaiter(this, void 0, void 0, function () {
        var walletArray;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Delay for 2 seconds to pretend wallet fetching from DB
                return [4 /*yield*/, new Promise(function (resolve) {
                        setTimeout(function () {
                            resolve([
                                "0xDB9B936373f859Ce8C580Bbc35b0Eab89cA9fd70",
                                "0xEAe38e8d41aeCC027e1b68c31f7039Ae95651D4D",
                            ]);
                        }, 2000);
                    })];
                case 1:
                    // Delay for 2 seconds to pretend wallet fetching from DB
                    _a.sent();
                    walletArray = Array.from(wallets);
                    return [2 /*return*/, walletArray];
            }
        });
    });
}
function addWallet(wallet) {
    wallets.add(wallet);
}
function getTokens(id) {
    switch (id) {
        case 1:
            return ETH_Tokens;
        case 10:
            return OP_Tokens;
        case 56:
            return BSC_Tokens;
        case 137:
            return POL_Tokens;
        case 8453:
            return BASE_Tokens;
        case 42161:
            return ARB_Tokens;
        case 43114:
            return AVAX_Tokens;
        default:
            return ETH_Tokens;
    }
}
// USDT & USDC
var ETH_Tokens = [
    "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
];
var BSC_Tokens = [
    "0x55d398326f99059fF775485246999027B3197955",
    "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
];
var POL_Tokens = [
    "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
];
var BASE_Tokens = [
    "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
]; // Does not have USDT
var ARB_Tokens = [
    "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
];
var OP_Tokens = [
    "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
    "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
];
var AVAX_Tokens = [
    "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
    "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
];
exports.DeployerWallet = "0xB915F2B2792B574CBd6155e7b222a3DD9D3239b5";
exports.HotWallet = "0x8E715d6DFd731137ee4c2054C3D8Bd7feC583e7C";
