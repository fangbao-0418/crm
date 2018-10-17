// 客资管理
import _ from 'lodash'
import { handleActions } from 'redux-actions'
const defaultVal: Business.Props = {
  tab1: {
    dataSource: [],
    searchPayload: {},
    pagination: {
      total: 0,
      current: 1,
      pageSize: 15
    }
  },
  tab2: {
    dataSource: [],
    searchPayload: {},
    pagination: {
      total: 0,
      current: 1,
      pageSize: 15
    }
  },
  tab3: {
    dataSource: [],
    searchPayload: {},
    pagination: {
      total: 0,
      current: 1,
      pageSize: 15
    }
  },
  tab4: {
    dataSource: [],
    searchPayload: {},
    pagination: {
      total: 0,
      current: 1,
      pageSize: 15
    }
  },
  selectedTab: 'tab1',
  count: [0, 0, 0, 0, 0]
}
export default handleActions<Business.Props>({
  'change business data': (state, { payload }) => {
    payload = Object.assign({}, state, _.cloneDeep(payload))
    payload = _.merge(_.cloneDeep(defaultVal), payload)
    return {
      ...state,
      ...payload
    }
  }
}, _.cloneDeep(defaultVal))
