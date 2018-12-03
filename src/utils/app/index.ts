import notification from 'pilipa/libs/notification'
import storage from '../storage'
import * as fn from './fn'
import jsmc from '@/utils/jsmc.min'
import { cookie } from 'pilipa-terrace'
Object.assign(APP, {
  isConfigTQ: false,
  user: undefined,
  env: process.env.NODE_ENV,
  fn,
  success: (msg: string) => {
    notification.success({
      message: msg
    })
  },
  jsmc: jsmc.noConflict(),
  error: (msg: string) => {
    notification.warning({
      message: msg
    })
  },
  hasPermission: (key?: string) => {
    if (key !== undefined) {
      if (APP.user.codes.indexOf(key) > -1) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }
})
APP.keys = {
  EnumContactSource: [],
  EnumCustomerNameType: [],
  EnumCustomerSearchType: [],
  EnumCustomerSource: [],
  EnumCustomerOfflineSource: [],
  EnumCustomerStatus: [],
  EnumCustomerType: [],
  EnumIsValid: [],
  EnumPayTaxesNature: [],
  EnumSignCustomerSearchType: []
}
APP.dictionary = {}

Object.defineProperty(APP, 'token', {
  get () {
    console.log(storage.getItem('token') || cookie.get('token'), 'token')
    return storage.getItem('token') || cookie.get('token') || ''
  },
  set (val) {
    storage.setItem('token', val)
    cookie.set({
      token: val
    }, {
      expires: 30 * 24 * 3600
    })
  }
})
Object.defineProperty(APP, 'homepage', {
  get () {
    if (!localStorage.getItem('homepage')) {
      return ''
    }
    return storage.getItem('homepage') || ''
  },
  set (val) {
    storage.setItem('homepage', val)
  }
})
