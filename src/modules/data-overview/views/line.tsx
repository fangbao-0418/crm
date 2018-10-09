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
        type: 'line',
        lineStyle:{
          color:'#009aff',
          type:'solid'
        },
        itemStyle:{
          color:'#009aff'
        },
        areaStyle:{
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#b7e2ff' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(255, 255, 255, 0.5)' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          }
        }
      }]
    }
    if (option && typeof option === 'object') {
      myChart.setOption(option, true)
    }
  }
  public render () {
    return (
    <div>
      <p style={{float: 'left', margin:'14px 0 14px 14px'}}>2018年09月客户分布</p>
      <p style={{float: 'right', margin:'14px 14px 14px 0'}}>客户总数：12987 <span>已完成：120</span> <span>完成率：91%</span></p>
      <div ref='line' style={{height: '300px'}}></div>
    </div>
    )
  }
}

export default Main
