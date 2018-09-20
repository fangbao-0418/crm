import { combineReducers } from 'redux'
import common from './common'
import customer from '@/reducers/customer'

const reducers = combineReducers<Reducer.State>({
  common,
  customer
})
export default reducers
