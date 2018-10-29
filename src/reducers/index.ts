import { combineReducers } from 'redux'
import common from './common'
import customer from '@/reducers/customer'
import business from '@/reducers/business'
import statistics from '@/modules/data-overview/statistics'
import organ from '@/reducers/organ'
import userManage from './userManage'
const reducers = combineReducers<Reducer.State>({
  common,
  customer,
  business,
  statistics,
  organ,
  userManage
})
export default reducers
