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
      currency: value.currency || '分类',
      orderState: value.orderState || '状态',
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
                <span style={{ marginLeft: '1%'}}>子任务名称:</span>
                <Input
                    type='text'
                    size={size}
                    value={state.text}
                    placeholder='请输入子任务名称'
                    onChange={this.handleTextChange}
                    style={{ width: '20%',  marginLeft: '3%'}}
                />
                <span style={{ marginLeft: '3%'}}>任务分类:</span>
                <Select
                    value={state.currency}
                    size={size}
                    style={{ width: '15%', marginLeft: '3%' }}
                    onChange={this.handleCurrencyChange}
                >
                <Option value='税务'>税务</Option>
                <Option value='工商'>工商</Option>
                <Option value='其他'>其他</Option>
                <Option value='特殊'>特殊</Option>
                </Select>
                <span style={{ marginLeft: '3%'}}>状态:</span>
                <Select
                    value={state.orderState}
                    size={size}
                    style={{ width: '15%', marginLeft: '3%', marginRight: '3%' }}
                    onChange={this.handleOrderStateChange}
                >
                <Option value='启用'>启用</Option>
                <Option value='停用'>停用</Option>
                </Select>
            </Form>
        </div>
    )
  }
}

export default Form.create()(Main)
