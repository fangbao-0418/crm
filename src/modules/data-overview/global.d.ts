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
      /** 总客户数 */
      customerTotal: number
      /** 已完成客户数 */
      completeCustomerNum: number
      /** 完成率 */
      finishRate: number
      /** 未分配客户数 */
      incompleteCustomerNum: number
      /** 取消客户数 */
      cancelCustomerNum: number
      /** 总绩效 */
      rewardTotal: number,
      /** 饼图数据 */
      pieList: Array<{
        name: string,
        value: number
      }>
      /** 线图Y轴数据 */
      lineList: Array<{
        /** 完成数 */
        finishNum: number,
        /** 完成率 */
        finishRate: number,
        /** 名称 */
        name: string
      }>,
      /** 任务分类绩效 */
      taskSumRewardList: Array<{
        /** 绩效 */
        reward: number,
        taskName: string,
      }>,
      /** 地区分类绩效 */
      areaSumRewardList: Array<{
         /** 绩效 */
         reward: number,
         areaName: string,
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