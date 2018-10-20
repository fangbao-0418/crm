import http from '@/utils/http'

export const fetchDirectList = (payload: Organ.DirectSearchPayload) => {
  return http(`/user/v1/api/company/list`, 'POST', payload)
}
export const fetchCompanyDetail = (payload: {
  id?: number
}) => {
  return http(`/user/v1/api/company/selectCompanyById`, 'GET', payload)
}
export const changeCompanyInfo = (payload: Organ.DirectItemProps) => {
  return http(`/user/v1/api/company/add`, 'POST', payload)
}

// 获取核算中心列表&
export const fetchAccountingList = (pageCurrent: number, pageSize: number, name?: string) => {
  return http(`/user/v1/api/adjust/account/pageList?pageCurrent=${pageCurrent}&pageSize=${pageSize}&name=${name}`)
}

// 删除核算中心
export const delAccounting = (id: number) => {
  return http(`/user/v1/api/adjust/account/delete?id=${id}`)
}

// 修改核算中心
export const changeAccounting = (payload: Organ.AccountingItemProps) => {
  return http(`/user/v1/api/adjust/account/add`, 'POST', payload)
}

// 根据id查询核算中心信息
export const fetchAccountingInfo = (id: number) => {
  return http(`/user/v1/api/adjust/account/get?id=${id}`)
}

// 查询负责区域信息
export const fetchAccountingProvince = () => {
  return http(`/user/v1/api/adjust/account/province`)
}
