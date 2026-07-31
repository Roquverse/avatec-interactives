import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisUrl = process.env.REDIS_URL;

export const redisClient = createClient(redisUrl ? { url: redisUrl } : undefined);

redisClient.on('error', (err) => console.error('Redis Client Error:', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

let isConnected = false;

export const connectRedis = async () => {
  if (redisUrl) {
    try {
      await redisClient.connect();
      isConnected = true;
    } catch (err) {
      console.error('Failed to connect to Redis', err);
    }
  } else {
    console.warn('REDIS_URL not set. Redis caching will be disabled.');
  }
};

// Connect immediately
connectRedis();

export const getCache = async (key: string) => {
  if (!isConnected) return null;
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error fetching cache for key ${key}:`, error);
    return null;
  }
};

export const setCache = async (key: string, value: any, expirationInSeconds = 3600) => {
  if (!isConnected) return;
  try {
    await redisClient.setEx(key, expirationInSeconds, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting cache for key ${key}:`, error);
  }
};

export const delCache = async (key: string) => {
  if (!isConnected) return;
  try {
    await redisClient.del(key);
  } catch (error) {
    console.error(`Error deleting cache for key ${key}:`, error);
  }
};
