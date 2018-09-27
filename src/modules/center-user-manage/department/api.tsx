import http from '@/utils/http'

interface DelOrganizationPayload {
  id: number // 部门id
  updateUser: number // 操作人id
}

interface AddOrganizationPayload {
  name: string // 部门名称
  parentId: string // 父节点id（根节点传0）
  companyId: string // 公司id
  createUser: string // 操作人id
}

interface ModifyOrganizationPayload {
  name: string // 	部门名称
  updateUser: number // 操作人id
}

// 获取部门列表
export const fetchOrganizationList = () => {
  return http(`/v1/api/organization/list`)
}

// 删除部门
export const delOrganization = (payload: DelOrganizationPayload) => {
  return http(`/v1/api/organization`, 'DELETE', payload)
}

// 添加部门
export const addOrganization = (payload: AddOrganizationPayload) => {
  return http(`/v1/api/organization`, 'POST', payload)
}

// 修改部门
export const modifyOrganization = (payload: ModifyOrganizationPayload, id: number) => {
  return http(`/v1/api/organization/${id}`, 'PUT', payload)
}
