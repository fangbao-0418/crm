import React from 'react'
import { findDOMNode } from 'react-dom'
class Main extends React.Component {
  public componentDidMount () {
    const el: any = this.refs.perPerform
    const myChart = echarts.init(el)
  // 指定图表的配置项和数据
    const option = {
      title: {
        text: '绩效'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
    myChart.setOption(option)
  }

  public render () {
    return (
    <div>
      <div>
        <span>绩效总额：￥1256.00</span>
        <span>绩效涨幅：12% 44</span>
      </div>
      <div ref='perPerform' style={{width: '100%', height: '400px'}}></div>
    </div>
    )
  }
}

export default Main
