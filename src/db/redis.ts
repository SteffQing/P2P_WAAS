import { Redis } from "@upstash/redis";

const RedisInstance = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

export default RedisInstance;
