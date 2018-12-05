import React from 'react'

class Main extends React.Component<any> {
  public chart: echarts.ECharts
  public componentDidMount () {
    const dom: any = this.refs.line
    this.chart = echarts.init(dom)
    this.renderChart()
  }
  public componentDidUpdate () {
    this.renderChart()
  }
  public renderChart () {
    // const month = new Date().getMonth()
    const option: echarts.EChartOption = {
      title: {
        text: '每日趋势图'
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
        // 划入提示的文字自定义
        // formatter: (params: any) => {
        //   const index = params[0].dataIndex
        //   const rate = Math.round((data[index].completeCount / (data[index].total || 1)) * 100)
        //   return `已完成: ${params[0].value}<br>完成率: ${rate}%`
        // }
      },
      legend: {
        data:['通话量', '接通量']
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: '通话量',
        type: 'line',
        stack: '总量',
        data: [1, 40, 20, 40, 10, 70],
        itemStyle: {
          color: '#FAD440'
        },
        areaStyle:{
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#DCDCDC ' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(251,211,55,0.3)' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          }
        }
      }, {
        name: '接通量',
        type: 'line',
        stack: '总量',
        data: [5, 20, 36, 10, 10, 20],
        itemStyle: {
          color: '#4ECB73'
        },
        areaStyle:{
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#DCDCDC ' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(251,211,55,0.3  )' // 100% 处的颜色
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
    return (
      <div style={{float: 'left'}}>
        <div ref='line' style={{height: '350px',  width: 750, marginBottom:'10px'}}></div>
      </div>
    )
  }
}
export default Main
