import { fetchPerformList } from './api'
export const fetchListAction = (payload: Statistics.SearchPayload = {
  customerId: 0,
  dateFlag: '',
  date: ''
}) => {
  fetchPerformList(payload).then((res) => {
    // console.log(res)
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
