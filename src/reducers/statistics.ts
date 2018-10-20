// 数据概览
import _ from 'lodash'
import { handleActions } from 'redux-actions'
const defaultVal: Statistics.Props = {
  dataPieList: [],
  dataLineList:[],
  taskSumRewardList:[],
  areaSumRewardList:[],
  histogramRewardDataList:[],
  histogramTaskDataList:[],
  allProps: {
    customerTotal:0,
    completeCustomerNum: 0,
    finishRate: 0,
    incompleteCustomerNum: 0,
    cancelCustomerNum:0,
    rewardTotal: 0.00,
    rewardIncrease:0.00,
    finishedTotal:0
  },
  companyProps:{
    customerTodayTotal: 0,
    customerTotalDayIncrease: 0,
    customerTotalWeekIncrease: 0,
    todayRewardTotal: 0,
    rewardDayIncrease: 0,
    rewardWeekIncrease: 0
  },
  overView: {
    type: 'MONTH'
  },
  yearView:{
    typeValue: '2015年'
  }
}
export default handleActions<Statistics.Props>({
  'change screen data': (state, { payload }) => {
    payload = Object.assign({}, state, _.cloneDeep(payload))
    payload = _.merge(_.cloneDeep(defaultVal), payload)
    return {
      ...state,
      ...payload
    }
  }
}, _.cloneDeep(defaultVal))
