import React from 'react'
import { withRouter, RouteProps } from 'react-router'
import monent, { Moment } from 'moment'
import { Tabs, Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd'
import HCframe from '@/modules/common/components/HCframe'
import SearchOrder from '@/modules/outsite/components/SearchOrder'
import Mission from '@/modules/outsite/views/task/mission'
import Other from '@/modules/outsite/views/task/other'
import Service from '@/modules/outsite/services'

const TabPane = Tabs.TabPane
function callback (key: string) {
  console.log(key)
}
const styles = require('@/modules/outsite/styles/form.styl')

const FormItem = Form.Item
const { TextArea } = Input
const formItemLayout = {
  labelCol: { span:2 },
  wrapperCol: { span:8 }
}
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker

const dateFormat = 'YYYY/MM/DD'
const monthFormat = 'YYYY/MM'

// 列表
class Main extends React.Component<any, any> {
  public constructor (props: any, state: any) {
    super(props)
    this.state = {
      formdata: {}
    }
    console.log('----------> props::', this.props)
  }

  // 下拉变更
  public handleChange (value: any) {
    console.log(`selected ${value}`)
  }

  // 表单提交
  public handleSubmit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields((err: any, values: any) => {
      const data = Object.assign({}, this.state.formdata, values)
      console.log('Received values of form: ', data)
      Service.addTaskItem(data).then(() => {
        // APP.history.push(`${Service.moduleName}/task/list`)
      })
    })
  }

  public handleReset = () => {
    this.props.form.resetFields()
  }

  // 同步数据
  public syncFormdata (data: any = {}) {
    const formdata = Object.assign({}, this.state.formdata, data)
    this.setState({
      formdata
    })
  }

  // 任务选择值同步
  public onTaskidChange (templeteId: any) {
    this.syncFormdata({templeteId})
  }

  public render () {
    const { getFieldDecorator } = this.props.form

    const taskCprops = {
      onChange: this.onTaskidChange.bind(this),
      taskid: 1
    }

    return (
    <div>
      <HCframe title='新增外勤任务'>
        <Tabs defaultActiveKey='1' onChange={callback} className={styles.add}>
            <TabPane tab='通办任务' key='1'>
              <Mission onChange={this.onTaskidChange.bind(this)} />
            </TabPane>
            <TabPane tab='其他任务' key='2'>
              <Other onChange={this.onTaskidChange.bind(this)} />
            </TabPane>
          </Tabs>
          <div>
              <div>
                <Form
                  onSubmit={this.handleSubmit.bind(this)}
                >
                <Row>
                  <Col>
                    <FormItem {...formItemLayout} label='关联订单'>
                      {getFieldDecorator('orderNo', {
                        rules: [{
                          required: true,
                          message: '请输入订单编号'
                        }]
                      })(
                        <Input placeholder='请输入订单编号' />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <FormItem {...formItemLayout} label='公司名称'>
                    {getFieldDecorator('customerId', {
                    })(
                      <Input disabled />
                    )}
                  </FormItem>
                </Row>
                <Row>
                  <FormItem {...formItemLayout} label='区域'>
                    {getFieldDecorator('areaId', {
                    })(
                      <Input disabled />
                    )}
                  </FormItem>
                </Row>
                <Row>
                  <FormItem {...formItemLayout} label='选择外勤'>
                    {getFieldDecorator('userId', {
                      rules: [{
                        required: true,
                        message: '请选择外勤'
                      }]
                    })(
                      <Select onChange={this.handleChange} placeholder='请选择外勤人员'>
                        <Option value='王小伟'>王小伟</Option>
                        <Option value='王小伟'>王小伟</Option>
                        <Option value='王小伟'>王小伟</Option>
                        <Option value='王小伟'>王小伟</Option>
                      </Select>
                    )}
                  </FormItem>
                </Row>
                <Row>
                  <FormItem {...formItemLayout} label='开始时间'>
                    {getFieldDecorator('startTime', {
                      rules: [{
                        required: true,
                        message: '请选择开始时间'
                      }]
                    })(
                      <DatePicker style={{width:'100%'}} format={dateFormat} />
                    )}
                  </FormItem>
                </Row>
                <Row>
                  <FormItem {...formItemLayout} label='备注'>
                    {getFieldDecorator('summary', {
                    })(
                      <TextArea rows={8} style={{width:'600px', maxWidth:'none'}} />
                    )}
                  </FormItem>
                </Row>
                <Row>
                  <Col span={24} style={{ textAlign: 'left', margin:'0 0 60px 80px' }}>
                    <Button type='primary' htmlType='submit'>提交</Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                      重置
                    </Button>
                  </Col>
                </Row>
                </Form>
              </div>

            </div>
        </HCframe>
    </div>
    )
  }
}
export default Form.create()(Main)
