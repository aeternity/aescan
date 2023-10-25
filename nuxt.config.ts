import fs from 'fs/promises'
import { compileTemplate } from 'vue/compiler-sfc'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: './src',
  css: ['@/styles/main.css'],
  devServer: {
    port: 8080,
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/plausible',
    'nuxt-simple-sitemap',
  ],
  imports: {
    dirs: ['./stores'],
  },
  plausible: {
    apiHost: 'https://plausible.dev.service.aepps.com',
    trackLocalhost: false,
  },
  appConfig: {
    APP_VERSION: process.env.APP_VERSION,
  },
  runtimeConfig: {
    public: {
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
      SH_DEX_CONTRACTS: process.env.SH_DEX_CONTRACTS?.split(';'),
    },
  },

  postcss: {
    plugins: {
      autoprefixer: {},
      '@csstools/postcss-global-data': {
        files: ['src/styles/settings/_variables.css'],
      },
      'postcss-custom-media': {},
      'postcss-import': {},
      'postcss-nested': {},
    },
  },
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
    ],
  },
})
