import React from 'react'
import { Input, Select, Icon } from 'antd'
import _ from 'lodash'
const styles = require('./style')
const InputGroup = Input.Group
const Option = Select.Option
interface Props {
  className?: string
  style?: React.CSSProperties
  placeholder?: string
  options?: Array<{
    label: string
    value: string
  }>
  onKeyDown?: (e?: React.KeyboardEvent<HTMLInputElement>, value?: {value?: string, key: string}) => void
  onChange?: (value?: {value?: string, key: string}) => void
  onSearch?: (value?: {value?: string, key: string}) => void
}
class Main extends React.Component<Props> {
  public value: {key: string, value?: string}
  public render () {
    const options = (this.props.options instanceof Array && this.props.options.length > 0) ? this.props.options : [{value: undefined, label: undefined}]
    const nodes: JSX.Element[] = []
    if (options.length > 0) {
      options.forEach((item) => {
        nodes.push(
          <Option value={item.value}>
            {item.label}
          </Option>
        )
      })
    }
    return (
      <InputGroup compact style={this.props.style} className={this.props.className}>
        <Select
          onChange={(value: string) => {
            if (options.length === 0) {
              return
            }
            if (this.value === undefined) {
              this.value = {
                key: options[0].value
              }
            }
            this.value.key = value
          }}
          style={{ width: '35%' }}
          defaultValue={options[0].value}
        >
          {nodes}
        </Select>
        <Input
          onChange={(e) => {
            if (options.length === 0) {
              return
            }
            if (this.value === undefined) {
              this.value = {
                key: options[0].value
              }
            }
            this.value.value = e.target.value
            if (this.props.onChange) {
              this.props.onChange(_.cloneDeep(this.value))
            }
          }}
          onKeyDown={(e) => {
            if (options.length === 0) {
              return
            }
            if (this.value === undefined) {
              this.value = {
                key: options[0].value
              }
            }
            const target: any = e.target
            this.value.value = target.value
            if (this.props.onKeyDown) {
              this.props.onKeyDown(e, _.cloneDeep(this.value))
            }
          }}
          style={{ width: '50%' }}
          placeholder={this.props.placeholder}
          suffix={
            <Icon
              className={styles.icon}
              type='search'
              theme='outlined'
              onClick={() => {
                if (this.props.onSearch) {
                  this.props.onSearch(_.cloneDeep(this.value))
                }
              }}
            />
          }
        />
      </InputGroup>
    )
  }
}
export default Main
