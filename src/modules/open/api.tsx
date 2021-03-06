import http from '@/utils/http'
type SearchProps = Signed.SearchProps
export const fetchList = (payload: SearchProps) => {
  return http(`/crm-manage/v1/api/open-ocean/customers`, 'GET', {
    data: payload
  })
}
export const pickCustomer = (payload: {
  customerIdArr: string[]
}) => {
  return http(`/crm-manage/v1/api/open-ocean/batch-grab-customer`, 'PUT', payload)
}
