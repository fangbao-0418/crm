import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Router from '@/router'
import '@/stylus/app'
import 'pilipa/dist/pilipa.css'
import 'pilipa-terrace/dist/terrace.css'
render(
  <Router />,
   document.getElementById('root')
)
