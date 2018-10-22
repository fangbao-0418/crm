import React from 'react'
import { Icon, Table, Input, Form, Select } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { Cascader, DatePicker, Radio, Row, Col } from 'antd'
import moment, { Moment } from 'moment'
import Service from '@/modules/outsite/services'
import { Map } from '@/modules/outsite/types/outsite'
import { TasktplItem, TasktplList } from '@/modules/outsite/types/tploutside'
import _ from 'lodash'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker
const FormItem = Form.Item
const Search = Input.Search
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

  /*
    UNDISTRIBUTED: '未分配',
    DISTRIBUTED: '已分配',
    COLLECTING: '收集资料',
    FINISHED: '已完成', // （外勤主管审批交付通过）
    REFUSED: '已驳回', // (外勤主管审批交付不通过)
    RUNNING: '进行中',
    SUBMITED: '已交付',
    CANCELUNAPPROVED: '待审批', // （取消）
    REJECTUNAPPROVED: '待审批', // （拒绝）
    CANCELED: '已取消' // (外勤主管审批取消通过)
    */
// 搜索表单
class Main extends React.Component<any, any> {
  public state: any = {
    extshow: false,
    tplTaskList: [], // 任务模板列表
    tplSubList: [], // 子任务列表
    tplTaskMap: {}, // 任务id:name map
    tplSubGroup: {}, // 子任务按照任务id分组数据
    tplSubData: [], // 全部子任务
    statusGroup: {
      UNDISTRIBUTED: {
        UNDISTRIBUTED: '未分配' // 驳回
      },
      DISTRIBUTED: {
        DISTRIBUTED: '已分配', // 初始
        COLLECTING: '收集资料',
        REFUSED: '已驳回', // (外勤主管审批交付不通过)
        RUNNING: '进行中',
        SUBMITED: '已交付'
      },
      FINISHED: {
        FINISHED: '已完成', // （外勤主管审批交付通过）
        COMMITED: '已提交', // 已提交 // @181020 后端开始补充
        CANCELED: '已取消' // (外勤主管审批取消通过)
      }
    },
    statusDict: {}, // @181017 产品确认：待分配、已分配、已完成三个状态的可筛选属性不同
    searchData: {
      name: '', // 客户或联系人名称
      templeteId: '',
      subId: '',
      userName: '', // 外勤人员
      status: '',
      orgId: '',
      startTime: ''
    },
    areaData: [{
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
          value: 'xihu',
          label: 'West Lake'
        }, {
          value: 'xiasha',
          label: 'Xia Sha',
          disabled: true
        }]
      }]
    }, {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
          value: 'zhonghuamen',
          label: 'Zhong Hua men'
        }]
      }]
    }]
  }

  public componentWillMount () {
    this.getTplTaskList()
    this.setCurrentStatusDict()
  }

  public componentWillReceiveProps (props: any) {
    this.setCurrentStatusDict(props.parData.tab)
  }

  // 设置当前的状态字典
  public setCurrentStatusDict (tab: any = '') {
    const { statusGroup } = this.state
    tab = tab ? tab : this.props.parData.tab
    console.log('?????????', this.props.parData.tab, statusGroup[tab])
    this.setState({
      statusDict: statusGroup[tab]
    })
  }

  // 获取全部任务
  public getTplTaskList () {
    Service.getTplList().then((data: any) => {
      if (!data) {
        return
      }
      const tplTaskMap: Map<string> = {}
      const tplSubGroup: Map<Array<TasktplItem>> = {}
      data.map((item: TasktplItem, index: number) => {
        tplTaskMap[item.id] = item.name
        item.subList.unshift({
          id: '',
          name: '全部'
        })
        tplSubGroup[item.id] = item.subList
      })
      data.unshift({
        id: '',
        name: '全部'
      })
      this.setState({
        tplTaskList: data,
        tplTaskMap,
        tplSubGroup
      })
    })

    Service.getTplSublist().then((tplSubData: any) => {
      if (!tplSubData) {return}
      // const tplSubData: Array<TasktplItem> = []
      tplSubData.unshift({
        id: '',
        name: '全部子任务'
      })
      this.setState({
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

  // 同步搜索表单数据
  public syncSearchData (data: any = {}) {
    const { searchData } = this.state
    this.setState({
      searchData: Object.assign({}, searchData, data)
    }, () => {
      this.hookCallback()
    })
  }

  // 搜索提交
  public onChange (e: Event) {
    // console.log('search form changed::', a, arguments)
    e.preventDefault()
    this.props.form.validateFields((err: any, values: any) => {
      // console.log('Received values of form: ', values)
      // this.props.onSearch(Object.assign({}, this.state.searchData, values))
      const vals: Map<any> = {}
      _.map(values, (val: any, key: any) => {
        // if (val) {
        vals[key] = val
        // }
      })
      const searchData = Object.assign({}, this.state.searchData, vals)
      console.log('search form change::', searchData, vals)
      this.setState({
        searchData
      }, () => {
        this.hookCallback()
      })
    })
  }

  // 挂父组件回调
  public hookCallback () {
    console.log('search form callback::', this.state.searchData)
    this.props.onSearch(this.state.searchData)
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

    return (
    <div className='t-search-form'>
      <Form
        layout='inline'
        style={{width: '80%'}}
        onChange={this.onChange.bind(this)}
        // onSubmit={this.props.onSearch}
      >
        <FormItem>
        {getFieldDecorator(`name`, {
          rules: [{
            required: false,
            message: ''
          }]
        })(
          <Search placeholder='请输入客户或联系人名称' style={{width: '200px'}}/>
        )}
        </FormItem>
        <FormItem>
        {getFieldDecorator(`templeteId`, {
          rules: [{
            required: false,
            message: ''
          }]
        })(
          <Select
            style={{width: '120px'}}
            onChange={(e: any) => {
              this.syncSearchData({
                templeteId: e
              })
              const sublist = this.state.tplSubGroup[e]
              console.log('.......', e, sublist, this.state.tplSubGroup)
              this.setState({
                tplSubList: sublist ? sublist : []
              })
            }}
            placeholder='全部任务名称'
          >
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
          <Select
            style={{width: '140px'}}
            onChange={(e: any) => {
              /*
              this.syncSearchData({
                tplTaskid: d
              })
              */
              console.log('.......', e)
              this.syncSearchData({
                subId: e
              })
            }}
            placeholder='全部当前子任务'
          >
            {this.createTaskNameOptions(this.state.searchData.templeteId ? this.state.tplSubList : this.state.tplSubData)}
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
                    <Search placeholder='请输入外勤人员' />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem>
                {getFieldDecorator(`status`, {
                  rules: [{
                    required: false,
                    message: ''
                  }]
                })(
                  <Select
                    style={{width: '140px'}}
                    onChange={(status: any) => {
                      this.syncSearchData({
                        status
                      })
                    }}
                    placeholder='请选择服务状态'
                  >
                    {
                      // _.map(Service.taskStatusDict, (val: string, key: string) => {
                      // 待分配、已分配、已完成三个页面，可筛选状态不同
                      _.map(this.state.statusDict, (val: string, key: string) => {
                        return <Select.Option key={`option-${key}`} value={key}>{val}</Select.Option>
                      })
                    }
                  </Select>
                )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem>
                  {getFieldDecorator(`orgId`, {})(
                    <Cascader
                      options={this.state.areaData}
                      onChange={(d: any) => {
                        console.log('orgid::', d)
                        this.syncSearchData({
                          orgId: d
                        })
                      }}
                      placeholder='选择所属区县'
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem>
                  {getFieldDecorator(`startTime`, {
                    placeholder: '请输入日期',
                    format: `YY-MM-DD`
                  })(
                    <DatePicker
                      style={{width:'100%'}}
                      onChange={(d: any) => {
                        const v = moment(d).format('YYYY-MM-DD')
                        console.log('date change::', d, v)
                        this.syncSearchData({
                          startTime: v
                        })
                      }}
                    />
                  )}
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
