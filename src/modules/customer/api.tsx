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
  agencyId: string
  customerIds: string[]
  salesPersonIds: Array<{
    id: string
    name: string
  }>
}) => {
  return http(`/api/customer/allocate`, 'POST', payload)
}
