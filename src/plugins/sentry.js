/* eslint-disable */
import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'

export default defineNuxtPlugin(({ vueApp }) => {
  if (process.server) {
    return
  }

  const config = useRuntimeConfig()

  if (!config.public.SENTRY_DSN || !config.public.APP_DOMAIN) {
    console.warn('Sentry configuration is not set therefore it will not be initialized.')
    return
  }

  const router = useRouter()

  Sentry.init({
    app: vueApp,
    dsn: config.SENTRY_DSN,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: [config.APP_DOMAIN, /^\//],
      }),
    ],
    beforeSend: (event) => {
      if (window.location.hostname.startsWith('localhost')) {
        return null
      }
      return event
    },
    tracesSampleRate: 1.0,
    logErrors: true,
  })
})
