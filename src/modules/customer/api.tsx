import http from '@/utils/http'
export const fetchList = (payload: {
  beginDate?: string
  endDate?: string
  customerName?: string
  cityCode?: string
  contactPerson?: string
  contactPhone?: string
  payTaxesNature?: string
  customerSource?: string
  pageSize?: number
  pageCurrent?: number
}) => {
  return http(`/api/customer/list`, 'GET', payload)
}
export const fetchCityCustomerList = () => {
  return http(`/api/customer/city-stats`)
}
export const addCustomer = (payload: Customer.DetailProps) => {
  return http(`/api/customer/entry`, 'POST', {
    data: payload
  })
}
export const allotCustomer = (payload: {
  agencyId?: string
  customerIds?: string[]
  salesPerson?: Array<{
    id: string
    name: string
  }>
}) => {
  return http(`/api/customer/allocate`, 'PUT', payload)
}
export const deleteCustomer = (payload: string) => {
  return http(`/api/customer/by-ids?customerIds=${payload}`, 'DELETE')
}
export const viewCustomer = (id: string) => {
  return http(`/api/open-ocean/${id}`)
}
export const updateCustomer = (id: string, payload: Customer.DetailProps) => {
  return http(`/api/customer/${id}`, 'PUT', {
    data: payload
  })
}
export const fetchCityCount = () => {
  return http(`/api/customer/stats/by-city`)
}
