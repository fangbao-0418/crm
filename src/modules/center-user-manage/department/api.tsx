import http from '@/utils/http'

interface DelOrganizationPayload {
  id: number // 部门id
  updateUser: number // 操作人id
}

interface AddOrganizationPayload {
  name: string // 部门名称
  parentId: any // 父节点id（根节点传0）
  companyId: number // 公司id
  organizationType: string // 机构类型，固定传“System”
}

interface ModifyOrganizationPayload {
  name: string // 	部门名称
}

// 获取部门列表
export const fetchOrganizationList = () => {
  return http(`/user/v1/api/organization/list/System/0`)
}

// 删除部门
export const delOrganization = (id: number) => {
  return http(`/user/v1/api/organization/${id}`, 'DELETE')
}

// 添加部门
export const addOrganization = (payload: AddOrganizationPayload) => {
  return http(`/user/v1/api/organization`, 'POST', payload)
}

// 修改部门
export const modifyOrganization = (payload: ModifyOrganizationPayload, id: number) => {
  return http(`/user/v1/api/organization/${id}`, 'PUT', payload)
}

// 启用禁用部门
export const toggleForbidOrganization = (id: number, status: 0 | 1) => {
  return http(`/user/v1/api/organization/${id}/${status}`, 'PUT')
}
