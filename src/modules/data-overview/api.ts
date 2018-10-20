import http from '@/utils/http'
// 获取数据概览
export const fetchList = (payload: Statistics.OverViewSearchPayload) => {
  return http(`outside/v1/api/outside/data/statistics/company/data/overview`, 'GET', payload)
}
// 获取数据总计
export const total =  (payload: {
  customerId: string
}) => {
  return http(`outside/v1/api/outside/data/statistics/company/data/find`, 'GET', payload)
}
