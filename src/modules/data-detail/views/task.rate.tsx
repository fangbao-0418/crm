import React from 'react'
import { Icon } from 'antd'
import { findDOMNode } from 'react-dom'
class Main extends React.Component {
  public componentDidMount () {
    const el: any = this.refs.perPerform
    const myChart = echarts.init(el)
  // 指定图表的配置项和数据
    const option = {
      tooltip: {},
      legend: {
        x:'left',
        data: ['任务总数', '已完成']
      },
      xAxis: {
        data: ['王小伟', '王小伟', '王小伟', '王小伟', '王小伟', '王小伟', '王小伟', '王小伟', '王小伟', '王小伟', '王小伟', '王小伟']
      },
      yAxis: {},
      series: [
        {
          name: '任务总数',
          type: 'bar',
          stack:'two',
          data: [5, 20, 36, 10, 10, 20, 40, 32, 54, 21, 23, 34],
          itemStyle:{
            color:'#b2e0ff'
          }
        },
        {
          name: '已完成',
          type: 'bar',
          stack:'two',
          data: [1, 10, 16, 6, 9, 11, 40, 32, 45, 20, 23, 10],
          itemStyle:{
            color:'#d9f0ff'
          }
        }
      ]
    }
    myChart.setOption(option)
  }

  public render () {
    return (
    <div>
      <div>
        <span>已完成任务数：200</span>
        <span style={{marginLeft:'20px'}}>绩效涨幅：12% <Icon type='caret-up' theme='outlined' style={{color:'#e84845'}} /></span>
      </div>
      <div ref='perPerform' style={{width: '100%', height: '400px'}}></div>
    </div>
    )
  }
}

export default Main
