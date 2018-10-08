import { fetchStorageCapacity, fetchAutoAssign } from './api'
export const changeCapacityAction = (cityCodeArr?: string) => {
  fetchStorageCapacity(cityCodeArr).then((res) => {
    APP.dispatch({
      type: 'change customer data',
      payload: {
        capacity: res
      }
    })
  })
}
export const changeAutoAssignAction = (cityCodeArr?: string) => {
  fetchAutoAssign(cityCodeArr).then((res) => {
    APP.dispatch({
      type: 'change customer data',
      payload: {
        autoAssign: res
      }
    })
  })
}
