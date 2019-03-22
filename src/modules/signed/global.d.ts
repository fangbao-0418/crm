declare namespace Signed {
  export interface DetailProps {
    id?: string
    customerName?: string
    contactPerson?: string
    area?: string
    currentSalesperson?: string
    operatingAccouting?: string
    /* 入库时间 */
    enterStorageTime?: string
    /* 预约时间 */
    appointTime?: string
    createTime?: string
    endTime?: string
  }
  export interface SearchProps {
    storageBeginDate?: string
    storageEndDate?: string
    createBeginDate?: string
    createEndDate?: string
    appointBeginTime?: string
    appointEndTime?: string
    pageSize?: number
    pageCurrent?: number
    telephoneStatus?: string
    intention?: string
    customerName?: string
    areaName?: string
    contactPerson?: string
    contactPhone?: string
    customerSource?: string
    operatingAccouting?: string
    signSalespersonId?: string
    currentSalespersonId?: string
    contractCode?: string
    payTaxesNature?: string
    serviceExpireBeginMonth?: string
    serviceExpireEndMonth?: string
    [field: string]: any
  }
}
