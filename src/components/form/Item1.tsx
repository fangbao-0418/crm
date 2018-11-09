import React from 'react'
import classNames from 'classnames'
const styles = require('./style')
interface Props {
  label?: string
  labelStyle?: React.CSSProperties
  required?: boolean
  labelWidth?: string
}
class Main extends React.Component<Props> {
  public render () {
    const labelWidth = this.props.labelWidth || '80px'
    return (
      <span className={classNames('ant-input-group ant-input-group-compact', styles['form-item-1'])}>
        <span className='ant-input-group-wrapper'>
          <span className='ant-input-wrapper ant-input-group'>
            {
              !!this.props.label && (
                <span
                  style={this.props.labelStyle}
                  className={classNames('ant-input-group-addon', styles['no-border'])}
                >
                  <div style={{width: labelWidth}}>
                    {this.props.required && <span style={{color: 'red'}}>* </span>}
                    {this.props.label}:
                  </div>
                </span>
              )
            }
            <span
              // className='ant-input-affix-wrapper'
            >
              {this.props.children}
            </span>
          </span>
        </span>
      </span>
    )
  }
}
export default Main
