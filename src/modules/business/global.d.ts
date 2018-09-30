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
    appointmentTime?: string
    id?: string
    current_salesperson?: string
  }
  export interface SearchProps {
    appointStartTime?: string
    appointEndDate?: string
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
