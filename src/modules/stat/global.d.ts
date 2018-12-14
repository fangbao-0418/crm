/** crm数据统计 */
declare namespace CrmStat {
  /** 坐席监控 */
  export interface MonitorItemProps {
    id: any
    /** 销售组名称 */
    salespersonGroupName: string
    /** 呼入量 */
    callInTotalNums: number
    /** 呼出量 */
    callOutTotalNums: number
    /** 接通量 */
    callSuccessNums: number
    /** 总通话时长 */
    totalCallDuration: number
    /** 平均通话时长 */
    averageCallDuration: number
    /** 组内人数 */
    salesGroupNums: number
    /** 统计时间 */
    totalDate: number
  }
  export interface MonitorGroupItemProps {
    totalRecord: {
      id: any
      /** 销售组名称 */
      salespersonGroupName: string
      /** 呼入量 */
      callInTotalNums: number
      /** 呼出量 */
      callOutTotalNums: number
      /** 接通量 */
      callSuccessNums: number
      /** 总通话时长 */
      totalCallDuration: number
      /** 平均通话时长 */
      averageCallDuration: number
      /** 组内人数 */
      salesGroupNums: number
      /** 统计时间 */
      totalDate: number
      /** 小组人数 */
      groupNums: number
    },
    organizationList: MonitorGroupItemProps[]
  }
  export interface CallDetailItemProps {
    id: any
    mediaUrl: string
    contactName: string
    telephone: string
    customerName: string
    /** 挂断类型 */
    hangUpStatus: string
    salespersonGroupId: number
    /** 挂断类型 */
    salespersonGroupName: string
    salespersonId: number
    /** 销售 */
    salespersonName: string
    /** 呼叫时间 */
    callTime: string
    callTimeBeginDate: string
    callTimeEndDate: string
    /** 通话时长（秒） */
    callDuration: number
    /** 响铃时长（秒） */
    ringDuration: number
    /** 呼出类型 */
    callType: number
    /** 接通状态 */
    callConnectStatus: number
    /** 归属地 */
    phoneAddress: string
    /** 坐席 */
    siteNumber: string
  }
  // 工作仪表盘
  export interface SalesRankItemProps {
    /** 呼出量 */
    callOutTotalNums: number
    /** 通话量 */
    callTotalNums: number
    /** 接通量 */
    callSuccessNums: number
    /** 接通时长 */
    totalCallDuration: number
    /** 接通率 */
    averageCallSuccessPercent: number
    /**销售排名 */
    callDetailInfos: CrmStat.CallDetailInfos[]
  }
  export interface CallDetailInfos {
    key: number
    /** 销售组名称 */
    salespersonName: string
    /** 呼入量 */
    callInTotalNums: number
    /** 呼出量 */
    callOutTotalNums: number
    /** 接通量 */
    callSuccessNums: number
    /** 接通时长 */
    totalCallDuration: number
    /** 小于等于30秒接通量 */
    callSuccessLte30SecondNums: number
    /** 小于等于60秒接通量 */
    callSuccessLte60SecondNums: number
    /** 大于60秒接通量 */
    callSuccessGt60SecondNums: number
  }
  export interface ReportByDays {
    /** 通话量 */
    callTotalNums: number
    /** 接通量 */
    callSuccessNums: number
    /** 日期 */
    totalDate: string
  }
  /** 客户仪表盘 */
  export interface CustomerTrailItemProps {
    /** 跟进客户的每日趋势图 */
    reportTrackCustomerByDate: CrmStat.ReportTrackCustomerByDate[]
    /** 跟进的客户分布图 */
    reportCustomerSource: CrmStat.ReportCustomerSource[]
    /** 销售排名 */
    salesDetails: CrmStat.SalesDetails[]
  }
  export interface ReportTrackCustomerByDate {
    /** 日期 */
    totalDate: string
    /** 统计数量 */
    customerNums: number
  }
  export interface ReportCustomerSource {
    /** 来源 */
    customerSourceName: string
    /** 统计数量 */
    customerSourceNums: number
  }
  export interface SalesDetails {
    key: number
    /** 销售名称 */
    salesperson: string
    /** 跟进数 */
    trackContactNums: number
    /** 30%客户 */
    percentThirtyCustomerNums: number
    /** 60%客户 */
    percentSixtyCustomerNums: number
    /** 80%客户 */
    percentEightyCustomerNums: number
    /** 100客户 */
    percentHundredCustomerNums: number
    /** 新增客资数 */
    newCustomerNums: number
    /** 签约客户数 */
    signCustomerNums: number
  }
}