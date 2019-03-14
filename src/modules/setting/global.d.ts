declare namespace Setting {
  /** 系统设置列表查询条件 */
  export interface SearchParams {
    /** 大区code */
    regionCode?: string
    /** 城市code */
    cityCode?: string
    /** 机构列表 */
    agencyId?: string
    /** tq提供商 */
    tqType?: string
    /** 是否启用自动分配 */
    isAutoDistribute?: string
    pageSize?: number
    pageCurrent?: number
  }
  /** 系统设置字段属性 */
  export interface ItemProps {
    /** 大区编号 */
    regionCode?: string
    /** 大区名称 */
    regionName?: string
    /** 省份编号 */
    provinceCode?: string
    /** 省份名称 */
    provinceName?: string
    /** 城市码 */
    cityCode?: string
    /** 城市名称 */
    cityName?:	string
    /** 机构Id */
    agencyId?: string
    /** 机构名称 */
    agencyName?: string
    /** 自动分配权值 */
    autoDistributeWeight?: string
    /** 自动分配日最大值 */
    autoDistributeMaxNum?: string
    /** 销售库容 */
    storageCapacity?: number
    /** 最大跟进期 */
    maxTrackDays?: number
    /** 最大保护期 */
    maxProtectDays?: number
    /** 是否启用自动分配 */
    isAutoDistribute?: number
    id?: string
    /** tq管理员 */
    tqAdmin?: string
    /** tq拨打枚举 */
    tqType?: string
    /** tq区号 */
    tqZoneCode?: string
  }
  /** 保存设置参数 */
  interface Params {
    agencyId?: string
    /** 自动分配权值 */
    autoDistributeWeight?: string
    /** 自动分配日最大值 */
    autoDistributeMaxNum?: string
    /** 销售库容 */
    storageCapacity?: number
    /** 最大跟进期 */
    maxTrackDays?: number
    /** 最大保护期 */
    maxProtectDays?: number
    /** 是否启用自动分配 */
    isAutoDistribute?: number
    /** tq管理员 */
    tqAdmin?: string
    /** tq拨打枚举 */
    tqType?: string
    /** tq区号 */
    tqZoneCode?: string
  }
  /** 省市列表 */
  interface RegionProps {
    code: string
    name: string
    level?: number
    id?: any
    isLeaf?: boolean
    loading?: boolean
    children?: RegionProps[]
    regionLevelResponseList?: RegionProps[]
    regionList?: RegionProps[]
  }
  /** 机构列表 */
  interface AgencyProps {
    agencyId?: string
    agencyName?: string
  }
}