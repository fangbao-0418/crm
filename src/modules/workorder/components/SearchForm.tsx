import { Input, Select, Form, DatePicker, Button, Row } from 'antd'
import React from 'react'

const Option = Select.Option
const { RangePicker } = DatePicker

class Main extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    const value = props.value || {}
    this.state = {
      text: value.text ,
      currency: value.currency || '全部内容',
      orderState: value.orderState || '全部状态',
      dateArr:[]
    }
  }

  public componentWillReceiveProps (nextProps: any) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value
      this.setState(value)
    }
  }
 // 输入框
  public handleTextChange = (e: any) => {
    const text = e.target.value
    if (!('value' in this.props)) {
      this.setState({ text })
    }
    this.triggerChange({ text })
  }

  public triggerChange = (changedValue: any) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue))
    }
  }
  // 服务内容
  public handleCurrencyChange = (currency: any) => {
    if (!('value' in this.props)) {
      this.setState({ currency })
    }
    this.triggerChange({ currency })
  }
  // 工单状态
  public handleOrderStateChange = (orderState: any) => {
    if (!('value' in this.props)) {
      this.setState({ orderState })
    }
    this.triggerChange({ orderState })
  }
  // 筛选日期
  public onDateChange = (dateArr: any) => {
    if (!('value' in this.props)) {
      this.setState({ dateArr })
    }
    this.triggerChange({ dateArr })
  }

  public render () {
    const { size } = this.props
    const state = this.state
    return (
        <div className='t-search-form'>
            <Form
                layout='inline'
                onChange={this.props.onSearch}
                onSubmit={this.props.onSearch}
            >
                <Input
                    type='text'
                    size={size}
                    value={state.text}
                    placeholder='请输入客户名称或订单编号'
                    onChange={this.handleTextChange}
                    style={{ width: '20%' }}
                />
                <Select
                    value={state.currency}
                    size={size}
                    style={{ width: '15%', marginLeft: '3%' }}
                    onChange={this.handleCurrencyChange}
                >
                <Option value='代理记账'>代理记账</Option>
                <Option value='工商注册'>工商注册</Option>
                </Select>
                <Select
                    value={state.orderState}
                    size={size}
                    style={{ width: '15%', marginLeft: '3%', marginRight: '3%' }}
                    onChange={this.handleOrderStateChange}
                >
                <Option value='准备材料(外勤)'>准备材料(外勤)</Option>
                <Option value='等待审核'>等待审核</Option>
                </Select>
                 <RangePicker onChange={this.onDateChange}/>
            </Form>
        </div>
    )
  }
}

export default Form.create()(Main)
