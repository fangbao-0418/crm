import http from '@/utils/http'

// 获取权限列表
export const fetchPermissionList = () => {
  return http(`/user/v1/api/authority/list`)
}

// 到新增权限页面准备数据
export const fetchNewPermissionInfo = () => {
  return http(`/user/v1/api/authority/addPage`)
}

// 到修改权限页面准备数据
export const fetchPermissonInfo = () => {
  return http(`/user/v1/api/authority/editPage/{id}`)
}

// 启用禁用权限
export const toggleForbidPermission = (id: number, updateUser: number, status: 0 | 1) => {
  return http(`/user/v1/api/authority/${id}/${updateUser}/${status}`, 'PUT')
}

// 删除权限
export const delPermission = (id: number, updateUser: number) => {
  return http(`/user/v1/api/authority/${id}/${updateUser}`, 'DELETE')
}
