import React from 'react'
import { findDOMNode } from 'react-dom'

class Main extends React.Component {
  public componentDidMount () {
    const dom: any = this.refs.line
    const myChart = echarts.init(dom)
    const option = {
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    }
    if (option && typeof option === 'object') {
      myChart.setOption(option, true)
    }
  }
  public render () {
    return (
    <div>
      <p style={{float: 'left'}}>2018年09月客户分布</p>
      <p style={{float: 'right'}}>客户总数：12987  <span>已完成：120</span> <span>完成率：91%</span></p>
      <div ref='line' style={{height: '300px'}}></div>
    </div>
    )
  }
}

export default Main
