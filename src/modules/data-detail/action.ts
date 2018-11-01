import { fetchPersonPerformance, fetchPersonFinishRate } from './api'
export const fetchCompleteRateDataAction = (payload: Statistics.DetailSearchPayload) => {
  fetchPersonPerformance(payload).then((res) => {
    // APP.dispatch<Statistics.Props>({
    //   type: 'change screen data',
    //   payload: {
    //     detail: {
    //     }
    //   }
    // })
  })
}
export const fetchRewardDataAction = (payload: Statistics.DetailSearchPayload) => {
  // fetchPersonPerformance(payload).then((res) => {
  //   // APP.dispatch<Statistics.Props>({
  //   //   type: 'change screen data',
  //   //   payload: {
  //   //     detail: {
  //   //     }
  //   //   }
  //   // })
  // })
}
