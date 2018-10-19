import { viewCustomer, fetchTrackRecords, fetchClueRecords } from './api'
export const changeCustomerDetailAction = (id: string) => {
  viewCustomer(id).then((res: any) => {
    APP.dispatch<Customer.Props>({
      type: 'change customer data',
      payload: {
        detail: res,
        linkMan: res.contactPersons
      }
    })
  })
  const payload = {
    pageNum: 1,
    pageSize: 999
  }
  fetchTrackRecords(id, payload).then((res) => {
    APP.dispatch<Customer.Props>({
      type: 'change customer data',
      payload: {
        trackRecords: res.data
      }
    })
  })
  fetchClueRecords(id, payload).then((res) => {
    APP.dispatch<Customer.Props>({
      type: 'change customer data',
      payload: {
        clueRecords: res.data
      }
    })
  })
}
