import http from '@/utils/http'
type SearchProps = Business.SearchProps
export const fetchList = (payload: SearchProps) => {
  return http(`/crm-manage/v1/api/customer-opportunity`, 'GET', {
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
export const fetchListRecycle = (payload: SearchProps) => {
  return http(`/crm-manage/v1/api/business-opportunity/forthcoming-recycle`, 'GET', {
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
// 除去我的客资其他销售列表都是根据当前用户获取
export const getSalesList = (userId: number) => {
  return http(`/user/v1/api/user/list/sale/${userId}`)
}
// 我的客资 根据机构获取销售列表
export const getSalesByCompany = (companyid: number) => {
  return http(`/user/v1/api/user/list/sale/company/${companyid}`)
}
// 根据城市获取所属机构
