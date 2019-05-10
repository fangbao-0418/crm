import http from '@/utils/http'
export const fetchInfo = () => {
  return http(`/crm-manage/v1/api/customer/sale-kanban?limit=10`, 'GET')
}
