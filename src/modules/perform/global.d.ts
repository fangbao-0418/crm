declare namespace Perform {
  export interface SearchPayload {
    current?: number
    size?: number
    productName?: string
  }
  interface ItemProps {
    id: string
    reward: string
    companyId: number
    productId: number
    productName: string
    productPrice?: string
    disabled?: boolean
  }
  interface PaginationProps {
    total: number
  }
  export interface Props {
    dataSource?: ItemProps[]
    pagintaion?: PaginationProps
  } 
}