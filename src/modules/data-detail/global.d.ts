declare namespace Statistics {
  export interface SearchPayload {
    customerId: number   // 公司ID
    dateFlag?: string    //日期类型：MONTH月份l;YEAR年份
    date?: string       // 查询日期
  }
  interface ItemPieProps {
    name: string    //名称
    value: number   //数据占比
    disabled?: boolean
  }
  interface ItemLineProps {
    name:string    //名称
    finishNum:number   // 完成数据
    finishRate:number   // 完成率
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
    customerTotal?: number   //总任务数
    finishedCount?:number   //完成数
    finishRate?:number   //完成率
    name?:string   //名称
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
  interface OverViewProps {
    type: 'YEAR' | 'MONTH'
  }
  interface OverYearProps {
    typeValue: '2015年' |'2016年' | '2017年' | '2018年'
  }
  export interface Props {
    histogramRewardDataList?: HistogramRewardListProps[]
    histogramTaskDataList?:HistogramTaskDataListProps[]
    allProps?: NumberProps
    companyProps?: CompanyProps
    overView?: OverViewProps
    yearView?:OverYearProps
  } 
}