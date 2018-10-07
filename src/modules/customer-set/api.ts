import http from '@/utils/http'
export const fetchAutoAssign = () => {
  return http(`/api/auto_distribute/list`)
}
export const fetchStorageCapacity = () => {
  return http(`/api/storage_capacity/list`)
}
export const fetchCity = () => {
  return http(`/api/province-city`)
}
export const saveAutoAssign = (payload: Customer.AutoAssignProps[]) => {
  return http(`/api/auto_distribute/entry`, 'POST', payload)
}
export const saveStorageCapacity = (payload: Customer.CapacityProps[]) => {
  return http(`/api/storage_capacity/entry`, 'POST', payload)
}
