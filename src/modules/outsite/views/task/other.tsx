import React from 'react'
import { Radio } from 'antd'
import Service from '@/modules/outsite/services'
import _ from 'lodash'
interface States {
  value: number
  data?: Array<{
    category: string,
    id: number,
    name: string,
    status: string,
    updateTime: string,
    updateUser: string
  }>
  subGroup: any
}
const RadioGroup = Radio.Group
class Main extends React.Component<any, any> {
  public state: States = {
    value: 1,
    subGroup: {}
  }

  public componentWillMount () {
    this.getSublist()
  }

  // 获取子任务列表
  public getSublist () {
    return Service.getTplSublist({}).then((data: any) => {
      data.map((item: any, i: number) => {
        data[i].subId = item.id
      })
      this.setState({
        value: data[0].id,
        subList: data,
        subGroup: Service.getTplSublistGroupByCate(data)
      })
    })
  }

  public onChange = (e: any) => {
    const value = e.target.value
    this.setState({
      value
    })
    this.props.onChange(value)
  }

  public render () {
    const radioStyle = {
      height: '40px'
    }
    return (
      <div>
        <div>
          {/* <span>税务任务：</span> */}
          <RadioGroup
            name='radiogroup'
            value={this.state.value}
            onChange={this.onChange.bind(this)}
          >
          {
            _.map(Service.taskTplCateDict, (val: any, key: string) => {
              return (
              <div>
                <span>{val}：</span>
                {
                  this.state.subGroup[key] && this.state.subGroup[key].map((item: any, i: number) => {
                    return (<Radio style={radioStyle} value={item.id} key={`mission-item-${i}`}>{item.name}</Radio>)
                  })
                }
              </div>)
            })
          }
          </RadioGroup>
        </div>
      </div>
    )
  }
}

export default Main
