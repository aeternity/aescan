export default defineNitroPlugin(nitroApp => {
  const {
    WEBSOCKET_URL, MIDDLEWARE_URL, NODE_URL, DEX_BACKEND_URL, CONTRACT_VERIFICATION_SERVICE_URL,
  } = useRuntimeConfig().public

  const allowHttp = [
    MIDDLEWARE_URL, NODE_URL, DEX_BACKEND_URL, CONTRACT_VERIFICATION_SERVICE_URL,
  ].some(url => url?.startsWith('http://')) || WEBSOCKET_URL?.startsWith('ws://')

  const DEFAULT_HEADERS = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'sameorigin',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Cache-control': 'no-cache',
    'Content-Security-Policy': [
      'default-src \'self\' *',
      'font-src \'self\' data:',
      'img-src \'self\' data: https://avatars.z52da5wt.xyz; default-src \'self\'',
      'script-src \'self\' \'unsafe-inline\'',
      'style-src \'self\' \'unsafe-inline\'',
      'frame-src \'self\'',
      ...allowHttp ? [] : ['upgrade-insecure-requests'],
      'block-all-mixed-content',
    ].join('; '),
    'Permissions-Policy': 'camera=(), geolocation=(), microphone=()',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Permitted-Cross-Domain-Policies': 'none',
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'cross-origin',
  }

  nitroApp.hooks.hook('render:response', response => {
    delete response.headers['x-powered-by']

    if (process.env.NODE_ENV !== 'production') {
      return
    }

    Object.assign(response.headers, DEFAULT_HEADERS)
  })
})
