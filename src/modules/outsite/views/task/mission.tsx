import React from 'react'
import { Table, Radio, Input } from 'antd'
import Service from '@/modules/outsite/services'

const RadioGroup = Radio.Group
interface States {
  value: any,
  color: string,
  data: Array<OutSide.TaskItem>
}

class Main extends React.Component<any, any> {
  public state: States = {
    value: '',
    color: 'blue',
    data: []
  }

  public componentWillMount () {
    this.getTplList()
  }

  // 获取任务列表
  public getTplList () {
    Service.getTplList().then((res: any) => {
      if (!res) {
        return
      }
      res = res || []
      const data = res.map((item: any) => {
        item.subContent = ''
        if (item.subList) {
          item.subContent = item.subList.map((subitem: any) => {
            return subitem.name
          })
          item.subContent = item.subContent.join('，')
        }
        return item
      })
      if (data.length > 1) {
        this.onChange(null, data[0].id)
        this.setState({
          value: data[0].id,
          data
        })
      }
    })
  }

  public onChange = (e: any, value?: any) => {
    value = e ? e.target.value : value
    this.setState({
      value
    })
    this.props.onChange(value)
  }

  public render () {
    const radioStyle = {
      display: 'block',
      height: '40px'
    }
    const { data } = this.state
    return (
      <div>
        <RadioGroup
          onChange={this.onChange.bind(this)}
          value={this.state.value}
        >
          {
            data && this.state.data.map((item, i) => {
              return (
                <Radio
                  style={radioStyle}
                  value={item.id}
                  key={`mission-item-${i}`}
                >
                  {item.name}：{item.subContent}
                </Radio>
              )
            })
          }
        </RadioGroup>
      </div>
    )
  }
}

export default Main
