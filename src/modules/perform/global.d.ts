declare namespace Perform {
  export interface SearchPayload {
    current?: number
    size?: number
    productName?: string
  }
  export interface RervisePayload {
    id?: number
    reward:string
  }
  interface ItemProps {
    reward: string
    companyId: number
    productId: number
    productName: string
    productPrice?: string
    disabled?: boolean
  }
  interface PaginationProps {
    total: number
    pageSize: number
    current: number
  }
  export interface Props {
    dataSource?: ItemProps[]
    pagintaion?: PaginationProps
  } 
}