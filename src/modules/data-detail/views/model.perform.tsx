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
  }
  public componentDidUpdate () {
    // this.renderChart(this.props.histogramRewardDataList)
    // console.log(this.props.histogramRewardDataList)
  }
  public renderChart (histogramRewardDataList: PerformProps[]) {
    const option = {
      tooltip: {},
      legend: {
        x:'left',
        data: ['金额/千元']
      },
      xAxis: {
        data: ['王小伟', '王小伟', '王小伟', '王小伟', '王小伟', '王小伟', '王小伟', '王小伟', '王小伟', '王小伟', '王小伟', '王小伟']
      },
      yAxis: {},
      series: [
        {
          name: '金额/千元',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20, 40, 32, 54, 21, 23, 34],
          itemStyle:{
            color:'#b2e0ff'
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
        <span>绩效总额：￥600.00</span>
        <span style={{marginLeft:'20px'}}>绩效涨幅：12%  <Icon type='caret-up' theme='outlined' style={{color:'#e84845'}} /></span>
      </div>
      <div ref='perPerform' style={{width: '100%', height: '400px'}}></div>
    </div>
    )
  }
}

export default connect((state: Reducer.State) => {
  return state.statistics
})(Main)
