import http from '@/utils/http'
/** 获取省市 */
export const fetchAllRegion = () => {
  return http(`/user/v1/api/user/region/0/2`, 'GET')
}
/** 获取机构列表 */
export const getAgencylist = () => {
  return http(`/crm-manage/v1/api/auto_distribute/agencylist`, 'GET')
}
/** 设置列表查询 */
export const getList = (payload: Setting.SearchParams) => {
  return http(`/crm-manage/v1/api/auto_distribute/list`, 'GET', payload)
}
/** 设置每条保存 */
export const saveEntryone = (payload: Setting.Params) => {
  return http(`/crm-manage/v1/api/auto_distribute/entryone`, 'POST', payload)
}
/** 设置批量保存 */
export const saveItems = (payload: Setting.Params) => {
  return http(`/crm-manage/v1/api/auto_distribute/entry`, 'POST', payload)
}