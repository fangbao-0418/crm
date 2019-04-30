import React from 'react'
import { Button, Form, DatePicker, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import classNames from 'classnames'
const FormItem = Form.Item
interface Props extends FormComponentProps {
  signOrderTime?: string
  signOrderMoney?: string
  onOk?: () => void
  onCancel?: () => void
}
interface State {
  signOrderTime?: string
  signOrderMoney?: string
}
class Main extends React.Component<Props, State> {
  public state: State = {
    signOrderTime: this.props.signOrderTime,
    signOrderMoney: this.props.signOrderMoney
  }
  public render () {
    const formItemLayout: any = {
      wrapperCol: {
        span: 10
      },
      labelCol: {
        span: 5
      }
    }
    const { getFieldDecorator }  = this.props.form
    return (
      <div>
        <div>
          <div className={classNames('ml20', 'mb20')} style={{color: '#ccc'}}>此信息仅用于线下成交转化率统计。</div>
          <FormItem
            {...formItemLayout}
            label='签单时间'
          >
            {getFieldDecorator('signOrderTime', {
              rules: [{
                required: true, message: '请选择签单时间'
              }],
              initialValue: this.state.signOrderTime
            })(
              <DatePicker
                allowClear={false}
                style={{width: 150}}
                placeholder=''
                format={'YYYY-MM-DD'}
                onChange={(current) => {
                  this.setState({
                    signOrderTime: current ? current.format('YYYY-MM-DD') : ''
                  })
                }}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='签单金额'
          >
            {getFieldDecorator('signOrderMoney', {
              rules: [{
                required: true, message: '请输入签单金额'
              }],
              initialValue: this.state.signOrderMoney
            })(
              <div>
                <Input
                  value={this.state.signOrderMoney}
                  style={{width: 150}}
                  onChange={(e) => {
                    this.setState({
                      signOrderMoney: e.target.value
                    })
                  }}
                />
                <span> 元</span>
              </div>
            )}
          </FormItem>
        </div>
        <div className={classNames('text-right', 'mt20')}>
          <Button className='mr5' onClick={() => this.props.onCancel()}>取消</Button>
          <Button
            type='primary'
            onClick={() => {
              this.props.form.validateFields((errs, values) => {
                if (errs !== null) {
                  return
                }
                console.log(this.state.signOrderTime, this.state.signOrderMoney)
                this.props.onOk()
              })
            }}
          >
            确定
          </Button>
        </div>
      </div>
    )
  }
}
export default Form.create()(Main)
