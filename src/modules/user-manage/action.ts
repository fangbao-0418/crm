import { fetchDepartment, fetchAccountList, fetchRoleList } from './api'
export const fetchDepartmentAction = () => {
  fetchDepartment().then((res) => {
    console.log(res, 'res')
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

export const fetchAccountListAction = () => {
  fetchAccountList().then((res) => {
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

export const fetchRoleListAction = () => {
  fetchRoleList().then((res) => {
    APP.dispatch<UserManage.Props>({
      type: 'change user manage data',
      payload: {
        role: {
          dataSource: res
        }
      }
    })
  })
}
