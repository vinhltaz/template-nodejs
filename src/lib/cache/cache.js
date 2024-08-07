import { LRUCache } from "lru-cache";
import { z } from "zod";

const cache = new LRUCache({
  max: 500,
  maxSize: 5000,
  sizeCalculation: () => 1,
});

const nullOrUndefinedValue = Symbol("nullOrUndefined");

/**
 * Calculates the expiration timestamp based on the given TTL (Time To Live).
 *
 * @param {Object} ttl - The TTL (Time To Live) configuration.
 * @param {number} [ttl.hours=0] - The number of hours until expiration.
 * @param {number} [ttl.minutes=0] - The number of minutes until expiration.
 * @param {number} [ttl.seconds=0] - The number of seconds until expiration.
 * @returns {number} The expiration timestamp in milliseconds since the Unix epoch.
 */
const computeExpirationTime = (ttl) => {
  const hours = ttl.hours ?? 0;
  const minutes = ttl.minutes ?? 0;
  const seconds = ttl.seconds ?? 60;
  const ttlInMs = hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
  const expireAt = Date.now() + ttlInMs;
  return expireAt;
};

const validateKey = z.string().min(1);

/**
 * Adds an item to the cache with an expiration time.
 *
 * @param {string|number} key - The key used to store the item in the cache. This must be a non-empty string or number.
 * @param {*} [value=null] - The value to be stored in the cache. Defaults to `null`.
 * @param {Object} [ttl={ hours: 0, minutes: 0, seconds: 0 }] - Time-to-live (TTL) parameters. Defaults to `{ hours: 0, minutes: 0, seconds: 0 }`.
 * @param {number} [ttl.hours=0] - Number of hours for TTL. Defaults to `0`.
 * @param {number} [ttl.minutes=0] - Number of minutes for TTL. Defaults to `0`.
 * @param {number} [ttl.seconds=0] - Number of seconds for TTL. Defaults to `0`.
 */
export const setCache = (key, value = null, ttl = {}) => {
  validateKey.parse(key);
  const expireAt = computeExpirationTime(ttl);
  const v = value === null ? nullOrUndefinedValue : value;
  cache.set(`${key}`, { value: v, expireAt });
};

/**
 * Retrieves an item from the cache.
 *
 * @param {string|number} key - The key of the item to retrieve from the cache.
 * @returns {*} The value of the cached item if it exists and has not expired; otherwise, `undefined`.
 */
export const getCache = (key) => {
  validateKey.parse(key);
  const now = Date.now();
  const item = cache.get(key);
  if (item) {
    if (now > item["expireAt"]) {
      cache.delete(key);
      return undefined;
    }
    return item["value"];
  }
  return item === nullOrUndefinedValue ? undefined : item;
};
