declare namespace UserManage {
  export type TypeProps = 'DirectCompany' | 'Agent' | 'System'
  interface CompanyProps {
    id?: number
    name?: string
    regionArea?: number
  }
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
    userType?: TypeProps
    parentId?: string
    companyId?: string
    companyName?: string
  }
  // 上级直属
  interface SuperiorProps {
    id?: string
    name: string
    /** 是否是管理者 */
    managerFlag: boolean
  }
  /** 身份 */
  interface IdentityProps {
    code: string
    name: string
    identityType: string
  }
  /** 负责区域 */
  interface OwnAreaProps extends Common.RegionProps {
    /** 是否选中 */
    enableFlag?: boolean
    /** 是否是负责区域 */
    regionFlag?: boolean
    /** 子区域集合 */
    regionList?: OwnAreaProps[]
    /** 地区缩写名称 */
    shortName?: string
    title?: string
    value?: string
    children?: OwnAreaProps[]
  }
  interface PaginationProps {
    total: number
    pageSize: number
    current: number
  }
  interface RoleSearchPayload {
    pageCurrent: number,
    pageSize: number,
    roleType: 'Agent' | 'DirectCompany'
    companyId: string
  }
  interface RoleItem {
    /** 角色Id */
    roleId?: number
    /** 角色Id */
    id?: number
    name?: string
    /** 启用状态 */
    status?: 0 | 1
    /** 是否分享数据 */
    shareFlag?: 0 | 1
    companyId?: string
    roleName?: string
    roleType?: 'Agent' | 'DirectCompany'
    authorityIdList?: string[]
  }
  interface RolePermissionItemProps {
    authorityResponseList?: RolePermissionItemProps[]
    code?: string
    enableFlag?: boolean
    name?: string
    parentId?: number
    status?: number
    url?: string
    id?: any
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
    tab?: 'department' | 'account' | 'role',
    companyList?: CompanyProps[]
    companyCode?: string
    companyName?: string
  }
}