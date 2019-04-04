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
/** 特殊资源列表查询 */
export const fetchSpecialList = (agencyId: any = APP.user.companyId) => {
  return http(`/crm-manage/v1/api/diversion_customer/listSpecial/${agencyId}`)
}
/** 一般资源列表查询 */
export const fetchGeneralList = (agencyId: any = APP.user.companyId) => {
  return http(`/crm-manage/v1/api/diversion_customer/listGeneral/${agencyId}`)
}
export const saveGeneralCapacity = (type: number, payload: Array<{salespersonId: string, salespersonName: string}>, agencyId?: any) => {
  agencyId = agencyId !== undefined ? agencyId : APP.user.companyId
  return http(`/crm-manage/v1/api/diversion_customer/entryGeneral/${type}/${agencyId}`, 'POST', payload)
}
export const saveSpecialCapacity = (payload: CustomerSet.SpecialAssetsProps, agencyId: any = APP.user.companyId) => {
  return http(`/crm-manage/v1/api/diversion_customer/entrySpecial/${agencyId}`, 'POST', payload)
}
export const deleteSpecialCapacity = (sourceId: string) => {
  return http(`/crm-manage/v1/api/diversion_customer/deleteSpecial?sourceId=${sourceId}`)
}
