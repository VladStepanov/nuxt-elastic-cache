export default defineNuxtConfig({
  modules: ['../src/module'],
  elasticCache: {
    storage: {
      type: 'redis'
    },
    pages: '/about/*',
    key: (req) => {
      return `c-${req.url}`
    }
  }
})
