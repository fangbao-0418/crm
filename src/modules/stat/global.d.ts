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
    /**销售排名求和 */
    totalCallDetailInfos: CrmStat.TotalCallDetailInfos[]
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
    /** 成功接通率 */
    callSuccessRate: number
  }
  export interface TotalCallDetailInfos {
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
   /** 商机仪表盘 */
   export interface BusinessAnalysisItemProps {
    /** 空置天数趋势图 */
    reportFreeDays: CrmStat.ReportFreeDays[]
    /** 电话状态分布图 */
    reportPhoneStatuses: CrmStat.ReportPhoneStatuses[]
    /** 销售明细表 */
    salesDetails: CrmStat.SalesDetails[]
    /** 对象求和 */
    totalSalesDetails: CrmStat.TotalSalesDetails[]
  }
  export interface ReportFreeDays {
    /** 级别名称 */
    levelName: number
    /** 级别数量 */
    levelNums: number
  }
  export interface ReportPhoneStatuses {
    /** 状态名称 */
    statusName: string
    /** 状态数值 */
    statusNums: number
  }
  export interface SalesDetails {
    key: number
    /** 销售名称 */
    salesperson: string
    /** 当前客户数 */
    customerNums: number
    /** 0%客户 */
    percentZeroCustomerNums: number
    /** 30%客户 */
    percentThirtyCustomerNums: number
    /** 60%客户 */
    percentSixtyCustomerNums: number
    /** 80%客户 */
    percentEightyCustomerNums: number
    /** 100客户 */
    percentHundredCustomerNums: number
    /** 本月签约客户数 */
    signCustomerNums: number
  }
  export interface TotalSalesDetails {
    key: number
    /** 销售名称 */
    salesperson: string
    /** 当前客户数 */
    customerNums: number
    /** 0%客户 */
    percentZeroCustomerNums: number
    /** 30%客户 */
    percentThirtyCustomerNums: number
    /** 60%客户 */
    percentSixtyCustomerNums: number
    /** 80%客户 */
    percentEightyCustomerNums: number
    /** 100客户 */
    percentHundredCustomerNums: number
    /** 本月签约客户数 */
    signCustomerNums: number
  }
  //客户仪表盘-新签客户
  export interface CustomerSignItemProps {
    /** 明细 */
    customerPoolReportDetails: CrmStat.CustomerPoolReportDetails
    /** 按城市统计 */
    totalByCity: CrmStat.TotalByCityDetails
  }
  export interface CustomerPoolReportDetails {
    /** 来源 */
    customerSource: string
    /** 总客资 */
    customerNums: number
    /** 新增数 */
    newCustomerNums: number
    /** 无意向数 */
    noIntentionNums: number
    /** 删除数 */
    deleteNums:number
    /** 意向数 */
    intentionNums: number
    /** 签约数 */
    signNums: number
    /** 转换率 */
    signRate: number
    /** 周期 */
    signCycle: number
  }
  export interface TotalByCityDetails {
    key: number
    /** 机构 */
    name: string
    /** 新增客户数 */
    value: number
    /** 省份 */
    provinceName: string
  }
}