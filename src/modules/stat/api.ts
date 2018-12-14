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
/** 获取销售列表 */
export const getSaller = () => {
  return http(`/user/v1/api/user/list/company/identity/${APP.user.companyId}/sale`)
}
/** 根据登陆用户获取机构列表 */
export const getFirms = (companyTypeList: string[] = []) => {
  return http(`/user/v1/api/company/login/region`, 'POST', companyTypeList)
}
/** 工作仪表盘 */
export const getSalesRank = (payload: {
  totalBeginDate: string,
  totalEndDate: string,
  salespersonId: string
}) => {
  return http(`/crm-manage/v1/api/report/sales`, 'GET', payload)
}
/** 客户仪表盘-跟进客户 */
export const getTrailRank = (payload: {
  totalBeginDate: string,
  totalEndDate: string,
  salespersonId: string
}) => {
  return http(`/crm-manage/v1/api/report/customer`, 'GET', payload)
}
