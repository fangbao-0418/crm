import http from '@/utils/http'
export const getReadyCustomerList = (payload: ReadyCustomer.ParamsProps) => {
  return http(`/crm-manage/v1/api/customer-pool-distribution`, 'GET', payload)
}
export const getCityByCompany = () => {
  return http(`/user/v1/api/company/login/city`, 'POST', ['Agent', 'DirectCompany'])
}
