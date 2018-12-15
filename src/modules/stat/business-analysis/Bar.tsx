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
    const char = this.props.char
    const option: echarts.EChartOption = {
      color: ['#3398DB'],
      title: {
        text: '商机客户电话状态分布',
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
      grid: {
        y: 10,
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        // data: char.map((item: any) => {
        //   return item.totalDate
        // }),
        data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLine:{
          lineStyle:{
            color:'#F2F2F2'
          }
        },
        axisLabel: {
          color: '#595959'
        },
        axisTick: {
          alignWithLabel: true
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
        axisLine:{
          show: false
        },
        axisTick: {
          show: false
        }
      },
      series: [{
        name: '客户数量',
        type: 'bar',
        barWidth: '50%',
        // data: char.map((item: any) => {
        //   return item.customerNums
        // }),
        data:[10, 52, 200, 334, 390, 330, 220]
      }]
    }
    if (option && typeof option === 'object') {
      this.chart.setOption(option, true)
    }
  }
  public render () {
    return (
      <div>
        <div ref='line' style={{height: 300,  width: 600, marginBottom:'10px'}}></div>
      </div>
    )
  }
}
export default Main