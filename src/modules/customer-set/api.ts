import http from '@/utils/http'
export const fetchAutoAssign = (cityCodeArr?: string) => {
  let url = '/crm-manage/v1/api/auto_distribute/list'
  url = cityCodeArr ? url + `?cityCodeArr=${cityCodeArr}` : url
  return http(url)
}
export const fetchStorageCapacity = (cityCodeArr?: string, agencyName?: string) => {
  let url = '/crm-manage/v1/api/storage_capacity/list'
  url = cityCodeArr || agencyName ? url + `?cityCodeArr=${cityCodeArr}&agencyName=${agencyName}` : url
  return http(url)
}
export const fetchCity = () => {
  return http(`/crm-manage/v1/api/province-city`)
}
export const saveAutoAssign = (payload: Customer.AutoAssignProps[]) => {
  return http(`/crm-manage/v1/api/auto_distribute/entry`, 'POST', payload)
}
export const saveStorageCapacity = (payload: Customer.CapacityProps[]) => {
  return http(`/crm-manage/v1/api/storage_capacity/entry`, 'POST', payload)
}
export const fetchSpicalList = () => {
  return http(`/crm-manage/v1/api/diversion_customer/listSpecial`)
}
export const fetchGeneralList = () => {
  return http(`/crm-manage/v1/api/diversion_customer/listGeneral`)
}
export const saveGeneralCapacity = (type: number, payload: Array<{salespersonId: string, salespersonName: string}>) => {
  return http(`/crm-manage/v1/api/diversion_customer/entryGeneral/${type}`, 'POST', payload)
}
export const saveSpecialCapacity = (payload: CustomerSet.SpecialAssetsProps) => {
  return http(`/crm-manage/v1/api/diversion_customer/entrySpecial`, 'POST', payload)
}
export const deleteSpecialCapacity = (sourceId: string) => {
  return http(`/crm-manage/v1/api/diversion_customer/deleteSpecial?sourceId=${sourceId}`)
}
export const fetchSpecialList = () => {
  return http(`/crm-manage/v1/api/diversion_customer/listSpecial`)
}
