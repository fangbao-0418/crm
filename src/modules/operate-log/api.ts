import http from '@/utils/http'
export const fetchList = (payload: OperateLog.SearchPayload = {}) => {
  payload.pageCurrent = payload.pageCurrent || 1
  payload.pageSize = payload.pageSize || 10
  return http(`/log/v1/api/operatingLog/findLogPage`, 'POST', payload)
}
