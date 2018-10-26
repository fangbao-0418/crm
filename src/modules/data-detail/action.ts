import { fetchPersonPerformance, fetchPersonFinishRate } from './api'
export const fetchPersonDataAction = (payload: Statistics.DetailSearchPayload) => {
  fetchPersonPerformance(payload).then((res) => {
    APP.dispatch<Statistics.Props>({
      type: 'change screen data',
      payload: {
        histogramRewardDataList:res.histogramRewardDataList,
        histogramTaskDataList:res.histogramTaskDataList,
        allProps:{
          customerTotal:res.customerTotal,
          completeCustomerNum: res.completeCustomerNum,
          finishRate: res.finishRate,
          incompleteCustomerNum: res.incompleteCustomerNum,
          cancelCustomerNum: res.cancelCustomerNum,
          rewardTotal:res.rewardTotal,
          rewardIncrease:res.rewardIncrease,
          finishedTotal:res.finishedTotal
        }
      }
    })
  })
}
