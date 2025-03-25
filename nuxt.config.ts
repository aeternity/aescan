import fs from 'fs/promises'
import { compileTemplate } from 'vue/compiler-sfc'
import { sentryVitePlugin } from '@sentry/vite-plugin'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: './src',
  css: ['@/assets/styles/main.css'],
  devServer: {
    port: 8080,
  },
  nitro: {
    routeRules: {
      '/proxy/avatar/**': { proxy: 'https://avatars.z52da5wt.xyz/**', cors: true },
      '/proxy/nodes': { proxy: 'http://138.68.22.27:3113/v2/debug/network', cors: true },
      '/proxy/know': { proxy: 'https://www.aeknow.org/api', cors: true },
    },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/plausible',
    'nuxt-monaco-editor',
  ],
  plausible: {
    ignoredHostnames: ['localhost'],
  },
  appConfig: {
    APP_VERSION: process.env.APP_VERSION,
  },
  runtimeConfig: {
    public: {
      SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
      SENTRY_DSN: process.env.SENTRY_DSN,
      APP_DOMAIN: process.env.APP_DOMAIN,
      MIDDLEWARE_URL: process.env.MIDDLEWARE_URL,
      NODE_URL: process.env.NODE_URL,
      WEBSOCKET_URL: process.env.WEBSOCKET_URL,
      DEX_BACKEND_URL: process.env.DEX_BACKEND_URL,
      NETWORK_NAME: process.env.NETWORK_NAME,
      NETWORK_ID: process.env.NETWORK_ID,
      ALTERNATIVE_NETWORK_URL: process.env.ALTERNATIVE_NETWORK_URL,
      ALTERNATIVE_NETWORK_NAME: process.env.ALTERNATIVE_NETWORK_NAME,
      AE_TOKEN_ID: process.env.AE_TOKEN_ID,
      DEBUG_MODE: process.env.DEBUG_MODE,
      CONTRACT_VERIFICATION_SERVICE_URL: process.env.CONTRACT_VERIFICATION_SERVICE_URL,
      SH_DEX_CONTRACTS: process.env.SH_DEX_CONTRACTS?.split(';'),
      ENABLE_MARKET_STATS: process.env.ENABLE_MARKET_STATS,
      ENABLE_NODES: process.env.ENABLE_NODES,
    },
  },
  postcss: {
    plugins: {
      autoprefixer: {},
      '@csstools/postcss-global-data': {
        files: ['src/assets/styles/settings/_variables.css'],
      },
      'postcss-custom-media': {},
      'postcss-import': {},
      'postcss-nested': {},
    },
  },
  sourcemap: true,
  vite: {
    build: { target: 'es2020' },
    optimizeDeps: {
      esbuildOptions: { target: 'es2020' },
    },
    define: {
      __VUE_PROD_DEVTOOLS__: process.env.MODE !== 'production',
    },
    plugins: [
      {
        name: 'icon-svg-loader',
        enforce: 'pre',
        async load(path) {
          if (!path.match(/icons\/.*.svg$/)) {
            return
          }

          const { code } = compileTemplate({
            id: JSON.stringify(path),
            filename: path,
            source: await fs.readFile(path, 'utf-8'),
            transformAssetUrls: false,
          })

          return `${code}\nexport default { render: render }`
        },
      },
      sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: 'sentry',
        project: 'aescan-develop',
        url: 'https://sentry.dev.service.aepps.com/',
        disable: !process.env.SENTRY_AUTH_TOKEN,
      }),
      sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: 'sentry',
        project: 'aescan-production',
        url: 'https://sentry.dev.service.aepps.com/',
        disable: !process.env.SENTRY_AUTH_TOKEN,
      }),
    ],
  },
  monacoEditor: {
    locale: 'en',
    componentName: {
      codeEditor: 'MonacoEditor',
    },
  },
  compatibilityDate: '2024-07-16',
})
