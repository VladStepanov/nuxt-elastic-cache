import { fromNodeMiddleware } from 'h3'
import { options } from '#elastic-cache-options'
import { storageFactory } from "./factory.storage";
import { matchPage } from "./matcher";

const customKey = options.key ? eval(options.key) : null

export default fromNodeMiddleware(async (req, res) => {
  const key = customKey ? customKey(req) : req.url

  const isCacheable = matchPage(req.url)

  if (isCacheable && key && typeof key === 'string') {
    const storage = await storageFactory(options)
    const cachedRes = await storage.get(key)

    if (cachedRes) {
      res.writeHead(200, { ...(cachedRes as any).headers, 'x-ssr-cache': 'HIT' })
      res.end((cachedRes as any).body)
    } else {
      res.setHeader('x-ssr-cache', 'MISS')
    }
  }
})
