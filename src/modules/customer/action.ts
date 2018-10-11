import { viewCustomer } from './api'
export const changeCustomerDetailAction = (id: string) => {
  viewCustomer(id).then((res: any) => {
    APP.dispatch({
      type: 'change customer data',
      payload: {
        detail: res,
        linkMan: res.contactPersons
      }
    })
  })
}
