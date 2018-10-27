declare namespace Perform {
  export interface SearchPayload {
    pageCurrent?: number
    pageSize?: number
    templateName?: string
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
    pageSize: number
    current: number
  }
  export interface Props {
    dataSource?: ItemProps
    pagination?: PaginationProps
  } 
}