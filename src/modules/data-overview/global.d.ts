declare namespace Statistics {
  interface DetailSearchPayload {
    customerId?: any
    dateFlag?: 'DAY' | 'WEEK' | 'MONTH'
    date?: string
  }
  interface OverViewSearchPayload {
    companyId?: any
    dateType?: 'month' | 'year'
    date?: string
  }
  export interface OverViewTotalProps {
    /** 总客户数 */
    customerTotal: number
    /** 当日客户数 */
    customerTodayTotal: number
    /** 客户数日同比 */
    customerTotalDayIncrease: number
    /** 客户数周同比 */
    customerTotalWeekIncrease: number
    /** 总绩效 */
    rewardTotal: number
    /** 今天绩效数 */
    todayRewardTotal: number
    /** 绩效日同比 */
    rewardDayIncrease: number
    /** 绩效周同比  */
    rewardWeekIncrease: number
  }
  export interface OverViewProps {
    total?: OverViewTotalProps
    type?: 'MONTH' | 'YEAR'
    date?: string
    data?: {
      /** 总绩效 */
      rewardTotal: number,
      /** 任务总数 */
      taskTotal: number
      /** 已完成任务数 */
      completeCount: number
      /** 待分配任务数 */
      undistributedCount: number
      /** 取消任务数 */
      cancelCount: number
      /** 进行中的任务数 */
      runningCount: number
      /** 任务分类绩效 */
      taskRewardList: Array<{
        name: string,
        reward: number
      }>
      /** 地区分类绩效 */
      areaRewardList: Array<{
        /** 名称 */
        name: string
        reward: number
      }>,
      /** 任务每月数据 */
      taskMonthDataList: Array<{
        month: string
        /** 任务总数 */
        total: number,
        /** 已完成任务数 */
        completeCount: number,
      }>
    }
  }
  /** 数据明细绩效属性 */
  export interface DetailPerfProps {
    /** 绩效总数 */
    rewardTotal: number
    /** 绩效涨幅 */
    rewardIncrease: number
    /** 柱状图数据 */
    histogramRewardDataList: Array<{
      reward: number,
      name: string
    }>
  }
  /** 数据明细任务完成率属性 */
  export interface DetailRateProps {
    /** 完成总数 */
    finishedTotal: number
    /** 绩效涨幅 */
    rewardIncrease: number
    histogramTaskDataList: Array<{
      /** 总客户数 */
      customerTotal: number
      /** 完成数 */
      finishedCount: number
      /** 完成率 */
      finishRate: number
      /** 名称 */
      name: string
    }>
  }
  export interface DetailProps {
    /** 人员绩效 */
    personPerf: DetailPerfProps
    /** 人员完成率 */
    personRate: DetailRateProps
    /** 任务绩效 */
    taskPerf: DetailPerfProps
    /** 任务完成率 */
    taskRate: DetailRateProps
  }
  export interface Props {
    overView?: OverViewProps
    detail?: DetailProps
  } 
}