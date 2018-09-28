import React from 'react'
import {
  HashRouter,
  BrowserRouter
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@/store'
import App from '@/modules/common/App'
const isPro = process.env.NODE_ENV === 'production'
const Router = isPro ? BrowserRouter : HashRouter
const basename = '/'
const router = () => (
  <Provider store={store}>
    <Router basename={basename}>
      <App />
    </Router>
  </Provider>
)
export default router
