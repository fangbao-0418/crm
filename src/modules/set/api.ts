import http from '@/utils/http'
export const fetchStorageCapacity = () => {
  return http(`/api/storage_capacity/list`)
}
export const fetchCity = () => {
  return http(`/api/province-city`)
}
