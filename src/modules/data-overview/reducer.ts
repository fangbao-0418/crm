// 数据概览
import _ from 'lodash'
import { handleActions } from 'redux-actions'
export const defaultVal: Statistics.Props = {
  overView: {
    type: 'month',
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
    /** 预期绩效 */
    expectReward: 0,
    /** 实际绩效 */
    actualReward: 0,
    /** 绩效数据 */
    ewardDataList: [],
    /** 已接受任务 */
    acceptCount: 0,
    /** 已完成任务数 */
    completeCount: 0,
    taskDataList: []
  }
}
export default handleActions<Statistics.Props>({
  'change screen data': (state, { payload }) => {
    // payload = _.merge({}, _.cloneDeep(defaultVal),  _.assign({}, state, payload))
    payload = _.merge({}, _.cloneDeep(defaultVal), state, payload)
    console.log(payload)
    console.log({
      ...state,
      ...payload
    })
    return {
      ...state,
      ...payload
    }

    // if(!payload.overView.data) {
    //   return defaultVal
    // }else {
    //   payload = _.merge({}, _.cloneDeep(defaultVal), state, payload)
    //   return {
    //     ...state,
    //     ...payload
    //   }
    // }
  }
}, _.cloneDeep(defaultVal))
