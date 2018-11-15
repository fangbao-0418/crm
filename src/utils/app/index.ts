import notification from 'pilipa/libs/notification'
import storage from '../storage'
import * as fn from './fn'
Object.assign(APP, {
  user: undefined,
  env: process.env.NODE_ENV,
  fn,
  success: (msg: string) => {
    notification.success({
      message: msg
    })
  },
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
    if (!localStorage.getItem('token')) {
      return ''
    }
    return storage.getItem('token') || ''
  },
  set (val) {
    storage.setItem('token', val)
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
