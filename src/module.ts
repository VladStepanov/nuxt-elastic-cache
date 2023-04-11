import { defineNuxtModule, createResolver, addServerHandler, addServerPlugin } from '@nuxt/kit'
import { IncomingMessage } from "http";

type MemoryOptions = {
  ttl: number;
  max: number;
}

type RedisOptions = {
  ttl?: number,
  url?: string;
  port?: number;
  host?: string;
  username?: string;
  password?: string;
  db?: number;
}

type StorageOptions = {
  type: 'memory' | 'redis';
  memory?: MemoryOptions;
  redis?: RedisOptions;
}

export type ModuleOptions = {
  enabled: boolean,
  storage: StorageOptions,
  pages: Array<string | RegExp> | string | RegExp,
  key?: (req: IncomingMessage) => string | false,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-elastic-cache',
    configKey: 'elasticCache'
  },
  defaults: {
    enabled: true,
    storage: {
      type: 'memory',
      memory: {
        max: 500,
        ttl: 60 * 60
      },
      redis: {
        ttl: 60 * 60
      }
    },
    pages: []
  },
  setup (_options, nuxt) {
    if (!_options.enabled) {
      return
    }

    const options = sanitizeOptions(_options)

    const { resolve } = createResolver(import.meta.url)

    nuxt.hook('nitro:config', (nitro) => {
      nitro.virtual = nitro.virtual || {}
      nitro.virtual['#elastic-cache-options'] = `export const options = ${JSON.stringify(options, function (key, val) {
        if (typeof val === 'function') {
          return String(val)
        }
        return val
      }, 2)}`
    })

    addServerPlugin(resolve('runtime/cache.nitro'))

    addServerHandler({
      handler: resolve('runtime/cache.middleware')
    })
  }
})

function sanitizeOptions (options: ModuleOptions) {
  return {
    ...options,
    pages: Array.isArray(options.pages)
      ? options.pages.filter(Boolean)
      : [options.pages].filter(Boolean)
  }
}
