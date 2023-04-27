import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/browser'
import { BrowserTracing } from '@sentry/tracing'
import { SENTRY_DSN_URL } from './configs/appConfig'
import { ClientApp } from './App'

// init sentry
if (SENTRY_DSN_URL) {
  Sentry.init({
    dsn: SENTRY_DSN_URL,
    integrations: [new BrowserTracing(), new Sentry.Replay()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0.4,

    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.4,

    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0,

    // https://forum.sentry.io/t/resizeobserver-loop-limit-exceeded/8402/4
    ignoreErrors: ['ResizeObserver loop limit exceeded'],
  })
}

const container = document.getElementById('root')

// html sent from SSR server, using `hydrateRoot` api
if (window.__FROM_SERVER__) {
  hydrateRoot(container, <ClientApp />)
}
// html sent from NGINX static server, using `createRoot` api
else {
  const root = createRoot(container)
  root.render(<ClientApp />)
}
