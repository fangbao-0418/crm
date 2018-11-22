import http from '@/utils/http'
type SearchProps = Signed.SearchProps
export const fetchList = (payload: SearchProps) => {
  return http(`/crm-manage/v1/api/customer-sign`, 'GET', {
    data: payload
  })
}
export const toOther = (payload: {
  customerIdArr: string[]
  principalsId: string
  principals: string
}) => {
  return http(`/crm-manage/v1/api/batch-principals`, 'PUT', payload)
}
export const addRecord = (payload: {
  customerId?: string
  remark?: string
  appointTime?: string
  tagFollowUpClassification?: number
}) => {
  return http(`/crm-manage/v1/api/track-record`, 'POST', payload)
}
// export const uploadCredentials = () => {
//   return http(``)
// }
export const fetchRelatedCompanyListy = (customerId: string) => {
  return http(`/crm-manage/v1/api/related_company/${customerId}`)
}
export const fetchWorks = (customerId: string) => {
  return http(`/work/v1/api/order/list/${customerId}`)
}
export const fetchWorkers = (companyId: string) => {
  return http(`/user/v1/api/user/list/company/${companyId}`)
}
export const fetchOrders = (customerId: string) => { // 服务调什么
  return http(`/shop-order/v1/api/shop/order/orders/c-org-id?customerOrgId=${customerId}`)
}
