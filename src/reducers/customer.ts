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
    repeatCustomers: [],
    total: 0,
    successCustomers: {}
  },
  capacity:[],
  /** 特殊资源列表 */
  spicalAssetsList: [],
  trackRecords: [],
  clueRecords: []
}
export default handleActions<Customer.Props>({
  'change customer data': (state, { payload }) => {
    payload = Object.assign({}, state, _.cloneDeep(payload))
    payload = _.merge(_.cloneDeep(defaultVal), payload)
    const linkMan: any = APP.fn.generateKey(payload.linkMan)
    linkMan[0].isMainContact = 1
    return {
      ...state,
      ...payload,
      linkMan
    }
  }
}, _.cloneDeep(defaultVal))
