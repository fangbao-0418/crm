import React from 'react'
import { Input, Select, Icon } from 'antd'
const InputGroup = Input.Group
const Option = Select.Option
interface Props {
  placeholder?: string
  options: Array<{
    label: string
    value: string
  }>
  onChange?: (value?: {key: string, value: string}) => void
}
class Main extends React.Component<Props> {
  public type: any
  public render () {
    const options = this.props.options || []
    const nodes: JSX.Element[] = []
    if (options.length > 0) {
      options.forEach((item) => {
        nodes.push(
          <Option value={item.value}>
            {item.label}
          </Option>
        )
      })
      this.type = options[0].value
    }
    return (
      <InputGroup compact>
        <Select
          onChange={(value) => {
            console.log(value)
            this.type = value
          }}
          style={{ width: '30%' }}
          defaultValue={options[0].value}
        >
          {nodes}
        </Select>
        <Input
          onChange={(e) => {
            const value = {
              key: this.type,
              value: e.target.value
            }
            if (this.props.onChange) {
              this.props.onChange(value)
            }
          }}
          style={{ width: '50%' }}
          placeholder={this.props.placeholder}
          suffix={<Icon type='search' theme='outlined' />}
        />
      </InputGroup>
    )
  }
}
export default Main
