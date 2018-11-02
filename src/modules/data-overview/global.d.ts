declare namespace Statistics {
  interface DetailSearchPayload {
    companyId?: any
    periodType?: 'DAY' | 'WEEK' | 'MONTH'
    dataType?: 'PERSON' | 'AREA' | 'TASKTYPE'
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
    type?: 'month' | 'year'
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

  export interface DetailProps {
    /** 预期绩效 */
    expectReward: number
    /** 实际绩效 */
    actualReward: number
    /** 绩效数据 */
    rewardDataList: Array<{
      /** 预期绩效 */
      expectReward: number,
      /** 实际绩效 */
      actualReward: number,
      name: string,
      id: any
    }>,
    /** 已接受任务 */
    acceptCount: number
    /** 已完成任务数 */
    completeCount: number
    taskDataList: Array<{
      /** 已接受任务 */
      acceptCount: number,
      /** 已完成任务数 */
      completeCount: number,
      name: string
    }>
  }
  export interface Props {
    overView?: OverViewProps
    detail?: DetailProps
  } 
}