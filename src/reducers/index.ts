import { combineReducers } from 'redux'
import common from './common'
import customer from '@/reducers/customer'
import business from '@/reducers/business'
import perform from './perform'
const reducers = combineReducers<Reducer.State>({
  common,
  customer,
  business,
  perform
})
export default reducers
