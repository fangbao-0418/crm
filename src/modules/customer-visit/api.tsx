import http from '@/utils/http'
type SearchProps = CustomerVisit.Search
export const getCustomerList = (key?: string, agencyId?: string) => {
  return http(`/crm-manage/v1/api/customer/order-find?key=${key}&agencyId=${agencyId}`, 'GET')
}
export const saveRecords = (payload: SearchProps) => {
  return http(`/crm-manage/v1/api/call-center/visit`, 'POST', payload)
}
