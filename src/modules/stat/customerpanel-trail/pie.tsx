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
    const data = [
      {value: 1, name: '官网'},
      {value: 2, name: 'app'},
      {value: 3, name: '公司分配'},
      {value: 4, name: '开发'},
      {value: 5, name: '其他'},
      {value: 6, name: '其他颜色'}
    ]
    data.map((item) => {
      item.name = `${item.name}: ${item.value}`
    })
    const option = {
      title: {
        text: '客户来源分布'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} ({d}%)'
      },
      legend: {
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
      <div style={{float: 'left'}}>
        <div ref='line' style={{height: '350px', width: 450, marginBottom:'10px'}}></div>
      </div>
    )
  }
}
export default Main
