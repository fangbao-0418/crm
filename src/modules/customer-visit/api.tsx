import http from '@/utils/http'
type SearchProps = CustomerVisit.Search
export const saveRecords = (payload: SearchProps) => {
  return http(`/crm-manage/v1/api/call-center/visit`, 'POST', payload)
}
