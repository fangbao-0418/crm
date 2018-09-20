import React from 'react'
import { Input, Select } from 'antd'
import { InputProps } from 'antd/lib/input/Input'
import classNames from 'classnames'
const InputGroup = Input.Group
const Option = Select.Option
const styles = require('./style')
interface Props extends InputProps {
  className?: string
  style?: React.CSSProperties
  placeholder?: string
  labelWidth?: string
  label?: Array<{
    label: string
    value: string
  }> | string
  onChange?: (e: React.SyntheticEvent, value?: {key: string, value: string}) => void
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>
  addonBefore?: React.ReactNode | string
  addonAfter?: React.ReactNode | string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  field?: string
}
class Main extends React.Component<Props> {
  public type: any
  public state = {
    label: this.props.label instanceof Array ? this.props.label[0].value : this.props.label
  }
  public getLabel () {
    if (this.props.label === undefined) {
      return null
    }
    const labelWidth = this.props.labelWidth || '72px'
    if (this.props.label instanceof Array) {
      const options = this.props.label || []
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
        <Select
          onChange={(value) => {
            console.log(value)
            this.type = value
          }}
          style={{ width: labelWidth }}
          defaultValue={options[0].value}
        >
          {nodes}
        </Select>
      )
    } else {
      return this.props.label
    }
  }
  public render () {
    const labelWidth = this.props.labelWidth || '72px'
    return (
      <InputGroup
        compact
        style={this.props.style}
        className={classNames(styles.container, this.props.className)}
      >
        <Input
          {...this.props}
          addonBefore={
            <div
              className={styles['input-label']}
              style={{width: labelWidth}}
            >
              {this.props.addonBefore || this.getLabel()}
            </div>
          }
          addonAfter={this.props.addonAfter}
          onChange={(e) => {
            const value = {
              key: this.type || this.props.field,
              value: e.target.value
            }
            console.log(value)
            if (this.props.onChange) {
              this.props.onChange(e, value)
            }
          }}
          placeholder={this.props.placeholder}
          prefix={this.props.prefix}
          suffix={this.props.suffix}
          onPressEnter={this.props.onPressEnter}
        />
      </InputGroup>
    )
  }
}
export default Main
