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
  }
  export type ActionPayload = Props
  export interface RegionProps {
    code: string
    name: string
    level?: number
    id?: number
    isLeaf?: boolean
    loading?: boolean
    children?: RegionProps[]
    regionLevelResponseList?: RegionProps[]
  }
  export interface AgentProps {
    areaCode?: number
    areaName?: string
    name?: string
    id?: number
    companyType?: UserManage.TypeProps
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