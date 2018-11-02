import { fetchOverView } from './api'
import { defaultVal } from './reducer'
console.log(defaultVal)
export const fetchOverViewAction = (payload: Statistics.OverViewSearchPayload = {}) => {
  fetchOverView(payload).then((res) => {
    console.log(!!res)
    APP.dispatch<Statistics.Props>({
      type: 'change screen data',
      payload: {
        overView: {
          data: !!res ? res : defaultVal.overView.data
        }
      }

    })
  })
}
// export const fetchOverViewTotalAction = (id: number) => {
//   fetchOverViewTotal(id).then((res) => {
//     APP.dispatch<Statistics.Props>({
//       type: 'change screen data',
//       payload: {
//         overView: {
//           total: res
//         }
//       }
//     })
//   })
// }
