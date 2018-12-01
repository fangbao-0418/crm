import http from '@/utils/http'
/** 座席监控销售列表 */
export const getCallMonitors = (query: {
  callTimeBeginDate?: string,
  callTimeEndDate?: string,
  pageSize: number,
  pageCurrent: number
}) => {
  return http(`/crm-manage/v1/api/call-monitors`, 'GET', query)
}
/** 座席监控小组列表 */
export const getGroupCallMonitors = (query: {
  callTimeBeginDate?: string,
  callTimeEndDate?: string
}) => {
  return http(`/crm-manage/v1/api/call-group-monitors`, 'GET', query)
}
/** 座席监控列表 */
export const getCallDetail = (query: {
  /** 接通状态 */
  callConnectStatus?: number,
  keyword?: string,
  /** 挂断类型 */
  hangUpStatus?: number
  salespersonId?: number,
  callTimeBeginDate?: string,
  callTimeEndDate?: string,
  pageSize: number,
  pageCurrent: number
}) => {
  return http(`/crm-manage/v1/api/call-details`, 'GET', query)
}
