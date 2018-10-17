declare namespace OperateLog {
  export interface SearchPayload {
    pageCurrent?: number
    pageSize?: number
    /** 系统标识 */
    systemFlag?: string
    /** 系统模块标识 */
    systemModularFlag?: string
    /** 操作人姓名 */
    operatorName?: string
    operationStartTime?: string
    /** 操作结束时间 */
    operationEndTime?: string
  }
  export interface ItemProps {
    /** 系统标识 */
    systemFlag?: string
    /** 系统模块标识 */
    systemModularFlag?: string
    /** 变更前实体 */
    originalMode?: string
    /** 变更后实体 */
    modifyMode?: string
    operatorId?: string
    operatorName?: string
    operatorIp?: string
    operationTime?: string
  }
}