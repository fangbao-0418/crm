import React from 'react'
import { Icon, Table, Input, Form } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { MessageList, MessageItem } from '@/modules/message/types/messge'
import { Button } from 'antd'
import { DatePicker, Radio } from 'antd'
import { Moment } from 'moment'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker

const FormItem = Form.Item

interface States {
  a?: any
}
interface Props {
  onSearch: () => {}
  dateOnChange: (d: Moment) => {}
}

function hasErrors (fieldsError: any) {
  return Object.keys(fieldsError).some((field: any) => fieldsError[field])
}

// 搜索表单
class Main extends React.Component<any, any> {
  public state: States = {
  }

  public componentWillMount () {
  }

  public render () {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName')
    const passwordError = isFieldTouched('password') && getFieldError('password')

    return (
    <div className='t-search-form'>
      <Form
        layout='inline'
        onChange={this.props.onSearch}
        onSubmit={this.props.onSearch}
      >
        <DatePicker placeholder='选择日期' onChange={this.props.onDateChange} />
      </Form>
    </div>
    )
  }
}

export default Form.create()(Main)
