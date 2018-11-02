declare namespace Customer {
  export interface LinkManProps {
    contactPerson: string
    contactPhone: string
    customerSource?: string
    mark?: string
    worker?: string
    isMainContact?: string
    source?: number
    key?: number
  }
  export type ActionPayload = Props
  export interface DetailProps {
    /** 客户id */
    id?: string
    /** 客户id */
    customerId?: string
    customerName?: string
    type?: string
    legalPerson?: string
    /** 法人身份证 */
    legalPersonCard?: string
    payTaxesNature?: string
    /** 社会统一信用代码 */
    unifiedCreditCode?: string
    /** 企业注册号 */
    companyRegisterCode?: string
    /** 注册资金 */
    registeredCapital?: string
    /** 营业期限起始 */
    businessHoursBegin?: string
    /** 营业期限结束 */
    businessHoursEnd?: string
    /** 是否有固定营业期限 */
    isFixedPeriod?: 0 | 1
    /** 经营范围 */
    businessScope?: string
    address?: string
    vacantDays?: string
    cityName?: string
    cityCode?: string
    customerSource?: string
    enterStorageTime?: string
    remark?: string
    userId?: string
    relatedCompany?: string
    customerNameType?: string
    areaCode?: string
    areaName?: string
    isConfirmed?: number
    contactPersons?: LinkManProps[]
    /** 销售 */
    currentSalesperson?: string
    agencyId?: string
    tagIntention?: string
    createTime?: string
    trackRecord?: TrackRecord
    tagTelephoneStatus?: string
    businessLicenseUrl?: string
    legalPersonCardUrl?: string
    /** 最后跟进人 */
    lastReleaseSalesperson?: string
    /** 信息来源 */
    companyInfoSource?: number
  }
  export interface AutoAssignProps {
    bigAreaName: string
    cityName: string
    agencyName: string
    autoDistributeWeight: string
    autoDistributeMaxNum: string
  }
  export interface CapacityProps {
    bigAreaName: string
    cityName: string
    agencyName: string
    storageCapacity: string
    maxTrackDays: string
    maxProtectDays: string
  }
  export interface AssignResultProps {
    allocatedNum: number
    repeatCustomers: Array<{name?: string, id?: string}>
    total: number
    successCustomers?: {[key: string]: any}
  }
  export interface TrackRecord {
    customerId?: string
    salesperson?: string
    tagIntention?: number
    tagCustomerStatus?: number
    tagFollowupStatus?: number
    tagTelephoneStatus?: number
    remark?: string
    createTime?: string
    trackRecordType?: string
    /** 预约时间 */
    appointTime?: string
  }
  export interface TianYanDataProps {
    apiName: string
    id: string
    name: string
  }
  export interface Props {
    linkMan?: LinkManProps[]
    dataSource?: DetailProps[]
    detail?: DetailProps
    autoAssign?: AutoAssignProps[]
    capacity?: CapacityProps[]
    assignResult?: AssignResultProps
    spicalAssetsList?: CustomerSet.SpecialAssetsProps[]
    /** 跟进记录 */
    trackRecords?: TrackRecord[]
    /** 线索记录 */
    clueRecords?: TrackRecord[]
  }
}
