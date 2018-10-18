import http from '@/utils/http'

export const fetchDirectList = (payload: Organ.DirectSearchPayload) => {
  return http(`/user/v1/api/company/list`, 'POST', payload)
}

export const changeCompanyInfo = (payload: Organ.DirectItemProps) => {
  return http(`/user/v1/api/company/add`, 'POST', payload)
}
