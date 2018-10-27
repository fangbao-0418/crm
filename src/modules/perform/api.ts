import http from '@/utils/http'
// 获取列表
export const fetchList = (payload: Perform.SearchPayload) => {
  return http(`/outside/v1/api/task/reward/list`, 'GET', payload)
}
// 修改绩效
export const update = (payload: {
  id: string
  reward: string
}) => {
  return http(`/outside/v1/api/task/reward/update`, 'PUT', payload)
}
// // 新增绩效
// export const add = (payload: Perform.ItemProps) => {
//   return http(`/outside/v1/api/outside/task/reward/product/data`, 'POST', payload)
// }
