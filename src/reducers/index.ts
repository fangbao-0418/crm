import { combineReducers } from 'redux'
import common from './common'
import customer from '@/reducers/customer'
import business from '@/reducers/business'
import perform from './perform'
import organ from '@/reducers/organ'
const reducers = combineReducers<Reducer.State>({
  common,
  customer,
  business,
  perform,
  organ
})
export default reducers
