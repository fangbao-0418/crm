import { fetchStorageCapacity, fetchAutoAssign, fetchSpecialList } from './api'
export const changeCapacityAction = (cityCodeArr?: string, agencyName?: string
  ) => {
    console.log(agencyName, '和v点零分十八v')
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
