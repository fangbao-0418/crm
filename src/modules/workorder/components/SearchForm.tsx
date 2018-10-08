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
      currency: value.currency || '全部服务内容',
      orderState: value.orderState || '全部状态',
      dateArr:[],
      stateArr:[
        {
          key: '',
          value: '全部状态'
        },
        {
          key: 'OUTSIDE_DISTRIBUTED',
          value: '已分配(外勤)'
        },
        {
          key: 'OUTSIDE_REFUSED',
          value: '外勤申请拒绝(外勤)'
        },
        {
          key: 'OUTSIDE_DISTRIBUTING',
          value: '待手动分配(外勤)'
        }
      ],
      severArr:[
        {
          name:'全部服务内容'
        },
        {
          name:'工商注册'
        },
        {
          name:'核名'
        },
        {
          name:'网上申请'
        },
        {
          name:'下发执照'
        },
        {
          name:'刻章'
        }
      ]
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
                {
                  this.state.severArr.map((item: any, index: any)=>{
                    return(
                      <Option value={item.name} key={index}>{item.name}</Option>
                    )
                  })
                }
                </Select>
                <Select
                    value={state.orderState}
                    size={size}
                    style={{ width: '15%', marginLeft: '3%', marginRight: '3%' }}
                    onChange={this.handleOrderStateChange}
                >{
                  this.state.stateArr.map((item: any, index: any) => {
                    return (
                      <Option value={item.key} key={index}>{item.value}</Option>
                    )
                  })
                }
                </Select>
                 <RangePicker onChange={this.onDateChange} allowClear={true}/>
            </Form>
        </div>
    )
  }
}

export default Form.create()(Main)
