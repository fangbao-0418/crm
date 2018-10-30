// 数据概览
import _ from 'lodash'
import { handleActions } from 'redux-actions'
const defaultVal: Statistics.Props = {
  overView: {
    type: 'MONTH',
    total: {
      customerTotal: 0,
      customerTodayTotal: 0,
      customerTotalDayIncrease: 0,
      customerTotalWeekIncrease: 0,
      rewardTotal: 0,
      todayRewardTotal: 0,
      rewardDayIncrease: 0,
      rewardWeekIncrease: 0
    },
    data: {
      taskTotal: 0,
      completeCount: 0,
      undistributedCount: 0,
      cancelCount: 0,
      /** 总绩效 */
      rewardTotal: 0,
      runningCount: 0,
      taskRewardList: [],
      areaRewardList: [],
      taskMonthDataList: [
        {month: '1月', total: 0, completeCount: 0},
        {month: '2月', total: 0, completeCount: 0},
        {month: '3月', total: 0, completeCount: 0},
        {month: '4月', total: 0, completeCount: 0},
        {month: '5月', total: 0, completeCount: 0},
        {month: '6月', total: 0, completeCount: 0},
        {month: '7月', total: 0, completeCount: 0},
        {month: '8月', total: 0, completeCount: 0},
        {month: '9月', total: 0, completeCount: 0},
        {month: '10月', total: 0, completeCount: 0},
        {month: '11月', total: 0, completeCount: 0},
        {month: '12月', total: 0, completeCount: 0}
      ]
    }
  },
  detail: {
    personPerf: {
      rewardTotal: 0,
      rewardIncrease: 0,
      histogramRewardDataList: []
    },
    personRate: {
      finishedTotal: 0,
      rewardIncrease: 0,
      histogramTaskDataList: []
    },
    taskPerf: {
      rewardTotal: 0,
      rewardIncrease: 0,
      histogramRewardDataList: []
    },
    taskRate: {
      finishedTotal: 0,
      rewardIncrease: 0,
      histogramTaskDataList: []
    }
  }
}
export default handleActions<Statistics.Props>({
  'change screen data': (state, { payload }) => {
    payload = _.merge({}, _.cloneDeep(defaultVal), state, payload)
    console.log(payload, 'payload')
    return {
      ...state,
      ...payload
    }
  }
}, _.cloneDeep(defaultVal))
