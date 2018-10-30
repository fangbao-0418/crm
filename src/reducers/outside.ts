// 客资管理
import _ from 'lodash'
import { handleActions } from 'redux-actions'
const defaultVal: OutSide.Props = {
  config: {
    common: {
      tab: '1'
    }
  }
}
export default handleActions<OutSide.Props>({
  'change outside data': (state, { payload }) => {
    payload = Object.assign({}, state, _.cloneDeep(payload))
    payload = _.merge(_.cloneDeep(defaultVal), payload)
    return {
      ...state,
      ...payload
    }
  }
}, _.cloneDeep(defaultVal))
