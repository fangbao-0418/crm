import http from '@/utils/http'
export const fetchList = (payload: Configure.SearchPayload = {
  pageCurrent: 1,
  pageSize: 15
}) => {
  return http(`/config/v1/api/dict/page`, 'GET', payload)
}
export const add = (payload: Configure.ItemProps) => {
  return http(`/config/v1/api/dict`, 'POST', payload)
}
export const update = (payload: Configure.ItemProps) => {
  return http(`/config/v1/api/dict`, 'PUT', payload)
}
export const deleteDict = (id: number) => {
  return http(`/config/v1/api/dict/${id}`, 'DELETE')
}
