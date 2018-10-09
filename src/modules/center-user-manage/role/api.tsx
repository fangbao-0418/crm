import http from '@/utils/http'

interface RoleInfoPayload {
  roleName: string // 角色名称
  shareFlag: number // 是否分享资源，0为分享，1为不分享
  updateUser: string | number // 操作人id
  roleType: 'System' | 'Proxy' // 角色类型，系统角色传"System",代理商角色传"Proxy"
  roleSystemAuthorityRequestList: Request[] // 每个系统下的权限集合
}

interface Request {
  systemCode: string // 系统编码
  systemName: string // 系统名称
  roleSystemAuthorityItemList: Item[] // 系统对应权限的列表
}

interface Item {
  authorityId: number // 权限id
  authorityName: string // 权限名称
  enableFlag: boolean // 是否选中标识，true为选中，false位未选中
  roleSystemAuthorityButtonList: Button[] // 权限下包含的按钮集合
}

interface Button {
  authorityButtonId: number // 权限按钮中间表id
  buttonName: any // 按钮名称
  enableFlag: boolean // 是否选中标识，true为选中，false为未选中
}

// 获取角色列表
export const fetchRoleList = (pageCurrent: number, pageSize: number, roleType: 'System' | 'Proxy') => {
  return http(`/user/v1/api/role/list?pageCurrent=${pageCurrent}&pageSize=${pageSize}&roleType=${roleType}`)
}

// 获取角色新增、修改弹窗数据
export const getRoleInfo = (roleType: 'System' | 'Proxy', roleId?: any) => {
  roleId = roleId || ''
  return http(`/user/v1/api/role/roleId/${roleId}/roleType/${roleType}`)
}

// 启用禁用角色
export const toggleForbidRole = (id: any, updateUser: any, status: 0 | 1) => {
  return http(`/user/v1/api/role/${id}/${updateUser}/${status}`, 'PUT')
}

// 删除角色
export const delRole = (payload: {ids: any[], updateUser: string | number}) => {
  return http(`/user/v1/api/role`, 'DELETE', payload)
}

// 新增、修改角色
export const setRole = (roleInfo: RoleInfoPayload, id?: string | number) => {
  id = id || ''
  return http(`/user/v1/api/role/${id}`, 'PUT', roleInfo)
}
