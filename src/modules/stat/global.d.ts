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
    /** 销售组名称 */
    salespersonName: string
    /** 呼入量 */
    callInTotalNums: string
    /** 呼出量 */
    callOutTotalNums: string
    /** 通话量 */
    callTotalNums: string
    /** 接通量 */
    callSuccessNums: string
    /** 接通时长 */
    totalCallDuration: string
    /** 接通率 */
    averageCallSuccessPercent: string
    /** 小于等于30秒接通量 */
    callSuccessLte30SecondNums: string
    /** 小于等于60秒接通量 */
    callSuccessLte60SecondNums: string
    /** 大于60秒接通量 */
    callSuccessGt60SecondNums: string
    /**销售排名 */
    callDetailInfos: string
    /**客户趋势图 */
    ReportByDays: string
  }
}