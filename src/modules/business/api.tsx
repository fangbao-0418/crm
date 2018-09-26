import http from '@/utils/http'
export const fetchList = () => {
  return http(`/api/customer-opportunity`)
}
