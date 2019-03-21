declare namespace Business {
  export interface DetailProps {
    customerName?: string
    contactPerson?: string
    intention?: string
    telephoneStatus?: string
    freeDays?: string
    source?: string
    /* 入库时间 */
    enterDays?: string
    leadingPerson?: string
    appointmentTime?: string
    id?: string
    redPoint?: number
    current_salesperson?: string
    /* 最后跟进时间 */
    lastTrackTime?: string
    /** 支付中状态 */
    payStatus?: number
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
    customerId?: string
    contactPerson?: string
    contactPhone?: string
    customerSource?: string
    payTaxesNature?: string
    currentSalesperson?: string
    tab?: string
    [field: string]: any
  }
  export interface PaginationProps {
    total: number
    current: number
    pageSize: number
  }
  export interface TabDataProps {
    dataSource?: DetailProps[]
    pagination?: PaginationProps
    searchPayload?: SearchProps
  }
  export interface Props {
    /** 全部 */
    tab1?: TabDataProps,
    /** 已有沟通已被拆分为有无意向客户 */
    tab2?: TabDataProps,
    /** 新客资 */
    tab3?: TabDataProps,
    /** 即将收回 */
    tab4?: TabDataProps,
    /** 意向客户 */
    tab5?: TabDataProps,
    /** 无意向客户 */
    tab6?: TabDataProps,
    /** tab1: 全部, tab2: 已有沟通, tab3: 新客资, tab4: 即将被收回, tab5: 意向客户, tab6: 无意向客户 */
    selectedTab?: 'tab1' | 'tab2' | 'tab3' | 'tab4' | 'tab5' | 'tab6'
    count?: number[],
    visibled?: boolean
  }
}
