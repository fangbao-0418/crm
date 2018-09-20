// 客资管理
import _ from 'lodash'
import { handleActions } from 'redux-actions'
const defaultVal: Customer.Props = {
  linkMan: [{
    contactPerson: '',
    contactPhone: ''
  }],
  dataSource: [],
  detail: {}
}
export default handleActions<Customer.Props>({
  'change customer data': (state, { payload }) => {
    payload = _.merge(_.cloneDeep(defaultVal), payload)
    payload = Object.assign({}, state, _.cloneDeep(payload))
    return {
      ...state,
      ...payload
    }
  }
}, _.cloneDeep(defaultVal))
