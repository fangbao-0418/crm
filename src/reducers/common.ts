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
  },
  'change user info': (state, { payload }) => {
    return {
      ...state,
      user: payload.user
    }
  },
  'change main display status': (state, { payload }) => {
    return {
      ...state,
      visible: payload.visible
    }
  }
}, {
  ajaxCount: 0,
  user: undefined,
  visible: true
})
