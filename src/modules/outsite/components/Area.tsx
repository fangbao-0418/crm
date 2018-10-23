import React from 'react'
import { Select } from 'antd'
import { fetchRegion } from '@/modules/common/api'
import { LabeledValue } from 'antd/lib/select'
interface Props {
  onChange?: (options?: LabeledValue) => void
  value?: any[]
  style?: React.CSSProperties
  placeholder?: string
}
interface State {
  options: Common.RegionProps[]
}

class Main extends React.Component<Props, State> {
  public state: State = {
    options: []
  }
  public componentWillMount () {
    fetchRegion({
      level: 3,
      parentId: APP.user.cityCode
    }).then((res) => {
      res = [{code: 'all', name: '全部'}].concat(res)
      this.setState({
        options: res
      })
    })
  }
  public render () {
    const { options } = this.state
    return (
      <Select
        labelInValue
        placeholder={this.props.placeholder}
        style={this.props.style}
        onChange={(value: LabeledValue) => {
          if (this.props.onChange) {
            this.props.onChange(value)
          }
        }}
      >
        {
          options.map((item) => {
            return (
              <Select.Option
                key={item.code}
              >
                {item.name}
              </Select.Option>
            )
          })
        }
      </Select>
    )
  }
}
export default Main
