import { combineReducers } from 'redux'
import common from './common'
import customer from '@/reducers/customer'
import business from '@/reducers/business'
const reducers = combineReducers<Reducer.State>({
  common,
  customer,
  business
})
export default reducers
