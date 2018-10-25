import React from 'react'
import moment, { Moment } from 'moment'
import { AutoComplete, Tabs, Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd'
import ContentBox from '@/modules/common/content'
import Mission from '@/modules/outsite/views/task/mission'
import Other from '@/modules/outsite/views/task/other'
import Service from '@/modules/outsite/services'
import _ from 'lodash'
import { FormComponentProps } from 'antd/lib/form'
import { withRouter, RouteComponentProps } from 'react-router'
type TaskItem = OutSide.TaskItem
const TabPane = Tabs.TabPane
const styles = require('@/modules/outsite/styles/form.styl')

const FormItem = Form.Item
const { TextArea } = Input
const formItemLayout = {
  labelCol: { span:2 },
  wrapperCol: { span:8 }
}
const Option = Select.Option
const dateFormat = 'YYYY-MM-DD hh:mm:ss'
interface Props extends FormComponentProps, RouteComponentProps<{id: string}> {}
interface State {
  formdata: any
  workerList: OutSide.OutSiterProps[]
  item: TaskItem
  orderNOList: string[]
}
// 列表
class Main extends React.Component<Props, State> {
  public orderMap: {[code: string]: OutSide.OrderProps} = {}
  public throttleChangeOrderNO = _.throttle(this.handleChangeOrderNO.bind(this), 1000)
  public state: State = {
    formdata: {},
    workerList: [],
    item: {},
    orderNOList: [] // 订单下拉
  }
  public componentWillMount () {
    this.getWorker()
    this.getItem()
    // fetchOrderList().then
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
    if (orderNo.length < 1) {
      return
    }
    Service.getOrderItemByOrderNO(orderNo).then((res: any) => {
      let orders: OutSide.OrderProps[] = []
      if (res.data && res.data.records instanceof Array) {
        orders = res.data.records
      }
      this.orderMap = {}
      const orderNOList = orders.map((order) => {
        this.orderMap[order.orderCode] = order
        return order.orderCode
      })
      this.setState({
        orderNOList
      })
    })
  }

  // 设置订单下拉值
  public onSelectOrderNO (orderNo: string) {
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
    return this.state.orderNOList.map((order, i) => {
      return (
        <AutoComplete.Option
          key={`option-${i}`}
        >
          {order}
        </AutoComplete.Option>
      )
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
    return (
    <ContentBox title='新增外勤任务'>
        <div style={{paddingBottom: '20px'}}>
        <Tabs defaultActiveKey='1' className={styles.add}>
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
                        onSearch={this.throttleChangeOrderNO}
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
                    <DatePicker
                      disabledDate={(current) => {
                        return current < moment().startOf('day')
                      }}
                      style={{width:'100%'}}
                      showTime
                      format={dateFormat}
                    />
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
export default Form.create()(withRouter(Main))
