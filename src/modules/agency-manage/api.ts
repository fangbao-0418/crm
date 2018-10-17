import http from '@/utils/http'

export const fetchDirectList = (payload: Organ.DirectSearchPayload) => {
  return http(`/user/v1/api/company/list`, 'POST', payload)
}
