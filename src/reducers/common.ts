import { handleActions } from 'redux-actions'
export default handleActions<Common.Props>({
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
