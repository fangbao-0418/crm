import React from 'react'
import { withRouter, RouteProps } from 'react-router'
import moment, { Moment } from 'moment'
import { AutoComplete, Tabs, Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd'
import ContentBox from '@/modules/common/content'
import SearchOrder from '@/modules/outsite/components/SearchOrder'
import Mission from '@/modules/outsite/views/task/mission'
import Other from '@/modules/outsite/views/task/other'
import Service from '@/modules/outsite/services'
import { TaskItem } from '@/modules/outsite/types/outsite'

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

const dateFormat = 'YYYY-MM-DD hh:mm:ss'

// 列表
class Main extends React.Component<any, any> {
  public orderMap: any = {}
  public constructor (props: any, state: any) {
    super(props)
    this.state = {
      formdata: {},
      workerList: [],
      item: {},
      orderNOList: [], // 订单下拉
      order: {} // 当前选中的订单
    }
    console.log('----------> props::', this.props)
  }

  public componentWillMount () {
    this.getWorker()
    this.getItem()
  }

  // 获取外勤人员
  public getWorker () {
    Service.getWorkerList().then((workerList: any) => {
      this.setState({
        workerList
      })
    })
  }

  // 获取当前外勤信息
  public getItem () {
    const params = this.props.match.params
    if (!params.id) {
      return
    }
    Service.getItemByTaskid(params.id).then((item: TaskItem) => {
      this.setState({
        item
      })
    })
  }

  // 下拉变更
  public handleChangeOrderNO (orderNo: any) {
    console.log('???????', orderNo)
    /*
    const orderNo = e.target.value
    */
    if (orderNo.length < 1) {
      return
    }
    Service.getOrderItemByOrderNO(orderNo).then((res: any) => {
      console.log('order list ::', res)
      this.orderMap = {}
      const orderNOList = res.map((order: any) => {
        this.orderMap[order.orderCode] = order
        return order.orderCode
      })
      this.setState({
        orderNOList
      })
    })
  }

  // 设置订单下拉值
  public onSelectOrderNO (orderNo: any) {
    console.log('selected::', orderNo)
    const order = this.orderMap[orderNo]
    this.syncFormdata({
      orderNo,
      customerId: order.customerOrgId,
      customerName: order.customerOrgName,
      areaId: order.countyCode,
      areaName: order.countyName
    })
  }

  // 生成订单列表
  public createOrderNOoptions () {
    return this.state.orderNOList.map((order: any, i: number) => {
      return <AutoComplete.Option key={`option-${i}`} value={order.orderCode}>{order.orderCode}</AutoComplete.Option>
    })
  }

  // 表单提交
  public handleSubmit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields((err: any, values: any) => {
      const data = Object.assign({}, this.state.formdata, values)
      console.log('Received values of form: ', this.state.formdata, values, data)
      if (err) { return }
      // 格式化时间
      data.startTime = moment(data.startTime).format('YYYY-MM-DD hh:mm:ss')
      Service.addTaskItem(data).then(() => {
        APP.success('操作成功')
        APP.history.push(`/outsite/task/list`)
      })
    })
  }

  public handleReset = () => {
    this.props.form.resetFields()
    this.syncFormdata({
      templateId: '',
      orderNo: '',
      areaId: '',
      areaName: '',
      customerId: '',
      customerName: ''
    })
  }

  // 同步数据
  public syncFormdata (data: any = {}) {
    const formdata = Object.assign({}, this.state.formdata, data)
    console.log('sync data::', data, formdata)
    this.setState({
      formdata
    })
  }

  // 任务选择值同步
  public onTaskidChange (templateId: any) {
    this.syncFormdata({templateId})
  }

  public render () {
    const { getFieldDecorator } = this.props.form

    const taskCprops = {
      onChange: this.onTaskidChange.bind(this),
      taskid: 1
    }

    return (
    <ContentBox title='新增外勤任务'>
        <div style={{paddingBottom: '20px'}}>
        <Tabs defaultActiveKey='1' onChange={callback} className={styles.add}>
          <TabPane tab='通办任务' key='1'>
            <Mission onChange={this.onTaskidChange.bind(this)} />
          </TabPane>
          <TabPane tab='其他任务' key='2'>
            <Other onChange={this.onTaskidChange.bind(this)} />
          </TabPane>
        </Tabs>
        </div>
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
                      <AutoComplete
                        dataSource={this.state.orderNOList}
                        style={{ width: 200 }}
                        onSelect={this.onSelectOrderNO.bind(this)}
                        onSearch={this.handleChangeOrderNO.bind(this)}
                        placeholder='请输入订单号'
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <FormItem {...formItemLayout} label='公司名称'>
                  <Input disabled value={this.state.formdata.customerName} />
                </FormItem>
              </Row>
              <Row>
                <FormItem {...formItemLayout} label='区域'>
                  <Input disabled  value={this.state.formdata.areaName} />
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
                    <Select placeholder='请选择外勤人员' value={this.state.item.userId}>
                    {
                      this.state.workerList.map((worker: any, i: number) => {
                        return <Option key={`worker-${i}`} value={worker.id}>{worker.name}</Option>
                      })
                    }
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
                    <DatePicker style={{width:'100%'}} showTime format={dateFormat} value={this.state.item.startTime} />
                  )}
                </FormItem>
              </Row>
              <Row>
                <FormItem {...formItemLayout} label='备注'>
                  {getFieldDecorator('summary', {
                  })(
                    <TextArea rows={8} style={{width:'600px', maxWidth:'none'}} value={this.state.item.summary} />
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
      </ContentBox>
    )
  }
}
export default Form.create()(Main)
