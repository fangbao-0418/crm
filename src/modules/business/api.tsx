import http from '@/utils/http'
export const fetchList = (payload: {
  beginTime?: string
  endTime?: string
  intention?: string
  telephoneStatus?: string
  type?: string
  word?: string
  pageNum?: string
  pageSize?: string
}) => {
  return http(`/api/customer-opportunity`, 'GET', payload)
}
