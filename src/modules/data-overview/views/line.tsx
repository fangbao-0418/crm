import React from 'react'
import { connect } from 'react-redux'
type OverViewProps = Statistics.ItemLineProps

class Main extends React.Component<Statistics.Props, any> {
  public chart: echarts.ECharts
  public componentDidMount () {
    const dom: any = this.refs.line
    this.chart = echarts.init(dom)
  }
  public componentDidUpdate () {
    this.renderChart(this.props.overView.data.lineList)
  }
  public renderChart (dataLineList: OverViewProps[]) {
    const option = {
      tooltip: {
        show:true,
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      xAxis: {
        type: 'category',
        data: dataLineList.map((item) => {
          return item.name
        })
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: dataLineList.map((item) => {
          return item.finishNum
        }),
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
      }, {
        data: dataLineList.map((item) => {
          return item.finishRate
        }),
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
      this.chart.setOption(option, true)
    }
  }
  public render () {
    const { allProps } = this.props
    return (
    <div>
      <p style={{float: 'left', margin:'10px 0 10px 14px'}}>2018年任务分布</p>
      <p style={{float: 'right', margin:'10px 14px 10px 0'}}>
        <span style={{display:'inline-block', marginRight:'10px'}}>任务总数：{allProps.customerTotal}</span>
        <span style={{display:'inline-block', marginRight:'10px'}}>已完成：{allProps.completeCustomerNum}</span>
        <span style={{display:'inline-block', marginRight:'10px'}}>完成率：{allProps.finishRate}%</span>
      </p>
      <div ref='line' style={{height: '350px', marginBottom:'10px'}}></div>
    </div>
    )
  }
}

export default connect((state: Reducer.State) => {
  return state.statistics
})(Main)
