import React from 'react'
import { findDOMNode } from 'react-dom'

class Main extends React.Component {
  public componentDidMount () {
    const dom: any = this.refs.container
    const myChart = echarts.init(dom)
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data:['已完成任务数', '待分配任务数', '已取消任务数']
      },
      series: [
        {
          name:'任务数',
          type:'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '14',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:[
                  {value:335, name:'已完成任务数', itemStyle: {color: '#fa250c'}},
                  {value:310, name:'待分配任务数', itemStyle: {color: '#1790ff'}},
                  {value:234, name:'已取消任务数', itemStyle: {color: '#ff7d00'}}
          ]
        }
      ]
    }
    if (option && typeof option === 'object') {
      myChart.setOption(option, true)
    }
  }
  public render () {
    return (
    <div>
      <div ref='container' style={{height: '300px'}}></div>
    </div>
    )
  }
}

export default Main
