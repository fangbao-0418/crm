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