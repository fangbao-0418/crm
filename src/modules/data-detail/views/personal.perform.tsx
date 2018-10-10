import React from 'react'
import { findDOMNode } from 'react-dom'
import { Icon } from 'antd'
class Main extends React.Component {
  public componentDidMount () {
    const el: any = this.refs.perPerform
    const myChart = echarts.init(el)
  // 指定图表的配置项和数据
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
    myChart.setOption(option)
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

export default Main
