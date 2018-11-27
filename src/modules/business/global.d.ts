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
    dataSource?: DetailProps[],
    pagination?: PaginationProps,
    searchPayload?: SearchProps
  }
  export interface Props {
    tab1?: TabDataProps,
    tab2?: TabDataProps,
    tab3?: TabDataProps,
    tab4?: TabDataProps,
    selectedTab?: 'tab1' | 'tab2' | 'tab3' | 'tab4'
    count?: number[],
    visibled?: boolean
  }
}
