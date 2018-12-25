import React from 'react'
class Main extends React.Component<any> {
  public chart: echarts.ECharts
  public componentDidMount () {
    const dom: any = this.refs.plat
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
    const plat = this.props.plat
    const data = plat.length > 0 && plat.map((item: any) => {
      return {
        name: item.name,
        value: item.value
      }
    })
    const option: echarts.EChartOption = {
      title: {
        text: '客户地图',
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal',
          color: '#333333'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data:['']
      },
      visualMap: [
        {
          min: 0,
          max: 2500,
          left: '20',
          top: 'bottom',
          text: ['高', '低'],
          inRange: {
            color: ['#e0ffee', '#39A0FF']
          },
          calculable: true
        }
      ],
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark : {show: true},
          dataView : {show: true, readOnly: false},
          restore : {show: true},
          saveAsImage : {show: true}
        }
      },
      series: [
        {
          name: '新增客户',
          type: 'map',
          mapType: 'china',
          roam: false,
          label: {
            normal: {
              show: false
            },
            emphasis: {
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
      <div>
        <div ref='plat' style={{height: 400, marginTop: 15}}></div>
      </div>
    )
  }
}
export default Main
