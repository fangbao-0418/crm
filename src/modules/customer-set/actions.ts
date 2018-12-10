import { fetchStorageCapacity, fetchAutoAssign, fetchSpecialList } from './api'
export const changeCapacityAction = (cityCodeArr?: string, agencyName?: string) => {
  fetchStorageCapacity(cityCodeArr, agencyName).then((res) => {
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
      item.oldSourceId = item.sourceId
    })
    const spicalAssetsList = res
    if (cb) {
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
