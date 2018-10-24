import http from '@/utils/http'

export const fetchReceiveList = (payload: OutSite.ReceivePayload) => {
  return http(`/outside/v1/api/outside/task/request/list`, 'GET', payload)
}
