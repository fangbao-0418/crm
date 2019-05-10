declare namespace ReadyCustomer {
  interface ParamsProps {
    /** 分配开始时间 */
    distributionBeginDate?: string
    /** 分配结束时间 */
    distributionEndDate?: string
    /** 创建开始时间 */
    createBeginDate?: string
    /** 创建结束时间 */
    createEndDate?: string
    intention?: string
    telephoneStatus?: string
    customerName?: string
    contactPerson?: string
    customerSource?: string
    agencyId?: string
    cityCode?: string
    status?: string
    pageCurrent: number
    pageSize: number
    [field: string]: any
  }
  interface DetailProps {
    customerId?: string
    customerName?: string
    contactPerson?: string
    vacantDays?: string
    customerSource?: string
    agencyName?: string
    status?: string
    distributionTime?: string
    /** 录入签单时间 */
    enterSignTime?: string
    /** 录入签单金额 */
    enterSignMoney?: string
  }
}
