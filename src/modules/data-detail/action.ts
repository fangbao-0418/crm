import { fetchData } from './api'
import { defaultVal } from '@/modules/data-overview/reducer'
export const fetchDataAction = (payload: Statistics.DetailSearchPayload) => {
  fetchData(payload).then((res) => {
    APP.dispatch<Statistics.Props>({
      type: 'change screen data',
      payload: {
        detail: res || defaultVal.detail
      }
    })
  })
}
