import React from 'react'
import { Input, Select, Icon } from 'antd'
const styles = require('./style')
const InputGroup = Input.Group
const Option = Select.Option
interface Props {
  className?: string
  style?: React.CSSProperties
  placeholder?: string
  options?: Array<{
    type: string
    word: string
  }>
  onKeyDown?: (e?: React.KeyboardEvent<HTMLInputElement>, value?: {type: string, word: string}) => void
  onChange?: (value?: {type: string, word: string}) => void
}
class Main extends React.Component<Props> {
  public type: any
  public render () {
    const options = this.props.options || []
    const nodes: JSX.Element[] = []
    if (options.length > 0) {
      options.forEach((item) => {
        nodes.push(
          <Option value={item.type}>
            {item.word}
          </Option>
        )
      })
      this.type = options[0].type
    }
    return (
      <InputGroup compact style={this.props.style} className={this.props.className}>
        <Select
          onChange={(value) => {
            this.type = value
          }}
          style={{ width: '35%' }}
          defaultValue={options[0].type}
        >
          {nodes}
        </Select>
        <Input
          onChange={(e) => {
            const value = {
              type: this.type,
              word: e.target.value
            }
            if (this.props.onChange) {
              this.props.onChange(value)
            }
          }}
          onKeyDown={(e) => {
            const target: any = e.target
            const value = {
              type: this.type,
              word: target.value
            }
            if (this.props.onKeyDown) {
              this.props.onKeyDown(e, value)
            }
          }}
          style={{ width: '50%' }}
          placeholder={this.props.placeholder}
          suffix={<Icon className={styles.icon} type='search' theme='outlined'/>}
        />
      </InputGroup>
    )
  }
}
export default Main
