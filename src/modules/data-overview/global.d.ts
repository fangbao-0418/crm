declare namespace Statistics {
  interface OverViewSearchPayload {
    customerId?: string
    dateFlag?: 'YEAR' | 'MONTH'
    date?: string
  }
  /** 饼图类型 */
  interface ItemPieProps {
    /** 名称 */
    name: string    //名称
    value: number   //数据占比
    // disabled?: boolean
  }
  interface ItemLineProps {
    name:string    //名称
    finishNum:number   //完成数据
    finishRate:number   //完成率
  }
  interface TaskListProps {
    taskName: number   //任务名称
    reward?: string    //绩效
  }
  interface AreaListProps {
    areaName: string         //区域名称
    reward?: string     //绩效
  }
  interface HistogramRewardListProps {
    name: string         //名称
    reward?: string     //绩效
  }
  interface HistogramTaskDataListProps {
    customerTotal?: number
    finishedCount?:number
    finishRate?:number
    name?:string
  }
  interface NumberProps {
    customerTotal: number  //总任务数
    completeCustomerNum: number   //已完成任务数
    finishRate: number    //完成率
    incompleteCustomerNum: number   //未分配任务数
    cancelCustomerNum:number     //取消任务数
    rewardTotal:any     //总绩效
    rewardIncrease:any   //绩效涨幅
    finishedTotal?:any    //完成总数
  }
  interface CompanyProps  {
    customerTodayTotal: number   //当日任务数
    customerTotalDayIncrease: number  //任务数日同比
    customerTotalWeekIncrease: number       //任务数周同比
    todayRewardTotal?: number    //今天绩效数
    rewardDayIncrease: number //绩效日同比
    rewardWeekIncrease: number    //绩效周同比
  }
  export interface Props {
    dataPieList?: ItemPieProps[]
    dataLineList?: ItemLineProps[]
    taskSumRewardList?: TaskListProps[]
    areaSumRewardList?: AreaListProps[]
    histogramRewardDataList?: HistogramRewardListProps[]
    histogramTaskDataList?:HistogramTaskDataListProps[]
    allProps?: NumberProps
    companyProps?: CompanyProps
  } 
}