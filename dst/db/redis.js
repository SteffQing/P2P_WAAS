"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redis_1 = require("@upstash/redis");
var config_1 = require("../constants/config");
var RedisInstance = new redis_1.Redis({
    url: (0, config_1.getEnvVariable)("UPSTASH_REDIS_URL"),
    token: (0, config_1.getEnvVariable)("UPSTASH_REDIS_TOKEN"),
});
exports.default = RedisInstance;
