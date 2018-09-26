import http from '@/utils/http'
export const fetchList = () => {
  return http(`/api/customer/list`)
}
export const fetchCityCustomerList = () => {
  return http(`/api/customer/city-stats`)
}
export const addCustomer = (payload: {
  customerName: string
  customerNameType: string
  legalPerson: string
  address: string
  remark?: string
  cityCode: string
  cityName: string
  relatedCompany?: string
  customerSource: number
  contactsList: Customer.LinkManProps[]
}) => {
  return http(`/api/customer/entry`, 'POST', payload)
}
