declare namespace Common {
  export interface UserProps {
    companyName?: string
    // email: string
    // phone: string
    username?: string
    companyId?: string
    /** 城市编码 */
    cityCode?: string
    city?: string
    codes?: string[]
    /** 是否支持TQ */
    enableTq?: boolean
    /** 座机区号 */
    tqAreaCode: string
    /** tq类型 0: 无, 1: TQ云呼叫, 2: 易米云通, 3: 工作手机 */
    tqType?: 0 | 1 | 2 | 3
    userType?: 'System' | 'DirectCompany' | 'Agent'
    roleName?: string
    organizationName?: string
  }
  export type ActionPayload = Props
  export interface RegionProps {
    agencyName: string
    code: string
    name: string
    level?: number
    id?: any
    isLeaf?: boolean
    loading?: boolean
    children?: RegionProps[]
    regionLevelResponseList?: RegionProps[]
  }
  export interface Props {
    ajaxCount?: number
    user?: UserProps
    visible?: boolean
  }
  export interface PaginationProps {
    total: number
    current: number
    pageSize: number
  }
}