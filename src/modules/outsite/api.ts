import http from '@/utils/http'
/** 获取领用单列表 */
export const fetchReceiveList = (payload: OutSide.ReceivePayload) => {
  return http(`/outside/v1/api/outside/task/request/list`, 'GET', payload)
}
/** 审核领用单 */
export const auditReceive = (payload: {
  id: number,
  auditStatus: 'APPROVE' | 'REFUSE',
  auditType: 'PRINCIPAL' | 'FINANCE'
}) => {
  return http(`/outside/v1/api/outside/task/request/audit`, 'GET', payload)
}
/** 外勤任务详情 */
export const fetchTaskDetail = (id: string) => {
  return http(`/outside/v1/api/outside/task/get/${id}`)
}
