const DEFAULT_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'sameorigin',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Cache-control': 'no-cache',
  'Content-Security-Policy': 'default-src \'self\' *; font-src \'self\' data:; img-src \'self\' data:; script-src \'self\' \'unsafe-inline\'; style-src \'self\' \'unsafe-inline\'; frame-src \'self\'',
  'Permissions-Policy': 'camera=(), geolocation=(), microphone=()',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Permitted-Cross-Domain-Policies': 'none',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'cross-origin',
}

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
