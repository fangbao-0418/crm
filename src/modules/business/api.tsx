import http from '@/utils/http'
type SearchProps = Business.SearchProps
export const fetchList = (payload: SearchProps) => {
  return http(`/api/customer-opportunity`, 'GET', {
    data: payload
  })
}
