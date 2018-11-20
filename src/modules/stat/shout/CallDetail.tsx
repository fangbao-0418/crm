import React from 'react'
import { Table, Input, Select } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { getCallDetail, getSaller } from '@/modules/stat/api'
import moment from 'moment'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
const styles = require('./style')
interface State {
  expandedRowKeys: string[]
  dataSource: CrmStat.CallDetailItemProps[]
  pagination: {
    pageSize: number,
    pageCurrent: number,
    total: number
  },
  saller: Array<{id: string, name: string}>
}
class Main extends React.Component<{}, State> {
  public CallConnectStatus = APP.keys.EnumCallConnectStatus
  public HangUpStatus = APP.keys.EnumHangUpStatus
  public payload: {
    callConnectStatus?: number,
    keyword?: string,
    hangUpStatus?: number,
    salespersonId?: number
    callTimeBeginDate?: string,
    callTimeEndDate?: string,
    pageSize: number,
    pageCurrent: number
  } = {
    pageSize: 15,
    pageCurrent: 1
  }
  public state: State = {
    saller: [],
    expandedRowKeys: [],
    dataSource: [],
    pagination: {
      pageCurrent: this.payload.pageCurrent,
      pageSize: this.payload.pageSize,
      total: 0
    }
  }
  public condition: ConditionOptionProps[] = [
    {
      field: 'date',
      label: ['时间'],
      type: 'date',
      options: [{
        label: '今日',
        value: '0'
      }, {
        label: '昨日',
        value: '-1'
      }, {
        label: '7天',
        value: '-7'
      }, {
        label: '30天',
        value: '-30'
      }]
    }
  ]
  public columns: ColumnProps<CrmStat.CallDetailItemProps>[] = [
    {
      title: '时间',
      dataIndex: 'callTime',
      render: (text) => {
        return moment(text).format('YYYY-MM-DD hh:mm:ss')
      }
    },
    {
      title: '呼叫号码',
      dataIndex: 'telephone'
    },
    {
      title: '归属地',
      dataIndex: 'phoneAddress'
    },
    {
      title: '呼叫类型',
      dataIndex: 'callType',
      render: (text) => {
        return APP.dictionary[`EnumCallType-${text}`]
      }
    },
    {
      title: '电话状态',
      dataIndex: 'callConnectStatus',
      render: (text) => {
        return APP.dictionary[`EnumCallConnectStatus-${text}`]
      }
    },
    {
      title: '联系人',
      dataIndex: 'contactName'
    },
    {
      title: '客户名称',
      dataIndex: 'customerName'
    },
    {
      title: '通话时长',
      dataIndex: 'callDuration',
      render: (text) => {
        return APP.fn.formatDuration(text)
      }
    },
    {
      title: '坐席',
      dataIndex: 'salespersonName'
    },
    {
      title: '小组',
      dataIndex: 'salepersonGroupName'
    },
    {
      title: '操作',
      render: (text, record) => {
        return (
          <span>
            <i
              className='fa fa-headphones mr10 href'
              onClick={() => {
                this.setState({
                  expandedRowKeys: [record.id]
                })
              }}
            />
            <i
              className='fa fa-download href'
              onClick={() => {
                window.open(record.mediaUrl)
              }}
            />
          </span>
        )
      }
    }
  ]
  public componentDidMount () {
    getSaller().then((res) => {
      this.setState({
        saller: res
      })
    })
    this.fetchList()
  }
  public fetchList () {
    const { pagination } = this.state
    return getCallDetail(this.payload).then((res) => {
      pagination.pageCurrent = res.pageCurrent
      pagination.pageSize = res.pageSize
      pagination.total = res.pageTotal
      this.setState({
        dataSource: res.data,
        pagination
      })
    })
  }
  public onDateChange (value: {[field: string]: {label: string, value: string}}) {
    if (value.date.value.split('至').length === 2) {
      this.payload.callTimeBeginDate = value.date.value.split('至')[0]
      this.payload.callTimeEndDate = value.date.value.split('至')[1]
    } else {
      this.payload.callTimeBeginDate = moment().add(value.date.value, 'day').format('YYYY-MM-DD')
      this.payload.callTimeEndDate = moment().format('YYYY-MM-DD')
    }
    this.fetchList()
  }
  public render () {
    const { pagination, expandedRowKeys } = this.state
    return (
      <div className={styles['call-detail']}>
        <Condition
          style={{marginLeft: -36}}
          onChange={this.onDateChange.bind(this)}
          dataSource={this.condition}
        />
        <div
          className='mb10'
        >
          <Input.Search
            style={{width: 200}}
            className='inline-block mr8'
            placeholder='客户名称/联系人/呼叫号码'
            onSearch={(value) => {
              this.payload.keyword = value
              this.fetchList()
            }}
          />
          <Select
            className='inline-block mr8'
            style={{width: 120}}
            placeholder='请选择呼叫人员'
            onChange={(value: any) => {
              this.payload.salespersonId = value
              this.fetchList()
            }}
          >
            {
              this.state.saller.map((item) => {
                return (
                  <Select.Option key={item.id}>{item.name}</Select.Option>
                )
              })
            }
          </Select>
          <Select
            className='inline-block mr8'
            style={{width: 120}}
            placeholder='请选择接通状态'
            onChange={(value: number) => {
              this.payload.callConnectStatus = value
              this.fetchList()
            }}
          >
            {
              this.CallConnectStatus.map((item) => {
                return (
                  <Select.Option key={item.value}>{item.label}</Select.Option>
                )
              })
            }
          </Select>
          <Select
            className='inline-block'
            style={{width: 120}}
            placeholder='请选择挂断状态'
            onChange={(value: number) => {
              this.payload.hangUpStatus = value
              this.fetchList()
            }}
          >
            {
              this.HangUpStatus.map((item) => {
                return (
                  <Select.Option key={item.value}>{item.label}</Select.Option>
                )
              })
            }
          </Select>
        </div>
        <Table
          rowKey='id'
          expandedRowKeys={this.state.expandedRowKeys}
          defaultExpandAllRows={true}
          columns={this.columns}
          dataSource={this.state.dataSource}
          expandedRowRender={(record) => {
            return (
              record.id === expandedRowKeys[0] && (
                <div
                  className='text-right'
                  style={{height: 54}}
                >
                  <audio
                    autoPlay={true}
                    controls={true}
                    src={record.mediaUrl}
                  />
                  <span
                    className={styles.close}
                    onClick={() => {
                      this.setState({
                        expandedRowKeys: []
                      })
                    }}
                  >
                    ×
                  </span>
                </div>
              )
            )
          }}
          pagination={{
            total: pagination.total,
            pageSize: pagination.pageSize,
            current: pagination.pageCurrent,
            onChange: (current) => {
              this.payload.pageCurrent = current
              this.fetchList()
            },
            showTotal: (total) => {
              return `共计 ${total} 条`
            },
            showQuickJumper: true,
            showSizeChanger: true,
            onShowSizeChange: (current, pageSize) => {
              this.payload.pageCurrent = 1
              this.payload.pageSize = pageSize
              this.fetchList()
            },
            pageSizeOptions: ['15', '30', '50', '80', '100', '200']
          }}
        />
      </div>
    )
  }
}
export default Main
