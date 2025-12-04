import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    @Inject('REDIS_CLIENT') private redis: Redis,
  ) {}

  //cache values can be any type, and generics keep things type-safe, predictable, and clean.
  async get<T = any>(key: string): Promise<T | null> {
    const value = await this.cache.get<T>(key);
    return value ?? null;
  }

  //The value stored can be: number, string, boolean, array, object, anything…
  async set<T = any>(key: string, value: T, ttl_ms?: number): Promise<void> {
    if (ttl_ms && ttl_ms > 0) {
      await this.cache.set(key, value, ttl_ms);
    } else {
      await this.cache.set(key, value);
    }
  }

  async delete(key: string): Promise<void> {
    await this.cache.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.cache.get(key);
    return result !== undefined && result !== null;
  }

  buildKey(namespace: string, key: string): string {
    return `${namespace}${key}`;
  }

  //  DELETE cache on write, READ from cache on read --> KEYV DOESNT SUPPORT RESET NAMESPACE NATIVELY
  async resetNamespace(namespace: string): Promise<number> {
    const pattern = `${namespace}:*`;
    let cursor = '0';
    let deletedCount = 0;

    do {
      const [newCursor, keys] = await this.redis.scan(
        cursor,
        'MATCH',
        pattern,
        'COUNT',
        100,
      );
      cursor = newCursor;

      if (keys.length > 0) {
        await this.redis.del(...keys);
        deletedCount += keys.length;
      }
    } while (cursor !== '0');

    return deletedCount;
  }

  /*
   * Smart cache wrapper:
   * If key exists then return cached
   * Else run cb(), cache result, return it
   */
  async wrap<T>(
    key: string,
    cb: () => Promise<T>,
    ttl_ms?: number,
  ): Promise<T> {
    const cached = await this.cache.get<T>(key);
    if (cached !== null && cached !== undefined) {
      console.log('CACHE HIT');
      return cached;
    }

    const value = await cb();

    if (ttl_ms && ttl_ms > 0) {
      await this.cache.set(key, value, ttl_ms);
    } else {
      await this.cache.set(key, value);
    }

    console.log('CACHE MISS');
    return value;
  }
}
