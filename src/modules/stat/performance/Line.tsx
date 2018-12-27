import React from 'react'

class Main extends React.Component {
  public chart: echarts.ECharts
  public componentDidMount () {
    const dom: any = this.refs.line
    this.chart = echarts.init(dom)
    window.addEventListener('resize', () => {
      if (this.chart && typeof this.chart === 'object') {
        this.chart.resize()
      }
    })
    this.renderChart()
  }
  public componentDidUpdate () {
    this.renderChart()
  }
  public renderChart () {
    const option: echarts.EChartOption = {
      title: {
        text: '新签客户趋势图',
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal',
          color: '#333333'
        }
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
      },
      legend: {
        data: ['新签客户', '记账客户']
      },
      grid: {
        left: '5%',
        right: '5%'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLine: {
          lineStyle: {
            color: '#F2F2F2'
          }
        },
        axisLabel: {
          color: '#595959'
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            color: '#F2F2F2',
            width: 1,
            type: 'solid'
          }
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      series: [{
        name: '新签客户',
        type: 'line',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
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
              offset: 0, color: 'rgba(251,211,55,0.4)' // 0% 处的颜色
            }, {
              offset: 0.4, color: 'rgba(251,211,55,0.3)'
            }, {
              offset: 0.6, color: 'rgba(251,211,55,0.2)'
            }, {
              offset: 1, color: 'rgba(251,211,55,0)' // 100% 处的颜色
            }]
          }
        }
      }, {
        name: '记账客户',
        type: 'line',
        data: [850, 960, 930, 980, 1400, 1600, 1550],
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
              offset: 0, color: 'rgba(78,203,115,0.4)' // 0% 处的颜色
            }, {
              offset: 0.4, color: 'rgba(78,203,115,0.3)'
            }, {
              offset: 0.6, color: 'rgba(78,203,115,0.2)'
            }, {
              offset: 1, color: 'rgba(78,203,115,0)' // 100% 处的颜色
            }]
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
      <div>
        <div ref='line' style={{height: 300}}></div>
      </div>
    )
  }
}
export default Main
