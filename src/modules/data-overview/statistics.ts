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
      taskMonthDataList: []
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
