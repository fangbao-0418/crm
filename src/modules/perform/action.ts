import { fetchList } from './api'
export const fetchListAction = (payload: Perform.SearchPayload = {
  size: 15,
  current: 1,
  productName: ''
}) => {
  fetchList(payload).then((res) => {
   // console.log(res)
    APP.dispatch<Perform.Props>({
      type: 'change perform data',
      payload: {
        dataSource: res.records,
        pagintaion: {
          total: res.total
        }
      }
    })
  })
}
