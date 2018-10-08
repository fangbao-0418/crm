declare namespace Customer {
  export interface LinkManProps {
    contactPerson: string
    contactPhone: string
    customerSource?: string
    mark?: string
    worker?: string
    isMainContact?: string
  }
  export type ActionPayload = Props
  export interface DetailProps {
    customerName?: string
    customerId?: string
    type?: string
    legalPerson?: string
    payTaxesNature?: string
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
    isConfirmed?: string
    contactPersons?: LinkManProps[]
    currentSalesperson?: string
    agencyId?: string
    tagIntention?: string
    createTime?: string
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
    exists: Array<{name: string, id: string}>
    total: number
  }
  export interface TrackRecord {
    customerId?: string
    salesperson?: string
    tagIntention?: string
    tagCustomerStatus?: string
    tagFollowupStatus?: string
    tagTelephoneStatus?: string
    remark?: string
    appointTime?: string
    createTime?: string
    trackRecordType?: string
  }
  export interface Props {
    linkMan?: LinkManProps[]
    dataSource?: DetailProps[]
    detail?: DetailProps
    autoAssign?: AutoAssignProps[]
    capacity?: CapacityProps[],
    assignResult?: AssignResultProps
  }
}
