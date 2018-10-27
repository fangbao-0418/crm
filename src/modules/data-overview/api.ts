import http from '@/utils/http'
// 获取数据概览
export const fetchOverView = (payload: Statistics.OverViewSearchPayload) => {
  return http(`/outside/v1/api/outside/data/overview`, 'GET', payload)
}
// // 获取数据总计
// export const fetchOverViewTotal =  (customerId: number) => {
//   return http(`/outside/v1/api/outside/data/statistics/company/data/find`, 'GET', {customerId})
// }
// 获取代理商列表
export const fetchAgentList = (code: string) => {
  return http(`/user/v1/api/company/list/region/region_city/${code}/Agent`)
}
// 获取外勤人员绩效数据
export const fetchPersonPerf = (payload: Statistics.DetailSearchPayload) => {
  return http('/outside/v1/api/outside/data/statistics/company/personnel/reward/histogram', 'GET', payload)
}
