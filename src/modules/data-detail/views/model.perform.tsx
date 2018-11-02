import React from 'react'
import { findDOMNode } from 'react-dom'
import { Icon } from 'antd'
import { connect } from 'react-redux'
type PerformProps = any
type P = any
class Main extends React.Component<Statistics.Props, any> {
  public chart: echarts.ECharts
  public componentDidMount () {
    const dom: any = this.refs.perPerform
    this.chart = echarts.init(dom)
    this.renderChart()
  }
  public componentDidUpdate () {
    this.renderChart()
  }
  public renderChart () {
    const data = this.props.detail.ewardDataList
    const actualData: number[] = []
    const expectData: number[] = []
    const personData: string[] = []
    data.map((item) => {
      personData.push(item.name)
      actualData.push(item.actualReward)
      expectData.push(item.expectReward)
    })
    console.log(data, 'data')
    const option = {
      tooltip: {},
      legend: {
        x: 'left',
        data: ['预期绩效', '实际绩效']
      },
      xAxis: {
        data: personData
      },
      yAxis: {},
      series: [
        {
          name: '预期绩效',
          type: 'bar',
          stack:'one',
          barGap: 0,
          barWidth: '20px',
          data: expectData,
          itemStyle:{
            color: '#b2e0ff'
          }
        },
        {
          name: '实际绩效',
          type: 'bar',
          stack:'two',
          barWidth: '20px',
          data: actualData,
          itemStyle:{
            color: '#d9f0ff'
          }
        }
      ]
    }
    this.chart.setOption(option)
  }

  public render () {
    return (
    <div>
      <div>
        <span>预期绩效：{this.props.detail.expectReward}</span>
        <span style={{marginLeft:'20px'}}>实际绩效：{this.props.detail.actualReward}</span>
      </div>
      <div ref='perPerform' style={{width: '100%', height: '400px'}}></div>
    </div>
    )
  }
}

export default connect((state: Reducer.State) => {
  return state.statistics
})(Main)
