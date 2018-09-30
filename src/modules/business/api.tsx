import http from '@/utils/http'
type SearchProps = Business.SearchProps
export const fetchList = (payload: SearchProps) => {
  return http(`/api/customer-opportunity`, 'GET', {
    data: payload
  })
}
export const getRecycleNum = (payload: SearchProps) => {
  return http(`/api/business-opportunity/forthcoming-recycle-nums`, 'GET', {
    data: payload
  })
}
export const getCustomerNum = (payload: SearchProps) => {
  return http(`/api/customer-nums`, 'GET', {
    data: payload
  })
}
export const fetchListappoint = (payload: SearchProps) => {
  return http(`/api/customer-appointment`, 'GET', {
    data: payload
  })
}
export const fetchListRecycle = (payload: SearchProps) => {
  return http(`/api/business-opportunity/forthcoming-recycle`, 'GET', {
    data: payload
  })
}
export const appointment = (payload: {
  customerIdArr: string[]
}, time: string) => {
  return http(`/api/batch-appointment/${time}`, 'PUT', payload)
}
export const toSales = (paylod: {
  customerIdArr: string[]
  salesperson: string
}, saleId: string) => {
  return http(`/api/batch-distribute/${saleId}`, 'PUT', paylod)
}
export const toOpen = (payload: {
  customerIdArr: string[]
  bus_sea_memo: string
}) => {
  return http(`/api/batch-bus-sea/`, 'PUT', payload)
}
export const toCity = (payload: {
  customerIdArr: string[]
  cityCode: string
}) => {
  return http(`/api/batch-fetch-customer-pool`, 'PUT', payload)
}
export const getcapacityNum = () => {
  return http(`/api/storage-capacity`)
}
