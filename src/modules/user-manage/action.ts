import { fetchDepartment, fetchAccountList, fetchRoleList, fetchCompanyList } from './api'
export const fetchDepartmentAction = (id: string, type: UserManage.TypeProps) => {
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

export const fetchAccountListAction = (payload: UserManage.AccoutSearchPayload) => {
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
  roleType: UserManage.TypeProps,
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

export const fetchCompanyListAction = (type: UserManage.TypeProps) => {
  fetchCompanyList(type).then((res) => {
    APP.dispatch<UserManage.Props>({
      type: 'change user manage data',
      payload: {
        companyList: res
      }
    })
  })
}
