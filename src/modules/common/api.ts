import http from '@/utils/http'
export const fetchEnum = () => {
  return http(`/api/code-text/list`)
}
