declare namespace Customer {
  export interface LinkManProps {
    contactPerson: string
    contactPhone: string
    customerSource?: string
    mark?: string
  }
  export type ActionPayload = Props
  export interface DetailProps {
    customerName?: string
    type?: string
    legalPerson?: string
    address?: string
    vacantDays?: string
    cityName?: string
    cityCode?: string
    customerSource?: string
    createTime?: string
    value?: string
    text?: string
    remark?: string
    userId?: string
    relatedCompany?: string
    contactsList?: LinkManProps[]
  }
  export interface Props {
    linkMan?: LinkManProps[]
    dataSource?: DetailProps[]
    detail?: DetailProps
  }
}
