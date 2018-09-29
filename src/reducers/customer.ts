// 客资管理
import _ from 'lodash'
import { handleActions } from 'redux-actions'
const defaultVal: Customer.Props = {
  linkMan: [{
    contactPerson: '',
    contactPhone: ''
  }],
  dataSource: [],
  detail: {
    contactPersons: [{
      contactPerson: '',
      contactPhone: ''
    }]
  },
  autoAssign: [],
  assignResult: {
    allocatedNum: 0,
    exists: [],
    total: 0
  },
  capacity:[]
}
export default handleActions<Customer.Props>({
  'change customer data': (state, { payload }) => {
    payload = Object.assign({}, state, _.cloneDeep(payload))
    payload = _.merge(_.cloneDeep(defaultVal), payload)
    payload.detail.contactPersons = payload.linkMan
    return {
      ...state,
      ...payload
    }
  }
}, _.cloneDeep(defaultVal))
