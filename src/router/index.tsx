import React from 'react'
import {
  BrowserRouter
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@/store'
import App from '@/modules/common/App'
const Router = BrowserRouter
const basename = PUBLIC_PATH

const router = () => (
  <Provider store={store}>
    <Router basename={basename}>
      <App />
    </Router>
  </Provider>
)
export default router
