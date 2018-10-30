import React from 'react'
import { connect } from 'react-redux'
type OverViewProps = Statistics.ItemPieProps
class Main extends React.Component<Statistics.Props, any> {
  public chart: echarts.ECharts
  public componentDidMount () {
    const dom: any = this.refs.container
    this.chart = echarts.init(dom)
    this.renderChart()
  }
  public componentDidUpdate () {
    this.renderChart()
    console.log('pie')
  }
  public renderChart () {
    const data = [
      { value: this.props.overView.data.completeCount, name: '已完成任务数' },
      { value: this.props.overView.data.undistributedCount, name: '待分配任务数' },
      { value: this.props.overView.data.runningCount, name: '进行中任务数' },
      { value: this.props.overView.data.cancelCount, name: '已取消任务数' }
    ]
    data.map((item) => {
      item.name = `${item.name}: ${item.value}`
    })
    console.log(data, 'pie')
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'left'
      },
      series: [
        {
          name: '任务数',
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
    <div>
      <div ref='container' style={{height: '300px'}}></div>
    </div>
    )
  }
}

export default connect((state: Reducer.State) => {
  return state.statistics
})(Main)
