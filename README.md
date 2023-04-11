<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: nuxt-elastic-cache
- Package name: nuxt-elastic-cache
- Description: My new Nuxt module
-->

# nuxt-elastic-cache

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Flexible fully transparent cache middleware for Nuxt3 SSR rendering with Redis support.

[//]: # (- [✨ &nbsp;Release Notes]&#40;/CHANGELOG.md&#41;)

[//]: # (## Features)

[//]: # ()
[//]: # (<!-- Highlight some of the features your module provide here -->)

[//]: # (- ⛰ &nbsp;Foo)

[//]: # (- 🚠 &nbsp;Bar)

[//]: # (- 🌲 &nbsp;Baz)

## Quick Setup

1. Add `nuxt-elastic-cache` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-elastic-cache

# Using yarn
yarn add --dev nuxt-elastic-cache

# Using npm
npm install --save-dev nuxt-elastic-cache
```

2. Add `nuxt-elastic-cache` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-elastic-cache'
  ],
  elasticCache: {
    enabled: true,
    storage: {
      type: 'redis',
      redis: {
        url: 'redis://localhost:6379',
        /* Or */
        host: 'localhost',
        port: 6379,
        username: '..',
        password: '..',
        db: 0
      },
    },
    pages: [
      /*
       * Powered by https://github.com/isaacs/minimatch
       * Also supports RegExp
      */
      '/about/*',
      '/about/**/*ending'
    ],
    key (req) {
      return `c-${yourCustomLogic(req)}`
    }
  },
})
```

## Configuration
### Top level configuration
| Option  | Type                                        |required|Description                    | Default |
|---------|---------------------------------------------|--------|-------------------------------|---------|
| `enabled` | `boolean`                                   |No      |To enable/disable the SSR cache| `true`    |
| `storage` | `Storage`                                   |No      |Config storage for cache       | `undefined` |
| `pages`   | `string\|RegExp\| Array<string\| RegExp>`   |No|Pages to be cached|`[]`|
| `key`     | `(req: IncomingMessage) => string \| false` |No|Can be used to generate custom key. Return falsy value to bypass cache|`undefined`|

### Storage configuration
| Option     | Type                  | Required  | Description                                                                                    | Default  |
|------------|-----------------------|-----------|------------------------------------------------------------------------------------------------|----------|
| `type`       | `'memory' \| 'redis'` | Yes       | Cache storage                                                                                  | 'memory' |
| `memory.ttl`| `number`              | No        | Number in seconds to store page in cache                                                       | 1 hour   |
| `memory.max` | `number`              | No        | Max number of pages to store in cache. If limit is reached, least recently used page is removed | `500` |
| `redis.url` | `string`              | No        | String to Redis instance. This option has priority over options below.                         | `undefined` |
| `redis.ttl` | `number`              | No        | Number in seconds to store page in cache                                                       | 1 hour      |
| `redis.host`| `string`              | No        | Redis instance host                                                                            | `undefined` |
| `redis.port`| `number`              | No        | Redis instance port                                                                            | `undefined` |
| `redis.username` | `string`         | No        | Redis instance username                                                                        | `undefined` |
| `redis.password` | `string`         | No        | Redis instance password                                                                        | `undefined` |
| `redis.db`       | `number`         | No        | Redis instance db                                                                              | `undefined` |

That's it! You can now use nuxt-elastic-cache in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-elastic-cache/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-elastic-cache

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-elastic-cache.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-elastic-cache

[license-src]: https://img.shields.io/npm/l/nuxt-elastic-cache.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-elastic-cache

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
