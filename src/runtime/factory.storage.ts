import { ModuleOptions } from "../module";
import { CacheStorage } from "./storage/interface.storage";
import { MemoryStorage } from "./storage/memory.storage";
import { RedisStorage } from "./storage/redis.storage";

let storage

export async function storageFactory (storageOptions: ModuleOptions['storage']): Promise<CacheStorage> {
  if (storage) {
    return storage
  }

  if (storageOptions.type === 'memory') {
    storage = await MemoryStorage.init(storageOptions.memory)
    return storage
  }
  if (storageOptions.type === 'redis') {
    storage = await RedisStorage.init(storageOptions.redis)
    return storage
  }

  throw new Error('Unknown storage mode provided')
}
