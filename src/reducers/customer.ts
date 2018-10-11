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
  capacity:[],
  /** 特殊资源列表 */
  spicalAssetsList: []
}
export default handleActions<Customer.Props>({
  'change customer data': (state, { payload }) => {
    payload = Object.assign({}, state, _.cloneDeep(payload))
    payload = _.merge(_.cloneDeep(defaultVal), payload)
    const linkMan: any = payload.linkMan
    linkMan[0].isMainContact = 1
    payload.detail.contactPersons = linkMan
    return {
      ...state,
      ...payload
    }
  }
}, _.cloneDeep(defaultVal))
