import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Router from '@/router'
import '@/stylus/app'
import 'pilipa/dist/pilipa.css'
import { notification, Modal } from 'pilipa'
notification.config({
  duration: 2000
})
Modal.config({
  position: 'reverse'
})
render(
  <Router />,
   document.getElementById('root')
)
