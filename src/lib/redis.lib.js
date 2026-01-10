import Redis from 'ioredis';
import { env } from '#config/index.js';

const { REDIS_URL } = env;

export const redis = new Redis(REDIS_URL, {
  maxRetriesPerRequest: 5,
  enableOfflineQueue: true
});

redis.on('connect', () => console.log('Redis connected'));
redis.on('error', (err) => console.error('Redis error:', err));
