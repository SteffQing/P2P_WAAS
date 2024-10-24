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
exports.genKeys = genKeys;
exports.fundOwner = fundOwner;
exports.getAddr = getAddr;
var accounts_1 = require("viem/accounts");
var fs_1 = __importDefault(require("fs"));
var dotenv_1 = __importDefault(require("dotenv"));
var clients_1 = require("../constants/evm/clients");
var config_1 = require("../constants/config");
// Function to write the updated environment variables to the .env file
function writeToEnv(envVariables) {
    var envConfig = dotenv_1.default.parse(fs_1.default.readFileSync(".env"));
    Object.assign(envConfig, envVariables);
    var updatedEnv = Object.keys(envConfig)
        .map(function (key) { return "".concat(key, "=\"").concat(envConfig[key], "\""); })
        .join("\n");
    fs_1.default.writeFileSync(".env", updatedEnv);
    console.log(".env file has been updated with new keys.");
}
function genKeys() {
    return __awaiter(this, void 0, void 0, function () {
        var keys;
        return __generator(this, function (_a) {
            keys = {
                DEPLOYER_ADMIN: (0, accounts_1.generatePrivateKey)(),
                OWNER: (0, accounts_1.generatePrivateKey)(),
                SMARTWALLET_ADMIN: (0, accounts_1.generatePrivateKey)(),
                HOTWALLET_ADMIN: (0, accounts_1.generatePrivateKey)(),
            };
            // Write the keys to the .env file
            writeToEnv(keys);
            return [2 /*return*/];
        });
    });
}
function fundOwner(id) {
    return __awaiter(this, void 0, void 0, function () {
        var client;
        return __generator(this, function (_a) {
            client = (0, clients_1.getWalletClient)(id, undefined, (0, config_1.getEnvVariable)("SMARTWALLET_ADMIN"));
            client.sendTransaction({
                to: (0, accounts_1.privateKeyToAddress)((0, config_1.getEnvVariable)("DEPLOYER_ADMIN")),
                value: BigInt("100000000000000000"),
            });
            console.log("Funded");
            return [2 /*return*/];
        });
    });
}
function getAddr() {
    var admins = {
        Owner: (0, accounts_1.privateKeyToAddress)((0, config_1.getEnvVariable)("OWNER")),
        Deployer: (0, accounts_1.privateKeyToAddress)((0, config_1.getEnvVariable)("DEPLOYER_ADMIN")),
        SmartAdmin: (0, accounts_1.privateKeyToAddress)((0, config_1.getEnvVariable)("SMARTWALLET_ADMIN")),
        HotAdmin: (0, accounts_1.privateKeyToAddress)((0, config_1.getEnvVariable)("HOTWALLET_ADMIN")),
    };
    console.log(admins);
}
