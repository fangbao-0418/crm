import http from '@/utils/http'
export const fetchAutoAssign = () => {
  return http(`/crm-manage/v1/api/auto_distribute/list`)
}
export const fetchStorageCapacity = () => {
  return http(`/crm-manage/v1/api/storage_capacity/list`)
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
