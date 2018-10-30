import { combineReducers } from 'redux'
import common from './common'
import customer from '@/reducers/customer'
import business from '@/reducers/business'
import statistics from '@/modules/data-overview/reducer'
import organ from '@/reducers/organ'
import userManage from './userManage'
import outside from './outside'
const reducers = combineReducers<Reducer.State>({
  common,
  customer,
  business,
  statistics,
  organ,
  userManage,
  outside
})
export default reducers
