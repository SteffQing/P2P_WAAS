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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deposit = deposit;
exports.withdraw = withdraw;
var supabase_1 = __importDefault(require("../db/supabase"));
var payment_utils_1 = require("./payment_utils");
var tg_alert_1 = __importDefault(require("./tg_alert"));
function deposit(recipient, amount, asset, hash) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, currentBalance, _a, error, statusText, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 9]);
                    return [4 /*yield*/, (0, payment_utils_1.getUserIdByWallet)(recipient)];
                case 1:
                    userId = _b.sent();
                    return [4 /*yield*/, (0, payment_utils_1.getUserBalance)(userId, asset)];
                case 2:
                    currentBalance = _b.sent();
                    return [4 /*yield*/, supabase_1.default.from("Balance")
                            .update({ amount: currentBalance + amount })
                            .eq("userId", userId)
                            .eq("assetType", asset)];
                case 3:
                    _a = _b.sent(), error = _a.error, statusText = _a.statusText;
                    if (!error) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, tg_alert_1.default)(statusText)];
                case 4:
                    _b.sent();
                    throw "Error in balance topup for user with ".concat(userId, " on ").concat(asset, "!");
                case 5: return [4 /*yield*/, (0, payment_utils_1.addTransaction)(hash, asset, amount, userId)];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 7:
                    error_1 = _b.sent();
                    console.error(error_1);
                    return [4 /*yield*/, (0, tg_alert_1.default)(JSON.stringify(error_1))];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function withdraw(sender, amount, asset, hash) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, currentBalance, _a, error, statusText, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 9, , 11]);
                    return [4 /*yield*/, (0, payment_utils_1.getUserIdByWallet)(sender)];
                case 1:
                    userId = _b.sent();
                    return [4 /*yield*/, (0, payment_utils_1.getUserBalance)(userId, asset)];
                case 2:
                    currentBalance = _b.sent();
                    if (!(currentBalance < amount)) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, tg_alert_1.default)("Insufficient balance for withdrawal")];
                case 3:
                    _b.sent();
                    throw "Insufficient balance";
                case 4: return [4 /*yield*/, supabase_1.default.from("Balance")
                        .update({ amount: currentBalance - amount })
                        .eq("userId", userId)
                        .eq("assetType", asset)];
                case 5:
                    _a = _b.sent(), error = _a.error, statusText = _a.statusText;
                    if (!error) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, tg_alert_1.default)(statusText)];
                case 6:
                    _b.sent();
                    throw "Error in balance withdrawal for user with ".concat(userId, " on ").concat(asset, "!");
                case 7: return [4 /*yield*/, (0, payment_utils_1.addTransaction)(hash, asset, amount, userId, "Withdraw")];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 11];
                case 9:
                    error_2 = _b.sent();
                    console.error(error_2);
                    return [4 /*yield*/, (0, tg_alert_1.default)(JSON.stringify(error_2))];
                case 10:
                    _b.sent();
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
