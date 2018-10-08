import React from 'react'
import { Input } from 'antd'
import { TextAreaProps } from 'antd/lib/input/TextArea'
const { TextArea } = Input
interface Props extends TextAreaProps {
  label?: string
  labelWidth?: string
  field?: string
  onChange?: (e?: React.SyntheticEvent, value?: any) => void
}
class Main extends React.Component<Props> {
  public render () {
    const labelWidth = this.props.labelWidth || '80px'
    return (
      <span className='ant-input-group ant-input-group-compact'>
        <span className='ant-input-group-wrapper'>
          <span className='ant-input-wrapper ant-input-group'>
            {
              !!this.props.label && (
                <span className='ant-input-group-addon'>
                  <div style={{width: labelWidth}}>
                    {this.props.label}
                  </div>
                </span>
              )
            }
            <span className='ant-input-affix-wrapper'>
              <TextArea
                {...this.props}
                onChange={(e) => {
                  if (this.props.onChange) {
                    const target = e.target
                    const value = {
                      key: this.props.field,
                      value: target.value
                    }
                    this.props.onChange(e, value)
                  }
                }}
              />
            </span>
          </span>
        </span>
      </span>
    )
  }
}
export default Main
