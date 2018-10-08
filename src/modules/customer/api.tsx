import http from '@/utils/http'
export const fetchList = (payload: {
  beginDate?: string
  endDate?: string
  customerName?: string
  cityCode?: string
  contactPerson?: string
  contactPhone?: string
  payTaxesNature?: string
  customerSource?: string
  pageSize?: number
  pageCurrent?: number
}) => {
  return http(`/crm-manage/v1/api/customer/list`, 'GET', payload)
}
export const addCustomer = (payload: Customer.DetailProps) => {
  return http(`/crm-manage/v1/api/customer/entry`, 'POST', {
    data: payload
  })
}
export const allotCustomer = (payload: {
  agencyId?: string
  customerIds?: string[]
  salesPerson?: Array<{
    id: string
    name: string
  }>
}) => {
  return http(`/crm-manage/v1/api/customer/allocate`, 'PUT', payload)
}
export const deleteCustomer = (payload: string) => {
  return http(`/crm-manage/v1/api/customer/by-ids?customerIds=${payload}`, 'DELETE')
}
export const viewCustomer = (id: string) => {
  return http(`/crm-manage/v1/api/open-ocean/${id}`)
}
export const updateCustomer = (id: string, payload: Customer.DetailProps) => {
  return http(`/crm-manage/v1/api/customer/${id}`, 'PUT', {
    data: payload
  })
}
export const fetchCityCount = () => {
  return http(`/crm-manage/v1/api/customer/stats/by-city`)
}
export const importFile = (file: File) => {
  const data = new FormData()
  data.append('file', file)
  return http(`/crm-manage/v1/api/customer/import`, 'POST', {
    dataType: 'JSON',
    contentType: false,
    raw: true,
    processData: false,
    data
  })
}
export const fetchTrackRecords = (payload: {
  pageNum?: number
  pageSize?: number
}) => {
  return http(`/crm-manage/v1/api/track-record`, 'GET', payload)
}
export const fetchClueRecords = (payload: {
  pageNum?: number
  pageSize?: number 
}) => {
  return http(`/crm-manage/v1/api/clue-record`, 'GET', payload)
}
