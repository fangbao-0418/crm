// 客资管理
import { LinkManProps } from '@/modules/common/link-man'
export interface CustomerProps {
  linkMan: LinkManProps[]
}
import { handleActions } from 'redux-actions'
export default handleActions<CustomerProps>({
  'change customer data': (state, { payload }) => {
    payload = Object.assign({}, state, payload)
    return {
      ...state,
      ...payload
    }
  }
}, {
  linkMan: []
})
