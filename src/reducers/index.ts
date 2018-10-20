import { combineReducers } from 'redux'
import common from './common'
import customer from '@/reducers/customer'
import business from '@/reducers/business'
import perform from './perform'
import statistics from './statistics'
import organ from '@/reducers/organ'
import userManage from './userManage'
const reducers = combineReducers<Reducer.State>({
  common,
  customer,
  business,
  perform,
<<<<<<< HEAD
  statistics,
  organ
=======
  organ,
  userManage
>>>>>>> origin/dev
})
export default reducers
