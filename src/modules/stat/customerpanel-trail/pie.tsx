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
    const pi = this.props.pi
    const data = pi && pi.length > 0 && pi.map((item: any) => {
      return {
        value: item.customerSourceNums,
        name: item.customerSourceName
      }
    })
    const option = {
      title: {
        left: '80',
        text: '客户来源分布',
        textStyle: {
          fontSize: 16
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        x: 'right'
      },
      series: [
        {
          name: '客户来源 ',
          type: 'pie',
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
              show: true
            }
          },
          itemStyle: {
            borderWidth: 3,
            borderColor: '#fff'
          },
          data
        }
      ]
    }
    if (option && typeof option === 'object') {
      this.chart.setOption(option, true)
    }
  }
  public render () {
    return (
      <div>
        <div ref='line' style={{height: '250px', width: 400, marginBottom:'10px'}}></div>
      </div>
    )
  }
}
export default Main
