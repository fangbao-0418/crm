declare namespace Customer {
  export interface LinkManProps {
    contactPerson: string
    contactPhone: string
    customerSource: string
    mark: string
  }
  export type ActionPayload = Props
  export interface Props {
    linkMan: LinkManProps[]
  }
}
