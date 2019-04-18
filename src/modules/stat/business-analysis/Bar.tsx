import React from 'react'
interface Props {
  dataSource: any[]
}
class Main extends React.Component<Props> {
  public chart: echarts.ECharts
  public componentDidMount () {
    const dom: any = this.refs.bar
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
  public computedData (data: number[] = []): {[k: number]: number[]} {
    const res: {[k: number]: number[]} = {0: [], 1: []}
    if (data.length === 0) {
      return res
    }
    const sum = data.reduce((a, b) => a + b)
    const arr = [0]
    /** 原始数据 */
    res[0] = [sum].concat(data)
    res[0].reduce((a, b, index) => {
      console.log(index, 'index')
      arr.push(a - b)
      return a - b
    })
    /** 辅助数据 */
    res[1] = arr
    console.log(res, 'res')
    return res
  }
  public renderChart () {
    const char = this.props.dataSource
    let max = 0
    char.map((item: any) => {
      if (max < item.statusNums) {
        max = item.statusNums
      }
    })
    const data = char.map((item: any) => {
      return item.statusNums
    })
    max = Math.pow(10, (String(max).length))
    const computedData = this.computedData(data)
    const option: echarts.EChartOption = {
      color: ['#39A0FF'],
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
        left: '1%',
        right: '1%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: char.length ? ['总数'].concat(char.map((item: any) => {
          return item.statusName
        })) : [],
        axisLine:{
          lineStyle:{
            color:'#F2F2F2'
          }
        },
        axisLabel: {
          interval: 0,
          color: '#595959'
        },
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {
        logBase: 10,
        max,
        min: 1,
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
        },
        axisLabel: {
          textStyle: {
            color: '#2f4554'
          }
        }
      },
      series: [{
        tooltip: {
          show: false
        },
        name: '辅助',
        type: 'bar',
        barWidth: '20',
        stack: '总量',
        itemStyle: {
          normal: {
            barBorderColor: '#FFFFFF',
            color: '#FFFFFF'
          },
          emphasis: {
            barBorderColor: '#FFFFFF',
            color: '#FFFFFF'
          }
        },
        data: computedData[1]
      }, {
        name: '客户数量',
        stack: '总量',
        type: 'bar',
        barWidth: '20',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: computedData[0]
      }]
    }
    if (option && typeof option === 'object') {
      this.chart.setOption(option, true)
    }
  }
  public render () {
    return (
      <div>
        <div ref='bar' style={{height: 300,  width: '100%', marginBottom:'10px'}}></div>
      </div>
    )
  }
}
export default Main
