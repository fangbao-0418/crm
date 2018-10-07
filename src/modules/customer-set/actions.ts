import { fetchStorageCapacity, fetchAutoAssign } from './api'
export const changeCapacityAction = () => {
  fetchStorageCapacity().then((res) => {
    APP.dispatch({
      type: 'change customer data',
      payload: {
        capacity: res
      }
    })
  })
}
export const changeAutoAssignAction = () => {
  fetchAutoAssign().then((res) => {
    APP.dispatch({
      type: 'change customer data',
      payload: {
        autoAssign: res
      }
    })
  })
}
