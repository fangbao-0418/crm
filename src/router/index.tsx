import React from 'react'
import {
  HashRouter,
  BrowserRouter,
  Route
} from 'react-router-dom'
import Index from '@/modules'
const isPro = process.env.NODE_ENV === 'production'
const Router = isPro ? BrowserRouter : HashRouter
const basename = '/'
const router = () => (
  <Router basename={basename}>
    <Route path='/' component={Index} />
  </Router>
)

export default router
