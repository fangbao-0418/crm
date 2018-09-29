import http from '@/utils/http'
type SearchProps = Signed.SearchProps
export const fetchList = (payload: SearchProps) => {
  return http(`/api/customer-sign`, 'GET', {
    data: payload
  })
}
export const toOther = (payload: {
  customerIdArr: string[]
  principalsId: string
  principals: string
}) => {
  return http(`/api/batch-principals`, 'PUT', payload)
}
