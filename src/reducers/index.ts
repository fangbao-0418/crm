import { combineReducers } from 'redux'
import common, { CommonProps } from './common'
import customer, { CustomerProps } from '@/reducers/customer'
export interface ReducerState {
  common: CommonProps
  customer: CustomerProps
}
const reducers = combineReducers<ReducerState>({
  common,
  customer
})
export default reducers
