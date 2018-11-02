import { fetchPersonPerformance, fetchPersonFinishRate } from './api'
import { defaultVal } from '@/modules/data-overview/reducer'
export const fetchCompleteRateDataAction = (payload: Statistics.DetailSearchPayload) => {
  fetchPersonPerformance(payload).then((res) => {
    APP.dispatch<Statistics.Props>({
      type: 'change screen data',
      payload: {
        detail: res || defaultVal.detail
      }
    })
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
