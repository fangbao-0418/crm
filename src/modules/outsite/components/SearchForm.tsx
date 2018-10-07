import React from 'react'
import { Icon, Table, Input, Form, Select } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { DatePicker, Radio, Row, Col } from 'antd'
import { Moment } from 'moment'
import TaskService from '@/modules/outsite/services'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker
const FormItem = Form.Item
const styles = require('@/modules/outsite/styles/list')

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
  public state: any = {
    extshow: false
  }

  public componentWillMount () {
  }

  public createTaskNameOptions () {
    const dict = TaskService.taskNameDict
    const options: Array<any> = []
    for (const i in dict) {
      if (i) {
        options.push({
          field: i,
          label: dict[i]
        })
      }
    }
    return options.map((item: any) => {
      return <Select.Option key={`option-${item.field}`} value={item.field}>{item.label}</Select.Option>
    })
  }

  // 搜索项显藏
  public setExtshow () {
    this.setState({
      extshow: !this.state.extshow
    })
  }
  public setExthide () {
    this.setState({
      extshow: false
    })
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
        style={{width: '80%'}}
        onChange={this.props.onSearch}
        onSubmit={this.props.onSearch}
      >
        <FormItem>
        {getFieldDecorator(`names`, {
          rules: [{
            required: false,
            message: ''
          }]
        })(
          <Input placeholder='请输入客户名称或者联系人' style={{width: '200px'}}/>
        )}
        </FormItem>
        <FormItem>
        {getFieldDecorator(`taskname`, {
          rules: [{
            required: false,
            message: ''
          }]
        })(
          <Select style={{width: '120px'}} value='税务'>
            {this.createTaskNameOptions()}
          </Select>
        )}
        </FormItem>

        <div className={styles.extshow}>
          <span onClick={this.setExtshow.bind(this)} className={styles.searchico}>
            <Icon type={this.state.extshow ? 'up' : 'down'} />
          </span>
          <div className={`${styles.extcontent} ${this.state.extshow ? styles.show : styles.hide}`}>
            <Row>
              <Col span={12}>
                <FormItem>
                  <Input placeholder='请输入外勤人员' name='userName' />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem>
                  <Input placeholder='请选择服务状态' name='status' />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem>
                  <Input placeholder='选择所属区县'  name='areaId' />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem>
                  <Input placeholder='请选择提交日期' name='startTime' />
                </FormItem>
              </Col>
            </Row>
          </div>
        </div>
      </Form>
    </div>
    )
  }
}

export default Form.create()(Main)
