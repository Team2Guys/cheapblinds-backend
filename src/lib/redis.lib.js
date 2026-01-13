import Redis from 'ioredis';
import { env } from '#config/index.js';

const { REDIS_URL } = env;

// Redis client
export const redis = new Redis(REDIS_URL, {
  lazyConnect: true,
  maxRetriesPerRequest: 0,
  enableOfflineQueue: false,
  retryStrategy: null,
  reconnectOnError: () => false
});

redis.on('connect', () => console.log('Redis connected'));
redis.on('error', (err) => console.warn('Redis unavailable:', err.code));

// Simple in-memory fallback
const memoryCache = new Map();

export const fallbackCache = {
  get(key) {
    const entry = memoryCache.get(key);
    if (!entry) return null;

    const { value, expiresAt } = entry;
    if (Date.now() > expiresAt) {
      memoryCache.delete(key);
      return null;
    }

    return value;
  },

  set(key, value, ttlSeconds = 60) {
    memoryCache.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000
    });
  },

  del(key) {
    memoryCache.delete(key);
  }
};

// Unified cache interface
export const cache = {
  async get(key) {
    // Try Redis first
    try {
      const redisValue = await redis.get(key);
      if (redisValue) return JSON.parse(redisValue);
    } catch {}
    // Fallback
    return fallbackCache.get(key);
  },

  async set(key, value, ttlSeconds = 60) {
    fallbackCache.set(key, value, ttlSeconds);
    try {
      await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    } catch {}
  },

  async del(key) {
    fallbackCache.del(key);
    try {
      await redis.del(key);
    } catch {}
  }
};
