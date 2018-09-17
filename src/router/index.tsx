import React from 'react'
import {
  HashRouter,
  BrowserRouter,
  Route
} from 'react-router-dom'
import APP from '@/modules/common/APP'
const isPro = process.env.NODE_ENV === 'production'
const Router = isPro ? BrowserRouter : HashRouter
const basename = '/'
const router = () => (
  <Router basename={basename}>
    <APP />
  </Router>
)

export default router
