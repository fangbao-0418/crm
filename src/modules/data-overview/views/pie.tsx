import React from 'react'
import { connect } from 'react-redux'
type OverViewProps = Statistics.ItemPieProps
class Main extends React.Component<Statistics.Props, any> {
  public chart: echarts.ECharts
  public values: {
    companyId: number,
    dateFlag: string,
    date: string
  } = {
    companyId:2001,
    dateFlag: 'YEAR',
    date:'2018-10-10'
  }
  public componentDidMount () {
    const dom: any = this.refs.container
    this.chart = echarts.init(dom)
  }
  public componentDidUpdate () {
    this.renderChart(this.props.dataPieList)
  }
  public renderChart (dataPieList: OverViewProps[]) {
    if (dataPieList.length !== 3) {
      return
    }
    const option = {
      tooltip: {
        axisPointer: 'line',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: [`${dataPieList[0].name}:${dataPieList[0].value}`, `${dataPieList[1].name}:${dataPieList[1].value}`, `${dataPieList[2].name}:${dataPieList[2].value}`]
      },
      series: [
        {
          name:'任务数',
          type:'pie',
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
          itemStyle:{
            color: '#fa250c'
          },
          data:
          [
            {
              value: dataPieList[0].value,
              name:`${dataPieList[0].name}:${dataPieList[0].value}`,
              itemStyle: {color: '#fa250c'}
            },
            {
              value: dataPieList[1].value,
              name:`${dataPieList[1].name}:${dataPieList[1].value}`,
              itemStyle: {color: '#1790ff'}
            },
            {
              value: dataPieList[2].value,
              name:`${dataPieList[2].name}:${dataPieList[2].value}`,
              itemStyle: {color: '#ff7d00'}
            }
          ]
        }
      ]
    }
    if (option && typeof option === 'object') {
      this.chart.setOption(option, true)
    }
  }
  public render () {
    const { dataPieList } = this.props
    {console.log(dataPieList)}
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
