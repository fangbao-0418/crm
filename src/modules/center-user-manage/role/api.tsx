import http from '@/utils/http'

interface RoleInfoPayload {
  roleName: string // 角色名称
  shareFlag: number // 是否分享资源，0为分享，1为不分享
  roleType: 'System' | 'Proxy' // 角色类型，系统角色传"System",代理商角色传"Proxy"
  roleSystemAuthorityList: string[] // 每个系统下的权限集合
}

// 获取角色列表
export const fetchRoleList = (pageCurrent: number, pageSize: number, roleType: 'System' | 'Proxy') => {
  return http(`/user/v1/api/role/list?pageCurrent=${pageCurrent}&pageSize=${pageSize}&roleType=${roleType}`)
}

// 获取角色新增、修改弹窗数据
export const fetchRoleInfo = (roleType: 'System' | 'Proxy', roleId: any) => {
  return http(`/user/v1/api/role/roleId/${roleId}/roleType/${roleType}`)
}

// 获取新增角色准备数据
export const fetchNewRoleInfo = (roleType: 'System' | 'Proxy') => {
  return http(`/user/v1/api/role/roleType/${roleType}`)
}

// 启用禁用角色
export const toggleForbidRole = (id: any, status: 0 | 1) => {
  return http(`/user/v1/api/role/${id}/${status}`, 'PUT')
}

// 删除角色
export const delRole = (payload: {ids: any[]}) => {
  return http(`/user/v1/api/role`, 'DELETE', payload)
}

// 修改角色
export const modifyRole = (roleInfo: RoleInfoPayload, id: string | number) => {
  return http(`/user/v1/api/role/${id}`, 'PUT', roleInfo)
}

// 新增角色
export const addRole = (roleInfo: RoleInfoPayload) => {
  return http(`/user/v1/api/role`, 'POST', roleInfo)
}
