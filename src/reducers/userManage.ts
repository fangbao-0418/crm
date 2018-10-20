// 客资管理
import _ from 'lodash'
import { handleActions } from 'redux-actions'
const defaultVal: UserManage.Props = {
  department: {
    dataSource: []
  },
  account: {
    dataSource: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 15
    },
    searchPayload: {}
  },
  role: {
    dataSource: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 15
    }
  },
  tab: 'role',
  companyList: []
}
export default handleActions<UserManage.Props>({
  'change user manage data': (state, { payload }) => {
    payload = Object.assign({}, state, _.cloneDeep(payload))
    payload = _.merge(_.cloneDeep(defaultVal), payload)
    return {
      ...state,
      ...payload
    }
  }
}, _.cloneDeep(defaultVal))
