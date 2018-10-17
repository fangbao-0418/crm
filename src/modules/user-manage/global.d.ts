declare namespace UserManage {
  interface DepartmentItemProps {
    id?: string
    name?: string
    parentId?: string
    organizationList?: DepartmentItemProps[]
    status?: 0 | 1
    title?: string
    value?: string
    children?: DepartmentItemProps[]
  }
  interface AccountItemProps {
    id?: string
    phone?: string
    name?: string
    email?: string
    roleId?: string
    roleName?: string
    organizationId?: string
    /** 部门名称 */
    organizationName?: string
    identity?: string
    parentId?: string
    companyId?: string
    companyName?: string
  }
  interface PaginationProps {
    total: number
    pageSize: number
    current: number
  }
  interface RoleItem {
    id?: number
    name?: string
    status?: 0 | 1
  }
  interface Props {
    department?: {
      dataSource: DepartmentItemProps[]
    },
    account?: {
      dataSource?: AccountItemProps[],
      pagination?: PaginationProps
    },
    role?: {
      dataSource?: RoleItem[],
      pagination?: PaginationProps
    }
    tab?: 'department' | 'account' | 'role'
  }
}