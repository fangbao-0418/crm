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
export const deleteDict = (id: string) => {
  return http(`/config/v1/api/dict/${id}`, 'DELETE')
}
export const batchDeleteDict = (ids: string[]) => {
  return http(`/config/v1/api/dict`, 'DELETE', ids)
}
export const fetchDirecTypeList = () => {
  return http(`/config/v1/api/dict/type`)
}
export const fetchSystemList = () => {
  return http(`/config/v1/api/dict?typeCode=system_name`)
}
