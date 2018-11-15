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
  keyword?: string,
  hangUpStatus?: number
  salespersonId?: number,
  callTimeBeginDate?: string,
  callTimeEndDate?: string,
  pageSize: number,
  pageCurrent: number
}) => {
  return http(`/crm-manage/v1/api/call-details`, 'GET', query)
}
/** 获取销售列表 */
export const getSaller = () => {
  return http(`/user/v1/api/user/list/company/identity/${APP.user.companyId}/sale`)
}
