// 客资管理
import _ from 'lodash'
import { handleActions } from 'redux-actions'
const defaultVal: Perform.Props = {
  dataSource: [],
  pagintaion: {
    total: 0,
    current: 1,
    pageSize: 15
  }
}
export default handleActions<Perform.Props>({
  'change perform data': (state, { payload }) => {
    payload = Object.assign({}, state, _.cloneDeep(payload))
    payload = _.merge(_.cloneDeep(defaultVal), payload)
    return {
      ...state,
      ...payload
    }
  }
}, _.cloneDeep(defaultVal))
