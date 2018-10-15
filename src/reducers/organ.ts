// 客资管理
import _ from 'lodash'
import { handleActions } from 'redux-actions'
const defaultVal: Organ.Props = {
  agent: {
    dataSource: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 15
    }
  },
  selectedTab: 'agent'
}
export default handleActions<Organ.Props>({
  'change organ manage data': (state, { payload }) => {
    payload = Object.assign({}, state, _.cloneDeep(payload))
    payload = _.merge(_.cloneDeep(defaultVal), payload)
    return {
      ...state,
      ...payload
    }
  }
}, _.cloneDeep(defaultVal))
