import React from 'react'
import { Icon } from 'antd'
import { connect } from 'react-redux'
type RateProps = any
class Main extends React.Component<Statistics.Props, any> {
  public chart: echarts.ECharts
  public componentDidMount () {
    const dom: any = this.refs.rate
    this.chart = echarts.init(dom)
  }
  public componentDidUpdate () {
    this.renderChart()
  }
  public renderChart () {
    const data = this.props.detail.taskDataList
    const acceptData: number[] = []
    const completeData: number[] = []
    const personData: string[] = []
    data.map((item) => {
      acceptData.push(item.acceptCount)
      completeData.push(item.completeCount)
      personData.push(item.name)
    })
    console.log(data, 'rate')
    const option = {
      tooltip: {},
      legend: {
        x:'left',
        data: ['任务总数', '已完成']
      },
      xAxis: {
        type: 'category',
        data: personData
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
          data: acceptData,
          itemStyle:{
            color: '#b2e0ff'
          }
        },
        {
          name: '已完成',
          type: 'bar',
          stack:'two',
          barWidth: '20px',
          data: completeData,
          itemStyle:{
            color: '#d9f0ff'
          }
        }
      ]
    }
    this.chart.setOption(option)
  }

  public render () {
    const { detail } = this.props
    return (
    <div>
      <div>
        <span>已接任务数：{detail.acceptCount}</span>
        <span style={{marginLeft:'20px'}}>已完成任务数：{detail.completeCount}</span>
      </div>
      <div ref='rate' style={{width: '100%', height: '400px'}}></div>
    </div>
    )
  }
}

export default connect((state: Reducer.State) => {
  return state.statistics
})(Main)
