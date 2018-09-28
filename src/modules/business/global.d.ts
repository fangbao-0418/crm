declare namespace Business {
  export interface DetailProps {
    customerName?: string
    contactPerson?: string
    contactPhone?: string
    can?: string
    flowtime?: string
    freeDays?: string
    customerSource?: string
    createTime?: string
    leadingPerson?: string
    value?: string
    text?: string
  }
  export interface SearchProps {
    storageBeginDate?: string
    storageEndDate?: string
    createBeginDate?: string
    createEndDate?: string
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
    [field: string]: any
  }
}
