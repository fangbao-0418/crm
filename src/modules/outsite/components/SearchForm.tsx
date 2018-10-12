import React from 'react'
import { Icon, Table, Input, Form, Select } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { DatePicker, Radio, Row, Col } from 'antd'
import { Moment } from 'moment'
import Service from '@/modules/outsite/services'
import { Map } from '@/modules/outsite/types/outsite'
import { TasktplItem, TasktplList } from '@/modules/outsite/types/tploutside'
import _ from 'lodash'

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
    extshow: false,
    tplTaskList: [], // 任务模板列表
    tplTaskMap: {}, // 任务id:name map
    tplSubData: {}, // 子任务按照任务id分组数据
    searchData: {
      names: '', // 客户或联系人名称
      tplTaskid: '',
      tplSubid: '',
      userName: '', // 外勤人员
      status: '',
      areaId: '',
      startTime: ''
    }
  }

  public componentWillMount () {
  }

  // 获取全部任务
  public getTplTaskList () {
    Service.getTplList().then((data: any) => {
      if (!data) {
        return
      }
      const tplTaskMap: Map<string> = {}
      const tplSubData: Map<Array<TasktplItem>> = {}
      data.map((item: TasktplItem, index: number) => {
        tplTaskMap[item.id] = item.name
        tplSubData[item.id] = item.subList
      })
      this.setState({
        tplTaskList: data,
        tplTaskMap,
        tplSubData
      })
    })
  }

  // 生成下拉
  public createTaskNameOptions (options: Array<any>) {
    /*
    const dict = Service.getTplList().then()
    const options: Array<any> = []
    for (const i in dict) {
      if (i) {
        options.push({
          field: i,
          label: dict[i]
        })
      }
    }
    */
    return options.map((item: any) => {
      return <Select.Option key={`option-${item.id}`} value={item.id}>{item.name}</Select.Option>
    })
  }

  // 搜索提交
  public onChange (a: any) {
    console.log('search form changed::', a, arguments)
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
        onChange={this.onChange.bind(this)}
        // onSubmit={this.props.onSearch}
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
        {getFieldDecorator(`tplTaskid`, {
          rules: [{
            required: false,
            message: ''
          }]
        })(
          <Select style={{width: '120px'}}>
            {this.createTaskNameOptions(this.state.tplTaskList)}
          </Select>
        )}
        </FormItem>
        <FormItem>
        {getFieldDecorator(`tplSubid`, {
          rules: [{
            required: false,
            message: ''
          }]
        })(
          <Select style={{width: '120px'}}>
            {this.createTaskNameOptions(this.state.tplTaskList)}
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
                  {getFieldDecorator(`userName`, {
                    rules: [{
                      required: false,
                      message: ''
                    }]
                  })(
                    <Input placeholder='请输入外勤人员' />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                {getFieldDecorator(`status`, {
                  rules: [{
                    required: false,
                    message: ''
                  }]
                })(
                  <Select style={{width: '120px'}}>
                    {
                      _.map(Service.taskStatusDict, (val: string, key: string) => {
                        return <Select.Option key={`option-${key}`} value={key}>{val}</Select.Option>
                      })
                    }
                  </Select>
                )}
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
