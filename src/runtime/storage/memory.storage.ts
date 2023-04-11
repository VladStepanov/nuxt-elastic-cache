import { LRUCache } from 'lru-cache'
import { CacheStorage } from "./interface.storage";
import { ModuleOptions } from "../../module";

type InitOptions<K, V, FC> = ModuleOptions['storage']['memory']

class MemoryStorage<K = void, V = void, FC = void> implements CacheStorage {
  cache: LRUCache<K, V, FC>

  static init<K = void, V = void, FC = void> (options: InitOptions<K, V, FC>) {
    options.ttl = options.ttl * 1000
    return new MemoryStorage(new LRUCache(options))
  }

  constructor (cache) {
    this.cache = cache
  }

  get (key: string) {
    return this.cache.get(key as K) as string | undefined
  }

  set (key: string, value: any) {
    this.cache.set(key as K, value as V)
  }
}

export { MemoryStorage }
