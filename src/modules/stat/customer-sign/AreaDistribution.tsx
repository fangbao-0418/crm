import React from 'react'
// import { MapDataProps } from './index'
interface Props {
  style?: React.CSSProperties
  className?: string
  totalByProvince?: Array<{name: string, value: number}>
}
class Main extends React.Component<Props> {
  public chart: echarts.ECharts
  public componentDidMount () {
    const map: any = this.refs.map
    this.chart = echarts.init(map)
    window.addEventListener('resize', () => {
      if (this.chart && typeof this.chart === 'object') {
        this.chart.resize()
      }
    })
    this.chart.setOption(this.getOptions())
  }
  public componentDidUpdate () {
    this.chart.setOption(this.getOptions())
  }
  public getOptions (): echarts.EChartOption {
    const minNum = this.props.totalByProvince && this.props.totalByProvince[this.props.totalByProvince.length - 1] && this.props.totalByProvince[this.props.totalByProvince.length - 1].value
    const maxNum = this.props.totalByProvince && this.props.totalByProvince[0] && this.props.totalByProvince[0].value
    const data: {name: string, value: number}[] = this.props.totalByProvince && this.props.totalByProvince.map((item) => {
      return ({
        name: item.name.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, ''),
        value: item.value
      })
    })
    const option: echarts.EChartOption = {
      tooltip : {
        trigger: 'item'
      },
      visualMap: [
        {
          min: minNum,
          max: maxNum,
          type: 'piecewise',
          right: '5%',
          // text: ['最大值', '最小值'],
          text: [maxNum, minNum],
          inRange: {
            color: ['#B6D7FA', '#3F90F7']
          },
          top: 'bottom',
          calculable : true
        }
      ],
      geo: {
        map: 'china',
        type: 'scatter',
        symbolSize: 8,
        roam: false,
        zoom: 1.2,
        seriesIndex: [0],
        label: {show: false},
        itemStyle: {
          normal: {
            borderColor: '#fff'
          }
        },
        regions: [
          {
            name: '南海诸岛',
            label: {show: false},
            itemStyle: {
              normal: {opacity: 0}
            }
          }
        ]
      },
      series: [
        {
          name: '新增客户数',
          type: 'map',
          mapType: 'china',
          geoIndex: 0,
          data
        }
      ]
    }
    return option
  }
  public render () {
    return (
      <div ref='map' style={this.props.style} className={this.props.className}></div>
    )
  }
}
export default Main
