import http from '@/utils/http'
export const fetchList = () => {
  return http(`/api/customer/list`)
}
export const fetchCityCustomerList = () => {
  return http(`/api/customer/city-stats`)
}
