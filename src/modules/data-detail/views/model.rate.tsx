import React from 'react'
import { Icon } from 'antd'
import { connect } from 'react-redux'
type RateProps = Statistics.HistogramTaskDataListProps
class Main extends React.Component<Statistics.Props, any> {
  public chart: echarts.ECharts
  public componentDidMount () {
    const dom: any = this.refs.rate
    this.chart = echarts.init(dom)
  }
  public componentDidUpdate () {
    this.renderChart(this.props.histogramTaskDataList)
  }
  public renderChart (histogramTaskDataList: RateProps[]) {
    const option = {
      tooltip: {},
      legend: {
        x:'left',
        data: ['任务总数', '已完成']
      },
      xAxis: {
        type: 'category',
        data:['王小二', '阿萨德', '奥迪', '阿大', '大额']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '任务总数',
          type: 'bar',
          stack:'one',
          barGap: 0,
          barWidth: '20px',
          data: ['2', '4', 6, 6, 6],
          itemStyle:{
            color: '#b2e0ff'
          }
        },
        {
          name: '已完成',
          type: 'bar',
          stack:'two',
          barWidth: '20px',
          data: ['23', 44, 5, 6, 7],
          itemStyle:{
            color: '#d9f0ff'
          }
        }
      ]
    }
    this.chart.setOption(option)
  }

  public render () {
    const { detail: { personRate } } = this.props
    return (
    <div>
      <div>
        <span>已完成任务数：{personRate.finishedTotal}家</span>
        <span style={{marginLeft:'20px'}}>绩效涨幅：{personRate.rewardIncrease}% <Icon type='caret-up' theme='outlined' style={{color:'#e84845'}} /></span>
      </div>
      <div ref='rate' style={{width: '100%', height: '400px'}}></div>
    </div>
    )
  }
}

export default connect((state: Reducer.State) => {
  return state.statistics
})(Main)
