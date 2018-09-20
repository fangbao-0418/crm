// 客资管理

import { handleActions } from 'redux-actions'
export default handleActions<Customer.Props>({
  'change customer data': (state, { payload }) => {
    payload = Object.assign({}, state, payload)
    return {
      ...state,
      ...payload
    }
  }
}, {
  linkMan: []
})
