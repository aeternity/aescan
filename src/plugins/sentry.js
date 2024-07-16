/* eslint-disable */
import * as Sentry from '@sentry/vue'

async function lazyLoadSentryIntegrations() {
  if (process.server) {
    return
  }

  const {Replay} = await import("@sentry/vue");
  Sentry.addIntegration(new Replay({
    maskAllText: false,
    blockAllMedia: false,
  }));
}

export default defineNuxtPlugin(({vueApp}) => {
  if (process.server) {
    return
  }

  const {SENTRY_DSN, APP_DOMAIN} = useRuntimeConfig().public

  if (!SENTRY_DSN || !APP_DOMAIN) {
    console.warn('Sentry configuration is not set therefore it will not be initialized.')
    return
  }

  const router = useRouter()

  Sentry.init({
    app: vueApp,
    dsn: SENTRY_DSN,
    integrations: [Sentry.browserTracingIntegration({router})],
    tracePropagationTargets: [APP_DOMAIN, /^\//],

    beforeSend: (event) => {
      if (window.location.hostname.startsWith('localhost')) {
        return null
      }
      return event
    },
    tracesSampleRate: 1.0,
    logErrors: true,
  })
  lazyLoadSentryIntegrations();
})
