declare namespace OutSite {
  /** 任务类型 */
  export interface TaskItem {
    id?: number
    name: string
    productId?: number
    productName?: string
    subList?: SubTaskItem[]
  }
  /** 子任务类型 */
  export interface SubTaskItem {
    id?: number
    name: string
    subId?: number
    sort?: number
  }
}