import http from '@/utils/http'

export const fetchDepartment = (id: string = '1001') => {
  return http(`/user/v1/api/organization/list/Agent/${id}`)
}

export const addDepartment = (payload: {
  name: string,
  parentId?: string,
  companyId?: number,
  organizationType?: 'Agent' | 'DirectCompany'
}) => {
  payload.companyId = payload.companyId !== undefined ? payload.companyId : 1001
  payload.organizationType = 'Agent'
  payload.parentId = payload.parentId !== undefined ? payload.parentId : '0'
  return http(`/user/v1/api/organization`, 'POST', payload)
}
export const updateDepartment = (payload: {
  name: string,
  id: string
}) => {
  const id = payload.id
  return http(`/user/v1/api/organization/${id}`, 'PUT', {
    name: payload.name
  })
}
export const changeDepartmentStatus = (payload: {
  id: string,
  status: 0 | 1
}) => {
  const id = payload.id
  const status = payload.status
  return http(`/user/v1/api/organization/${id}/${status}`, 'PUT')
}
export const deleteDepartment = (id: string) => {
  return http(`/user/v1/api/organization/${id}`, 'DELETE')
}

export const fetchAccountList = (payload: {
  pageCurrent?: number,
  pageSize?: number,
  name?: string,
  phone?: string
  organizationName?: string,
  companyId?: string,
  userType?: 'Agent'
} = {}) => {
  payload.pageCurrent = payload.pageCurrent || 1
  payload.pageSize = payload.pageSize || 15
  return http(`/user/v1/api/user/list`, 'GET', payload)
}

export const addAccount = (payload: UserManage.AccountItemProps) => {
  return http(`/user/v1/api/user`, 'POST', payload)
}
export const updateAccount = (payload: UserManage.AccountItemProps) => {
  return http(`/user/v1/api/user/${payload.id}`, 'PUT', payload)
}

export const fetchRoleList = () => {
  return http(`/user/v1/api/role/list/Proxy`)
}
