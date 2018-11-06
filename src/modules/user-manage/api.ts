import http from '@/utils/http'

export const fetchDepartment = (id: string , type: UserManage.TypeProps = 'Agent') => {
  return http(`/user/v1/api/organization/list/${type}/${id}`)
}

export const addDepartment = (payload: {
  name: string,
  parentId?: string,
  companyId: string,
  organizationType: UserManage.TypeProps
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

export const fetchAccountList = (payload: UserManage.AccoutSearchPayload) => {
  return http(`/user/v1/api/user/list`, 'GET', payload)
}
export const addAccount = (payload: UserManage.AccountItemProps) => {
  return http(`/user/v1/api/user`, 'POST', payload)
}
export const deleteAccount = (ids: any[]) => {
  return http(`/user/v1/api/user`, 'DELETE', {
    ids
  })
}
/** 获取上级直属列表 */
export const fetchAssignSuperior = (payload: {
  organizationId: number,
  userIds: number[]
}) => {
  return http(`/user/v1/api/user/batch/select`, 'PUT', payload)
}
/** 批量分配账号 */
export const batchAssignAccount = (payload: {
  parentId: number,
  userIds: number[]
}) => {
  return http(`/user/v1/api/user/batch`, 'PUT', payload)
}
export const updateAccount = (payload: UserManage.AccountItemProps) => {
  return http(`/user/v1/api/user/${payload.id}`, 'PUT', payload)
}
/** 获取账号详情角色权限 */
export const fetchRolePermission = (id?: number) => {
  return http(`/user/v1/api/authority/role/${id}`)
}
/** 获取账号详情角色列表 */
export const fetchRole = (type: UserManage.TypeProps) => {
  return http(`/user/v1/api/role/list/${type}`)
}
/** 获取上级直属 */
// export const fetchSuperior = (id?: string) => { // 接口修改为下面
//   return http(`/user/v1/api/user/list/organization/${id}`)
// }
export const fetchSuperior = (id?: string) => {
  return http(`/user/v1/api/user/list/parent/organization/${id}`)
}
/** 获取身份列表 */
export const fetchIdentity = (type: UserManage.TypeProps) => {
  return http(`/user/v1/api/identity/list/${type}`)
}
/** 获取负责区域 */
export const fetchOwnArea = (id: string) => {
  // /v1/api/region/list/company/{companyId}
  return http(`/user/v1/api/region/list/company/${id}`)
}
/** 获取自定义角色列表 */
export const fetchRoleList = (payload: {
  pageCurrent: number,
  pageSize?: number,
  roleType: UserManage.TypeProps,
  companyId: string
}) => {
  return http(`/user/v1/api/role/list`, 'GET', payload)
}
export const fetchRolePermissionList = (type: UserManage.TypeProps) => {
  return http(`/user/v1/api/role/roleType/${type}`)
}
export const addRole = (payload: {
  roleName?: string,
  shareFlag?: 0 | 1,
  roleType?: UserManage.TypeProps,
  companyId?: string,
  authorityIdList?: string[]
}) => {
  return http(`/user/v1/api/role/`, 'POST', payload)
}
export const editRole = (payload: UserManage.RoleItem) => {
  const id = payload.roleId
  delete payload.roleId
  return http(`/user/v1/api/role/${id}`, 'PUT', payload)
}
export const deleteRole = (ids: any[]) => {
  return http(`/user/v1/api/role`, 'DELETE', {ids})
}
export const changeRoleStatus = (id: number, status: 0 | 1) => {
  return http(`/user/v1/api/role/${id}/${status}`, 'PUT')
}
export const fetchRoleDetail = (id: number, type: UserManage.TypeProps) => {
  return http(`/user/v1/api/role/roleId/${id}/roleType/${type}`)
}
export const fetchCompanyList = (type: UserManage.TypeProps) => {
  return http(`/user/v1/api/company/list/${type}`)
}
