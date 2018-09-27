import http from '@/utils/http'

interface FetchAccountListPayload {
  pageCurrent?: number // 当前页码
  pageSize?: number // 每页显示条数
  name?: string // 姓名
  phone?: string // 手机号
  organizationName?: string // 部门名称
}

interface DelAccountPayload {
  ids: number[] // 账号id列表
  updateUser: number // 操作人id
}

interface AddAccountPayload {
  name: string // 账号名称
  phone: string // 电话
  email: string // 邮箱
  organizationId: number // 部门id
  roleId: number // 角色id
  regionId?: number // 负责区域id
  createUser: number // 操作人id
}

interface ModifyAccountPayload {
  name: string // 账号名称
  phone: string // 电话
  email: string // 邮箱
  organizationId: number // 部门id
  roleId: number // 角色id
  regionId?: number // 负责区域id
  updateUser: number // 操作人id
}

// 查询、获取账号
export const fetchAccountList = (payload?: FetchAccountListPayload) => {
  return http(`/v1/api/user/list`, 'GET', payload)
}

// 删除账号
export const delAccount = (payload: DelAccountPayload) => {
  return http(`/v1/api/user`, 'DELETE', payload)
}

// 新增账号
export const addAccount = (payload: AddAccountPayload) => {
  return http(`/v1/api/user`, 'POST', payload)
}

// 修改账号
export const modifyAccount = (payload: ModifyAccountPayload, id: number) => {
  return http(`/v1/api/user/${id}`, 'PUT', payload)
}
