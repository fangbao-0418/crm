// 客资管理
import _ from 'lodash'
import { handleActions } from 'redux-actions'
const defaultVal: Business.Props = {
  dataSource: [[], [], [], []]
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
