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
          },
          searchPayload: payload
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
    // res = [res[0]]
    if (res.length === 1) {
      APP.dispatch<UserManage.Props>({
        type: 'change user manage data',
        payload: {
          companyList: res,
          companyName: res[0].name,
          companyCode: res[0].id,
          onlyOne: true
        }
      })
    } else {
      APP.dispatch<UserManage.Props>({
        type: 'change user manage data',
        payload: {
          companyList: res,
          onlyOne: false
        }
      })
    }
  })
}
