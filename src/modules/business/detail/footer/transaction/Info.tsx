import React from 'react'
import { Button, Form, DatePicker, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { EnterSignInfo } from '@/modules/business/api'
import moment from 'moment'
import classNames from 'classnames'
const FormItem = Form.Item
interface Props extends FormComponentProps {
  enterSignTime?: string
  enterSignMoney?: string
  onOk?: (params: {
    customerId: any
    enterSignTime: string
    enterSignMoney: string
  }) => void
  onCancel?: () => void
  customerId?: string
}
interface State {
  enterSignTime?: string
  enterSignMoney?: string
}
class Main extends React.Component<Props, State> {
  public state: State = {
    enterSignTime: this.props.enterSignTime,
    enterSignMoney: this.props.enterSignMoney
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
            {getFieldDecorator('enterSignTime', {
              rules: [{
                required: true, message: '请选择签单时间'
              }],
              initialValue: moment(this.state.enterSignTime)
            })(
              <DatePicker
                allowClear={false}
                style={{width: 150}}
                placeholder=''
                format={'YYYY-MM-DD'}
                onChange={(current) => {
                  this.setState({
                    enterSignTime: current ? current.format('YYYY-MM-DD') : ''
                  })
                }}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='签单金额'
          >
            {getFieldDecorator('enterSignMoney', {
              rules: [{
                required: true, message: '请输入签单金额'
              }],
              initialValue: this.state.enterSignMoney
            })(
              <div>
                <Input
                  value={this.state.enterSignMoney}
                  style={{width: 150}}
                  onChange={(e) => {
                    this.setState({
                      enterSignMoney: e.target.value
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
                console.log(this.state.enterSignTime, this.state.enterSignMoney)
                const { enterSignTime, enterSignMoney } = this.state
                const params = {
                  customerId: this.props.customerId,
                  enterSignTime,
                  enterSignMoney
                }
                EnterSignInfo(params).then(() => {
                  this.props.onOk(params)
                })
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
