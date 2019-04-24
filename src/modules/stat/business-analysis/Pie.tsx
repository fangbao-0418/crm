import React from 'react'
interface Props {
  dataSource: {name: string, value: number}[]
  title: string
  seriesName: string
}
class Main extends React.Component<Props> {
  public chart: echarts.ECharts
  public componentDidMount () {
    const dom: any = this.refs.pie
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
    const data = this.props.dataSource
    const figure: any[] = []
    data && data.length > 0 && data.map((item: any, index: any) => {
      if (index < 8) {
        figure.push(item.name)
      }
    })
    const option = {
      title: {
        left: 'center',
        text: this.props.title,
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal',
          color: '#333333'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} ({c}, {d}%)'
      },
      legend: {
        y2: 0,
        itemWidth: 15, // 设置宽度
        itemHeight: 10, // 设置高度
        data: figure
      },
      series: [
        {
          name: this.props.seriesName,
          type: 'pie',
          radius: ['35%', '50%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
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
          color: ['#39A0FF', '#4ECB73', '#FBD64A', '#37CBCB', '#F2637B', '#9760E4', '#ca8622', '#bda29a', '#6e7074', '#c4ccd3', '#61a0a8', '#c23531', '#2f4554', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#546570', '#c4ccd3'],
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
        <div ref='pie' style={{height: '300px'}}></div>
      </div>
    )
  }
}
export default Main
