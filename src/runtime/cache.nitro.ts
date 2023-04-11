import zlib from 'node:zlib'
import type { NitroAppPlugin } from 'nitropack'
import { options } from '#elastic-cache-options'
import { storageFactory } from "./factory.storage"
import { matchPage } from './matcher'

const customKey = options.key ? eval(options.key) : null

const gzipOptions = { level: zlib.constants.Z_BEST_COMPRESSION }
const brotliOptions = {
  [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
  [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.Z_BEST_COMPRESSION
}

const { encoding = '' } = options.compressResponse || {} as any

export default <NitroAppPlugin> async function (nitroApp) {
  const storage = await storageFactory(options.storage)

  nitroApp.hooks.hook('render:response', async (response, { event }) => {
    const isCacheable = matchPage(event.req.url)

    if (isCacheable && response.statusCode === 200) {
      const key = customKey ? customKey(event.req) : event.req.url

      if (key && typeof key === 'string') {
        let cachedRes = response

        if (encoding) {
          const encodedBuffer = await compressedBuff(response.body)

          cachedRes = {
            ...cachedRes,
            body: encodedBuffer,
            headers: {
              ...cachedRes.headers, 'content-encoding': encoding
            }
          }
        }

        await storage.set(key, cachedRes)
      }
    }
  })
}

function compressedBuff (fileContents: string) {
  return new Promise((resolve, reject) => {
    const cb = (error, result?: Buffer) => error ? reject(error) : resolve(result)
    if (encoding === 'gzip') {
      zlib.gzip(fileContents, gzipOptions, cb)
    } else if (encoding === 'br') {
      zlib.brotliCompress(fileContents, brotliOptions, cb)
    } else {
      cb('Invalid compression option. Please provide either br or gzip')
    }
  })
}
