import { fetchStorageCapacity, fetchAutoAssign, fetchSpecialList } from './api'
export const changeCapacityAction = (cityCodeArr?: string, agencyId?: string
  ) => {
  fetchStorageCapacity(cityCodeArr, agencyId).then((res) => {
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

export const fetchSpecialListAction = (cb?: (res: CustomerSet.SpecialAssetsProps[]) => void) => {
  fetchSpecialList().then((res: any[]) => {
    res.map((item, index) => {
      item.key = index
    })
    const spicalAssetsList = res
    if (cb) {
      console.log(spicalAssetsList, 'caocaocao')
      cb(spicalAssetsList)
    }
    APP.dispatch<CustomerSet.Props>({
      type: 'change customer data',
      payload: {
        spicalAssetsList
      }
    })
  })
}
