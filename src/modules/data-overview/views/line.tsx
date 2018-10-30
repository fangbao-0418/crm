import React from 'react'
import { connect } from 'react-redux'
const styles = require('../style')
class Main extends React.Component<Statistics.Props, any> {
  public chart: echarts.ECharts
  public componentDidMount () {
    const dom: any = this.refs.line
    this.chart = echarts.init(dom)
    this.renderChart(this.props.overView.data.taskMonthDataList)
  }
  public componentDidUpdate () {
    this.renderChart(this.props.overView.data.taskMonthDataList)
  }
  public renderChart (data: Array<{
    month: string
    /** 任务总数 */
    total: number,
    /** 已完成任务数 */
    completeCount: number
  }>) {
    const option: echarts.EChartOption = {
      tooltip: {
        show:true,
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        },
        formatter: (params: any) => {
          const index = params[0].dataIndex
          const rate = Math.round((data[index].completeCount / (data[index].total || 1)) * 100)
          return `已完成: ${params[0].value}<br>完成率: ${rate}%`
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.map((item) => {
          return item.month
        })
      },
      yAxis: {
        type: 'value'
        // min: 300
        // max: 1000
      },
      series: [{
        data: data.map((item) => {
          return item.completeCount
        }),
        type: 'line',
        lineStyle:{
          color:'#009aff',
          type:'solid'
        },
        itemStyle:{
          color: '#009aff'
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
    const { overView: { data } } = this.props
    return (
    <div className={styles.card}>
      <div className={styles['card-header']}>
        <p className='fl'>2018年任务分布</p>
        <p className='fr'>
          <span style={{display:'inline-block', marginRight:'10px'}}>任务总数：{data.taskTotal}</span>
          <span style={{display:'inline-block', marginRight:'10px'}}>已完成：{data.taskTotal}</span>
          <span style={{display:'inline-block', marginRight:'10px'}}>完成率：{data.taskTotal}%</span>
        </p>
      </div>
      <div ref='line' style={{height: '350px', marginBottom:'10px'}}></div>
    </div>
    )
  }
}

export default connect((state: Reducer.State) => {
  return state.statistics
})(Main)
