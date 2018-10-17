import http from '@/utils/http'

interface AddPermissionPayload {
  code: string // 权限编码
  name: string // 权限名称
  url: string // 权限URL
  parentId: number // 父节点id,一级权限传0
  systemCode: string // 系统编码
  buttonList: number[] // 权限按钮id数组，例如：[1,2,3]
}

interface ModifyPermissionPayload {
  code: string // 权限编码
  name: string // 权限名称
  url: string // 权限URL
  buttonList: number[] // 权限按钮id数组，例如：[1,2,3]
}

// 获取权限列表
export const fetchPermissionList = () => {
  return http(`/user/v1/api/authority/list`)
}

// 启用禁用权限
export const toggleForbidPermission = (id: number, status: 0 | 1) => {
  return http(`/user/v1/api/authority/${id}/${status}`, 'PUT')
}

// 删除权限
export const delPermission = (id: number) => {
  return http(`/user/v1/api/authority/${id}`, 'DELETE')
}

// 新增权限
export const addPermission = (payload: AddPermissionPayload) => {
  return http(`/user/v1/api/authority`, 'POST', payload)
}

// 修改权限
export const modifyPermission = (id: number, payload: ModifyPermissionPayload) => {
  return http(`/user/v1/api/authority/${id}`, 'PUT', payload)
}
