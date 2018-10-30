import React from 'react'
import { DatePicker, Input, Form, Select, Row, Col } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import classNames from 'classnames'
import moment from 'moment'
import Area from './Area'
import Service from '@/modules/outsite/services'
import _ from 'lodash'
const { RangePicker } = DatePicker
type Map<T> = OutSide.Map<T>
const FormItem = Form.Item
const Search = Input.Search
const styles = require('@/modules/outsite/styles/list')
interface Props extends FormComponentProps {
  tab?: string,
  onSearch?: (data: OutSide.SearchPayload) => void
}
// 搜索表单
class Main extends React.Component<Props, any> {
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
        PENDING: '待审批',
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
      templateId: '',
      subTemplateId: '',
      userName: '', // 外勤人员
      status: '',
      orgId: '',
      startTime: ''
    }
  }
  public throttleChange = _.throttle(this.onChange.bind(this), 1000)
  public componentWillMount () {
    this.getTplTaskList()
    this.setCurrentStatusDict()
  }

  public componentWillReceiveProps (props: any) {
    this.setCurrentStatusDict(props.tab)
    if (props.tab !== this.props.tab) {
      const { searchData } = this.state
      searchData.status = undefined
      this.setState({
        searchData
      })
    }
  }

  // 设置当前的状态字典
  public setCurrentStatusDict (tab: any = '') {
    const { statusGroup } = this.state
    tab = tab ? tab : this.props.tab
    this.setState({
      statusDict: statusGroup[tab]
    })
  }

  // 获取全部任务
  public getTplTaskList () {
    Service.getTplList().then((data) => {
      if (!data) {
        return
      }
      const tplTaskMap: Map<string> = {}
      const tplSubGroup: Map<OutSide.SubTaskItem[]> = {}
      data.map((item: OutSide.TaskItem, index: number) => {
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
      // const tplSubData: Array<OutSide.TaskItem[]> = []
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
  public createTaskNameOptions (options: Array<any>, key: string = 'id') {
    return options.map((item: any) => {
      return (
        <Select.Option
          key={`option-${item[key]}`}
          value={item[key]}
        >
          {item.name}
        </Select.Option>
      )
    })
  }

  // 同步搜索表单数据
  public syncSearchData (data: OutSide.SearchPayload) {
    const { searchData } = this.state
    this.setState({
      searchData: Object.assign({}, searchData, data)
    }, () => {
      this.hookCallback()
    })
  }

  // 搜索提交
  public onChange (e: Event) {
    if (e) {
      e.preventDefault()
    }
    this.props.form.validateFields((err: any, values: any) => {
      const vals: Map<any> = {}
      _.map(values, (val: any, key: any) => {
        // if (val) {
        vals[key] = val
        // }
      })
      vals.userName = vals.personName
      delete vals.personName
      const searchData = Object.assign({}, this.state.searchData, vals)
      this.setState({
        searchData
      }, () => {
        this.hookCallback()
      })
    })
  }

  // 挂父组件回调
  public hookCallback () {
    if (this.props.onSearch) {
      this.props.onSearch(_.cloneDeep(this.state.searchData))
    }
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
    const { getFieldDecorator } = this.props.form
    const { searchData } = this.state
    return (
    <div className='t-search-form'>
      <Form
        layout='inline'
        style={{width: '80%'}}
        onChange={this.throttleChange.bind(this)}
        // onSubmit={this.props.onSearch}
      >
        <FormItem>
        {getFieldDecorator(`customerName`, {
          rules: [{
            required: false,
            message: ''
          }]
        })(
          <Search
            placeholder='请输入客户或联系人名称'
            style={{width: '200px'}}
            onSearch={() => {
              this.hookCallback()
            }}
          />
        )}
        </FormItem>
        <FormItem>
        {getFieldDecorator(`templateId`, {
          rules: [{
            required: false,
            message: ''
          }]
        })(
          <Select
            style={{width: '120px'}}
            onChange={(value: number) => {
              this.syncSearchData({
                templateId: value
              })
              const sublist = this.state.tplSubGroup[value]
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
        {getFieldDecorator(`subTemplateId`, {
          rules: [{
            required: false,
            message: ''
          }]
        })(
          <Select
            style={{width: '140px'}}
            onChange={(value: number) => {
              this.syncSearchData({
                subTemplateId: value
              })
            }}
            placeholder='全部当前子任务'
          >
            {this.createTaskNameOptions(
              this.state.searchData.templateId ? this.state.tplSubList : this.state.tplSubData, this.state.searchData.templateId ? 'subId' : 'id'
            )}
          </Select>
        )}
        </FormItem>

        <div className={styles.extshow} style={{marginTop: '5px'}}>
          <span onClick={this.setExtshow.bind(this)} className={styles.searchico}>
            <i className={classNames('fa', this.state.extshow ? 'fa-angle-double-down' : 'fa-angle-double-up')} aria-hidden='true'></i>
          </span>
          <div
            className={`mt10 ${styles.extcontent} ${this.state.extshow ? styles.show : styles.hide}`}
            style={{width: '450px'}}
          >
            <Row>
              <Col span={12}>
                <FormItem>
                  {getFieldDecorator(`personName`, {
                    rules: [{
                      required: false,
                      message: ''
                    }]
                  })(
                    <Search
                      placeholder='请输入外勤人员'
                      onSearch={() => {
                        this.onChange(null)
                      }}
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem>
                {getFieldDecorator(`status`, {
                  valuePropName: searchData.status,
                  rules: [{
                    required: false,
                    message: ''
                  }]
                })(
                  <Select
                    style={{width: '140px'}}
                    value={this.state.searchData.status}
                    onChange={(status: any) => {
                      if (status === 'PENDING') {
                        this.syncSearchData({
                          statusArray: 'CANCELPENDING,REJECTPENDING,SUBMITED',
                          status: ''
                        })
                      } else {
                        this.syncSearchData({
                          status
                        })
                      }
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
                    <Area
                      style={{width: '148px'}}
                      placeholder='选择所属区县'
                      onChange={(value) => {
                        let orgId: any
                        if (value.key !== 'all') {
                          orgId = value.key
                        }
                        this.syncSearchData({
                          orgId
                        })
                      }}
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem>
                  <RangePicker
                    // format='YY-MM-DD'
                    style={{width: '100%'}}
                    onChange={(current) => {
                      if (current.length === 0) {
                        this.syncSearchData({
                          toTime: undefined,
                          fromTime: undefined
                        })
                        return
                      }
                      this.syncSearchData({
                        toTime: current[0].format('YYYY-MM-DD'),
                        fromTime: current[1].format('YYYY-MM-DD')
                      })
                    }}
                  />
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
