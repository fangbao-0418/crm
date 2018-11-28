import http from '@/utils/http'
type SearchProps = Business.SearchProps
export const fetchList = (payload: SearchProps) => {
  let url = ''
  if (payload.tab !== '4') {
    url = `/crm-manage/v1/api/customer-opportunity`
  } else {
    url = '/crm-manage/v1/api/business-opportunity/forthcoming-recycle'
  }
  return http(url, 'GET', {
    data: payload
  })
}
export const getRecycleNum = (payload: SearchProps) => {
  return http(`/crm-manage/v1/api/business-opportunity/forthcoming-recycle-nums`, 'GET', {
    data: payload
  })
}
export const getCustomerNum = (payload: SearchProps) => {
  return http(`/crm-manage/v1/api/customer-nums`, 'GET', {
    data: payload
  })
}
export const fetchListappoint = (payload: SearchProps) => {
  return http(`/crm-manage/v1/api/customer-appointment`, 'GET', {
    data: payload
  })
}
export const appointment = (payload: {
  customerIdArr: string[]
}, time: string) => {
  return http(`/crm-manage/v1/api/batch-appointment/${time}`, 'PUT', payload)
}
export const toSales = (paylod: {
  customerIdArr: string[]
  salesperson: string
}, saleId: string) => {
  return http(`/crm-manage/v1/api/batch-distribute/${saleId}`, 'PUT', paylod)
}
export const toOpen = (payload: {
  customerIdArr: string[]
  bus_sea_memo: string
}) => {
  return http(`/crm-manage/v1/api/batch-bus-sea/`, 'PUT', payload)
}
export const toCity = (payload: {
  customerIdArr: string[]
  cityCode: string
}) => {
  return http(`/crm-manage/v1/api/batch-fetch-customer-pool`, 'PUT', payload)
}
export const getcapacityNum = () => {
  return http(`/crm-manage/v1/api/storage-capacity`)
}
export const verifyMessage = (customerId?: string) => {
  return http(`/crm-manage/v1/api/get-customer-track-status?customerId=${customerId}`)
}
