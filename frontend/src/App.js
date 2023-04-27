/* eslint-disable react/prop-types */
import 'regenerator-runtime/runtime.js'

import React, { Suspense } from 'react'
import { BrowserRouter as AppRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { QueryClientProvider, Hydrate } from 'react-query'
import _each from 'lodash/each'

// -- react query client --
// import queryClient from '@src/apis/client'

// ** Redux Imports
import { Provider } from 'react-redux'
// import { store } from '@core/redux/storeConfig/store'

// ** Toast & ThemeColors Context
import { ToastContainer } from 'react-toastify'
// import { ThemeContext } from '@core/utility/context/ThemeColors'

// Google chart
// import GoogleChartProvider from '@domains/googleChart'

// Error boundary
// import ErrorBoundary from '@domains/userTracker/ErrorBoundary'

// Router
import { HelmetProvider } from 'react-helmet-async'
// import Router from './router/Router'

// ** Ripple Button
// import '@core/components/ripple-button'

// ** PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx.min'

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** React Circulat Progressbar
import 'react-circular-progressbar/dist/styles.css'

// // ** React Toastify
// import '@core/scss/react/libs/toastify/toastify.scss'

// // ** Core styles
// import '@core/assets/fonts/feather/iconfont.css'
// import '@core/scss/core.scss'
// import '@core/scss/amo/style.scss'

// ** Tailwind style
import '@src/styles/tailwind.css'

const __RECOIL_STATE__ = (process.browser && window.__RECOIL_STATE__) || []
const __REACT_QUERY_STATE__ = (process.browser && window.__REACT_QUERY_STATE__) || {}

export const initializeRecoilState =
  (initState = []) =>
  ({ set }) => {
    _each(initState, ({ key, value }) => {
      if (!key || !value) return
      set({ key }, value)
    })
  }

export const App = ({ host }) => {
  global.host = host

  return (
    <Provider store={store}>
      <Suspense fallback={null}>
        <ToastContainer icon={false} />
      </Suspense>
    </Provider>
  )
}

export const ClientApp = () => (
  <AppRouter>
    <RecoilRoot initializeState={initializeRecoilState(__RECOIL_STATE__)}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={__REACT_QUERY_STATE__}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  </AppRouter>
)

export default App
