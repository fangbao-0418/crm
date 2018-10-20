import http from '@/utils/http'
// 获取外勤人员-绩效柱状图
export const fetchPerformList = (payload: Statistics.SearchPayload) => {
  return http(`outside/v1/api/outside/data/statistics/company/personnel/reward/histogram`, 'GET', payload)
}
// 获取外勤人员-任务完成率
export const taskList = (payload: Statistics.SearchPayload) => {
  return http(`outside/v1/api/outside/data/statistics/company/personnel/task/rate/histogram`, 'GET', payload)
}
// 获取外勤任务-绩效柱状图
export const missionList =  (payload: {
  customerId: number   // 公司ID
  dateFlag?: string    // 日期类型：MONTH月份l;YEAR年份;WEEK周
  date?: string       // 查询日期
  category?: string    // 类型  AREA区域;CATEGORY任务类型
}) => {
  return http(`outside/v1/api/outside/data/statistics/company/task/reward/histogram`, 'GET', payload)
}
// 获取外勤任务-任务完成率柱状图
export const rate =  (payload: {
  customerId: number   // 公司ID
  dateFlag?: string    // 日期类型：MONTH月份l;YEAR年份;WEEK周
  date?: string       // 查询日期
  category?: string    // 类型  AREA区域;CATEGORY任务类型
}) => {
  return http(`outside/v1/api/outside/data/statistics/company/task/rate/histogram`, 'GET', payload)
}
