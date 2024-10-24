import { Redis } from "@upstash/redis";
import { getEnvVariable } from "../constants/config";

const RedisInstance = new Redis({
  url: getEnvVariable("UPSTASH_REDIS_URL"),
  token: getEnvVariable("UPSTASH_REDIS_TOKEN"),
});

export default RedisInstance;
