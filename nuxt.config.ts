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
    'nuxt-monaco-editor',
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
      SENTRY_DSN: undefined,
      APP_DOMAIN: undefined,
      MIDDLEWARE_URL: undefined,
      NODE_URL: undefined,
      WEBSOCKET_URL: undefined,
      DEX_BACKEND_URL: undefined,
      NETWORK_NAME: undefined,
      ALTERNATIVE_NETWORK_URL: undefined,
      ALTERNATIVE_NETWORK_NAME: undefined,
      AE_TOKEN_ID: undefined,
      DEBUG_MODE: undefined,
      CONTRACT_VERIFICATION_SERVICE_URL: undefined,
      SH_DEX_CONTRACTS: undefined,
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
  monacoEditor: {
    locale: 'en',
    componentName: {
      codeEditor: 'MonacoEditor',
    },
  },
})
