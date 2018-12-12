import { viewCustomer, fetchTrackRecords, fetchClueRecords, fetchCallRecords } from './api'
/** 改变详情信息，包含基本信息、跟进记录、线索记录、相关公司记录 */
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
  fetchCallRecords(id, payload).then((res) => {
    APP.dispatch<Customer.Props>({
      type: 'change customer data',
      payload: {
        callRecords: res.data
      }
    })
  })
}
