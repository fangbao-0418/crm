declare namespace OutSite {
  export enum Status {
    UNDISTRIBUTED = '待分配',
    CANCELLED = '已取消'
  }
  export type Map<T> = {[index: string]: T}
  /** 任务类型 */
  export interface TaskItem {
    id?: number
    name?: string
    productId?: number
    productName?: string
    subList?: SubTaskItem[]
    /** 是否优先级 */
    priority?: number
    status?: string
    [field: string]: any
  }
  /** 子任务类型 */
  export interface SubTaskItem {
    id?: number
    name?: string
    subId?: number
    sort?: number
  }
}