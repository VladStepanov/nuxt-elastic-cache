import Redis from 'ioredis'
import { CacheStorage } from "./interface.storage";
import { ModuleOptions } from "../../module";

class RedisStorage implements CacheStorage {
  redis: Redis
  ttl: number

  static init (_options: ModuleOptions['storage']['redis']) {
    const ttl = _options.ttl ?? 60 * 60 // 1 hour

    const options = _options.url ? _options.url : _options
    return new RedisStorage(new Redis(options), ttl)
  }

  constructor (redis, ttl) {
    this.redis = redis
    this.ttl = ttl
  }

  async get (key: string): Promise<string> {
    const result = await this.redis.get(key)

    let deserialized
    try {
      deserialized = JSON.parse(result)
    } catch (e) {
      return result
    }
    return deserialized
  }

  set (key: string, value: any) {
    this.redis.set(key, JSON.stringify(value), 'EX', this.ttl)
  }
}

export { RedisStorage }
