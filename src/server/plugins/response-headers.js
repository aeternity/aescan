const DEFAULT_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'sameorigin',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Cache-control': 'no-cache',
  'Content-Security-Policy': '*',
  'Permissions-Policy': 'camera=(), geolocation=(), microphone=()',
  'Referrer-Policy': 'unsafe-url',
  'X-Permitted-Cross-Domain-Policies': 'none',
  'Cross-Origin-Embedder-Policy': 'unsafe-none',
  'Cross-Origin-Opener-Policy': 'cross-origin',
  'Cross-Origin-Resource-Policy': 'cross-origin',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': 'X-Custom-Header',

}

// todo fix headers
export default defineNitroPlugin(nitroApp => {
  nitroApp.hooks.hook('render:response', response => {
    delete response.headers['x-powered-by']

    if (process.env.NODE_ENV !== 'production') {
      return
    }

    for (const header in DEFAULT_HEADERS) {
      response.headers[header] = DEFAULT_HEADERS[header]
    }
  })
})
