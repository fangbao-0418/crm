import { fetchStorageCapacity } from './api'
export const changeCapacityAction = () => {
  fetchStorageCapacity().then((res) => {
    console.log(res)
    // APP.dispatch({
    //   type: 'change customer set capacity data',
    //   payload: {
    //     capacity: res
    //   }
    // })
  })
}
