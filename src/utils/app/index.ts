import notification from 'pilipa/libs/notification'
import * as fn from './fn'
Object.assign(APP, {
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
  }
})
APP.keys = {
  EnumContactSource: [],
  EnumCustomerNameType: [],
  EnumCustomerSearchType: [],
  EnumCustomerSource: [],
  EnumCustomerStatus: [],
  EnumCustomerType: [],
  EnumIsValid: [],
  EnumPayTaxesNature: [],
  EnumSignCustomerSearchType: []
}
APP.dictionary = {}
