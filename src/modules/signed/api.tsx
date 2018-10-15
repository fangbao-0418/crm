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
// export const uploadCredentials = () => {
//   return http(``)
// }
export const fetchRelatedCompanyListy = (curCompanyId: string) => {
  return http(`/crm-manage/v1/api/related_company/${curCompanyId}`)
}
