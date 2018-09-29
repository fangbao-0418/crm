declare namespace Business {
  export interface DetailProps {
    customerName?: string
    contactPerson?: string
    contactPhone?: string
    intention?: string
    telephoneStatus?: string
    freeDays?: string
    source?: string
    createTime?: string
    enterDays: string
    leadingPerson?: string
    id?: string
  }
  export interface SearchProps {
    storageBeginDate?: string
    storageEndDate?: string
    createBeginDate?: string
    createEndDate?: string
    lastTrackBeginTime?: string
    lastTrackEndTime?: string
    pageSize?: number
    pageCurrent?: number
    telephoneStatus?: string
    intention?: string
    customerName?: string
    contactPerson?: string
    contactPhone?: string
    customerSource?: string
    payTaxesNature?: string
    currentSalesperson?: string
    tab?: string
    [field: string]: any
  }
}
