export interface CommonProps {
  ajaxCount: number
}
import { handleActions } from 'redux-actions'
export default handleActions<CommonProps>({
  'loading show': (state) => {
    let { ajaxCount } = state
    ajaxCount = ajaxCount + 1
    return {
      ...state,
      ajaxCount
    }
  },
  'loading hidden': (state) => {
    let { ajaxCount } = state
    ajaxCount = ajaxCount <= 0 ? 0 : ajaxCount - 1
    return {
      ...state,
      ajaxCount
    }
  }
}, {
  ajaxCount: 0
})
