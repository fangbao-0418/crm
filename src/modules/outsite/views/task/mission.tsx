import React from 'react'
import { Radio } from 'antd'
import Service from '@/modules/outsite/services'

const RadioGroup = Radio.Group
interface Props {
  onChange: (value?: any) => void
}
interface States {
  value: any,
  color: string,
  data: Array<OutSide.TaskItem>
}

class Main extends React.Component<Props, States> {
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
    Service.getTplList({
      status: 'NORMAL',
      systemFlag: '0'
    }).then((res: any) => {
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
      console.log(data, 'data')
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
        {data.length > 0 && <RadioGroup
          onChange={this.onChange.bind(this)}
          value={this.state.value}
        >
          {
            data.map((item, i) => {
              console.log(item, 'state')
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
        </RadioGroup>}
      </div>
    )
  }
}

export default Main
