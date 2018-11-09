declare namespace Reducer {
  /** redux全局state */
  export interface State {
    common: Common.Props
    customer: Customer.Props
    business: Business.Props
  }
}