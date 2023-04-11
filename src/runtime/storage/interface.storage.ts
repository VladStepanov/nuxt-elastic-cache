export interface CacheStorage {
  get (key: string): string | undefined | Promise<string | undefined>

  set (key: string, value: string): void
}
