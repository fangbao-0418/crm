declare namespace CustomerVisit {
  export interface Search {
    /** 客服回访类型 0: "销售跟进", 1: "客资回访", 2: "订单回访", 3: "服务回访", 4: "续费回访" */
    visitType: '0' | '1' | '2' | '3' | '4'
    customerId?: string
    telephoneStatus?: string
    reason?: string
    remark?: string
    /** 合同信息 */
    contract?: string
    /** 交接信息 */
    handover?: string
    /** 销售能力 */
    ability?: string
    /** 服务态度 */
    manner?: string
    /** 跟进实效 */
    track?: string
    /** 确认税额 */
    confirmTax?: string
    /** 反馈 */
    faq?: string
    /** 专业能力 */
    profession?: string
    /** 回复及时性 */
    replyTimely?: string
    /** 满意度 */
    satisfaction?: string
  }
}
