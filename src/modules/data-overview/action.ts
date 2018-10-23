import { fetchOverView, fetchOverViewTotal } from './api'
export const fetchOverViewAction = (payload: Statistics.OverViewSearchPayload = {}) => {
  fetchOverView(payload).then((res) => {
    // console.log(res)
    APP.dispatch<Statistics.Props>({
      type: 'change screen data',
      payload: {
        dataPieList: res.pieList,
        dataLineList:res.lineList,
        taskSumRewardList:res.taskSumRewardList,
        areaSumRewardList:res.areaSumRewardList,
        histogramRewardDataList:res.histogramRewardDataList,
        allProps:{
          customerTotal:res.customerTotal,
          completeCustomerNum: res.completeCustomerNum,
          finishRate: res.finishRate,
          incompleteCustomerNum: res.incompleteCustomerNum,
          cancelCustomerNum: res.cancelCustomerNum,
          rewardTotal:res.rewardTotal,
          rewardIncrease:res.rewardIncrease
        },
        companyProps:{
          customerTodayTotal: res.customerTodayTotal,
          customerTotalDayIncrease: res.customerTotalDayIncrease,
          customerTotalWeekIncrease: res.customerTotalWeekIncrease,
          todayRewardTotal: res.todayRewardTotal,
          rewardDayIncrease: res.rewardDayIncrease,
          rewardWeekIncrease: res.rewardWeekIncrease
        }
      }
    })
  })
}
export const fetchOverViewTotalAction = (id: number) => {
  fetchOverViewTotal(id).then((res) => {
    APP.dispatch<Statistics.Props>({
      type: 'change screen data',
      payload: {
        overView: {
          total: res
        }
      }
    })
  })
}
