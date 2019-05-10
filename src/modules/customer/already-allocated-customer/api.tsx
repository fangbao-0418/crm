import http from '@/utils/http'
export const getReadyCustomerList = (payload: ReadyCustomer.ParamsProps) => {
  return http(`/crm-manage/v1/api/customer-pool-distribution`, 'GET', payload)
}
export const getCityByCompany = () => {
  return http(`/user/v1/api/company/login/region/city`, 'POST', ['Agent', 'DirectCompany'])
}
/** 导出已分配客户数据URL */
export const getExportDistributionDataURL = (payload: ReadyCustomer.ParamsProps) => {
  const query = $.param(payload)
  return `/sys/crm-manage/v1/api/customer-pool-distribution-export?${query}`
}
