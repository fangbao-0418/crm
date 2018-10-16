import http from '@/utils/http'
export const fetchList = (payload: Configure.SearchPayload = {
  pageCurrent: 1,
  pageSize: 15
}) => {
  return http(`/config/v1/api/dict/page`, 'GET', payload)
}
