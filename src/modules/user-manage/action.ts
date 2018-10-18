import { fetchDepartment, fetchAccountList, fetchRoleList, fetchCompanyList } from './api'
export const fetchDepartmentAction = (id: string, type: 'Agent' | 'DirectCompany') => {
  fetchDepartment(id, type).then((res) => {
    APP.dispatch<UserManage.Props>({
      type: 'change user manage data',
      payload: {
        department: {
          dataSource: res
        }
      }
    })
  })
}

export const fetchAccountListAction = (payload: {
  pageCurrent?: number,
  pageSize?: number,
  name?: string,
  phone?: string
  organizationName?: string,
  companyId: string,
  userType: 'Agent' | 'DirectCompany'
}) => {
  fetchAccountList(payload).then((res) => {
    APP.dispatch<UserManage.Props>({
      type: 'change user manage data',
      payload: {
        account: {
          dataSource: res.records,
          pagination: {
            total: res.pageTotal,
            pageSize: res.pageSize,
            current: res.pageCurrent
          }
        }
      }
    })
  })
}

export const fetchRoleListAction = (payload: {
  pageCurrent: number,
  pageSize?: number,
  roleType: 'Agent' | 'DirectCompany',
  companyId: string
}) => {
  payload.pageSize = payload.pageSize || 15
  fetchRoleList(payload).then((res) => {
    APP.dispatch<UserManage.Props>({
      type: 'change user manage data',
      payload: {
        role: {
          dataSource: res.records
        }
      }
    })
  })
}

export const fetchCompanyListAction = (type: 'Agent' | 'DirectCompany') => {
  fetchCompanyList(type).then((res) => {
    APP.dispatch<UserManage.Props>({
      type: 'change user manage data',
      payload: {
        companyList: res
      }
    })
  })
}
