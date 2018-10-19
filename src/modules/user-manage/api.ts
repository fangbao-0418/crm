import http from '@/utils/http'

export const fetchDepartment = (id: string , type: 'Agent' | 'DirectCompany' = 'Agent') => {
  return http(`/user/v1/api/organization/list/${type}/${id}`)
}

export const addDepartment = (payload: {
  name: string,
  parentId?: string,
  companyId: string,
  organizationType: 'Agent' | 'DirectCompany'
}) => {
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
  companyId: string,
  userType: 'Agent' | 'DirectCompany'
}) => {
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

export const fetchRoleList = (payload: {
  pageCurrent: number,
  pageSize?: number,
  roleType: 'Agent' | 'DirectCompany',
  companyId: string
}) => {
  return http(`/user/v1/api/role/list`, 'GET', payload)
}
export const fetchRolePermissionList = (type: 'Agent' | 'DirectCompany') => {
  return http(`/user/v1/api/role/roleType/${type}`)
}
export const addRole = (payload: {
  roleName?: string,
  shareFlag?: 0 | 1,
  roleType?: 'Agent' | 'DirectCompany',
  companyId?: string,
  authorityIdList?: string[]
}) => {
  return http(`/user/v1/api/role/`, 'POST', payload)
}
export const deleteRole = (ids: any[]) => {
  return http(`/user/v1/api/role`, 'DELETE', {ids})
}
export const changeRoleStatus = (id: number, status: 0 | 1) => {
  return http(`/user/v1/api/role/${id}/${status}`, 'PUT')
}
export const fetchRoleDetail = (id?: string) => {
  return http(`/user/v1/api/role/roleId/${id}/roleType/DirectCompany`)
}
export const fetchCompanyList = (type: 'Agent' | 'DirectCompany') => {
  return http(`/user/v1/api/company/list/${type}`)
}
