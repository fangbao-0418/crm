import http from '@/utils/http'

export const fetchDirectList = (payload: Organ.DirectSearchPayload) => {
  return http(`/user/v1/api/company/list`, 'POST', payload)
}
export const fetchCompanyDetail = (payload: {
  id?: number
}) => {
  return http(`/user/v1/api/company/selectCompanyById`, 'GET', payload)
}
export const changeCompanyInfo = (payload: Organ.DirectItemProps) => {
  return http(`/user/v1/api/company/add`, 'POST', payload)
}
