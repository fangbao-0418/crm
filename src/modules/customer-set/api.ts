import http from '@/utils/http'
export const fetchAutoAssign = (cityCodeArr?: string) => {
  let url = '/crm-manage/v1/api/auto_distribute/list'
  url = cityCodeArr ? url + `?cityCodeArr=${cityCodeArr}` : url
  return http(url)
}
export const fetchStorageCapacity = (cityCodeArr?: string) => {
  let url = '/crm-manage/v1/api/storage_capacity/list'
  url = cityCodeArr ? url + `?cityCodeArr=${cityCodeArr}` : url
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
