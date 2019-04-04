import { fetchStorageCapacity, fetchAutoAssign, fetchSpecialList } from './api'
import { any } from 'prop-types';
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

export const fetchSpecialListAction = (payload: {
  companyId?: any,
  cb?: (res: CustomerSet.SpecialAssetsProps[]) => void
}) => {
  const { companyId, cb } = payload
  fetchSpecialList(companyId).then((res: any[]) => {
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
