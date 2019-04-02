import React from 'react'
import { Table, Tooltip, Button } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import ContentBox from '@/modules/common/content'
import moment from 'moment'
import _ from 'lodash'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import { getReadyCustomerList, getExportDistributionDataURL } from './api'
import { deleteCustomer } from '@/modules/customer/api'
import SearchName from '@/modules/common/search/SearchName'
import SelectSearch from './SelectSearch'
import Modal from 'pilipa/libs/modal'
import Provider from '@/components/Provider'
import Detail from '@/modules/customer/detail'
import AddButton from '@/modules/common/content/AddButton'
import { changeCustomerDetailAction } from '@/modules/customer/action'
const all = [{
  label: '全部',
  value: ''
}]
interface States {
  extshow: boolean
  dataSource: ReadyCustomer.DetailProps[]
  pagination: {
    total: number
    current: number
    pageSize: number
  }
}
export default class Main extends React.Component<null, States> {
  public params: ReadyCustomer.ParamsProps = {
    pageCurrent: 1,
    pageSize: 15
  }
  public pageSizeOptions = ['15', '30', '50', '80', '100', '200']
  public data: ConditionOptionProps[] = [
    {
      field: 'date',
      value: 'all',
      label: ['分配时间', '创建时间'],
      options: [
        {
          label: '全部',
          value: 'all'
        },
        {
          label: '今天',
          value: '1'
        },
        {
          label: '7天',
          value: '7'
        },
        {
          label: '30天',
          value: '30'
        }
      ],
      type: 'date'
    },
    {
      label: ['意向度'],
      value: '',
      field: 'intention',
      options: all.concat(APP.keys.EnumIntentionality)
    },
    {
      field: 'telephoneStatus',
      value: '',
      label: ['电话状态'],
      options: all.concat(APP.keys.EnumContactStatus)
    }
  ]
  public columns: ColumnProps<ReadyCustomer.DetailProps>[] = [{
    title: '客户名称',
    dataIndex: 'customerName',
    width: 200,
    render: (val, record, index) => {
      return (
        <span className='href' onClick={this.show.bind(this, record, index)}>{val}</span>
      )
    }
  }, {
    title: '联系人',
    dataIndex: 'contactPerson'
  }, {
    title: (
      <span>
        空置天数
        <Tooltip placement='top' title='客户未被跟进的天数'>
          <i className='fa fa-info-circle ml5' style={{color: '#C9C9C9'}}></i>
        </Tooltip>
      </span>
    ),
    dataIndex: 'vacantDays'
  }, {
    title: '客户来源',
    dataIndex: 'customerSource',
    render: (val) => {
      return (APP.dictionary[`EnumCustomerSource-${val}`])
    }
  }, {
    title: '当前机构',
    width: 200,
    dataIndex: 'agencyName'
  }, {
    title: (
      <span>
        客户状态
        <Tooltip placement='top' title='公海: 客户在公海里; 跟进中:已分配到销售负责跟进和签约; 已签约:客户已成功签约; 已删除: 客户没成交且已被销售删除;'>
          <i className='fa fa-info-circle ml5' style={{color: '#C9C9C9'}}></i>
        </Tooltip>
      </span>
    ),
    dataIndex: 'lifeCycle',
    render: (text) => {
      return (
        <span>{APP.dictionary[`EnumCustomerLiftCycle-${text}`]}</span>
      )
    }
  }, {
    title: '分配时间',
    dataIndex: 'distributionTime',
    render: (val) => {
      return val ? moment(val).format('YYYY-MM-DD') : ''
    }
  }]
  public state: States = {
    extshow: false,
    dataSource: [],
    pagination: {
      total: 0,
      current: this.params.pageCurrent,
      pageSize: this.params.pageSize
    }
  }
  public componentWillMount () {
    this.fetchList()
  }
  public fetchList () {
    const pagination = this.state.pagination
    return getReadyCustomerList(this.params).then((res) => {
      pagination.total = res.pageTotal
      pagination.pageSize = res.pageSize
      pagination.current = res.pageCurrent
      this.setState({
        pagination,
        dataSource: res.data
      })
      return res
    })
  }
  public handleSearch (values: any) {
    console.log(values, 'values')
    this.params.distributionBeginDate = undefined
    this.params.distributionEndDate = undefined
    this.params.createBeginDate = undefined
    this.params.createEndDate = undefined
    if (values.date.label === '分配时间') {
      let starttime
      let endtime
      if (values.date.value === 'all') {
        starttime = undefined
        endtime = undefined
      } else if (values.date.value.indexOf('至') > -1) {
        starttime = values.date.value.split('至')[0]
        endtime = values.date.value.split('至')[1]
      } else {
        starttime = moment().startOf('day').subtract(values.date.value - 1, 'day').format('YYYY-MM-DD')
        endtime = moment().format('YYYY-MM-DD')
      }
      this.params.distributionBeginDate = starttime
      this.params.distributionEndDate = endtime
    } else if (values.date.label === '创建时间') {
      let createBeginDate
      let createEndDate
      if (values.date.value === 'all') {
        createBeginDate = undefined
        createEndDate = undefined
      } else if (values.date.value.indexOf('至') > -1) {
        createBeginDate = values.date.value.split('至')[0]
        createEndDate = values.date.value.split('至')[1]
      } else {
        createBeginDate = moment().startOf('day').subtract(values.date - 1, 'day').format('YYYY-MM-DD')
        createEndDate = moment().format('YYYY-MM-DD')
      }
      this.params.createBeginDate = createBeginDate
      this.params.createEndDate = createEndDate
    }
    this.params.intention = values.intention.value || undefined
    this.params.telephoneStatus = values.telephoneStatus.value || undefined
    this.params.pageCurrent = 1
    this.fetchList()
  }
  public handleSearchType (value: {value?: string, key: string}) {
    this.params.customerName = undefined
    this.params.contactPerson = undefined
    this.params[value.key] = value.value
    this.params.pageCurrent = 1
    this.fetchList()
  }
  public handleSelectType (values: any) {
    this.params.customerSource = values.customerSource || undefined
    this.params.agencyId = values.agencyId || undefined
    this.params.lifeCycle = values.lifeCycle || undefined
    this.params.cityCode = values.cityCode || undefined
    this.params.pageCurrent = 1
    this.fetchList()
  }
  // 搜索框折叠
  public handleSwitch () {
    this.setState({
      extshow: !this.state.extshow
    })
  }
  public handlePageChange (page: number) {
    const { pagination } = this.state
    pagination.current = page
    this.params.pageCurrent = page
    this.setState({
      pagination
    }, () => {
      this.fetchList()
    })
  }
  public onShowSizeChange (current: number, size: number) {
    const { pagination } = this.state
    pagination.current = current
    pagination.pageSize = size
    this.params.pageCurrent = current
    this.params.pageSize = size
    this.setState({
      pagination
    }, () => {
      this.fetchList()
    })
  }
  public show (record: ReadyCustomer.DetailProps, index: number) {
    const searchPayload = this.params
    let dataSource: ReadyCustomer.DetailProps[] = []
    let customerId = record.customerId
    let instance: any
    const modal: any = new Modal({
      content: (
        <Provider>
          <Detail
            getWrappedInstance={(ins) => {
              instance = ins
            }}
            onClose={() => {
              modal.hide()
              this.fetchList()
            }}
            customerId={customerId}
            footer={(
              <div className='text-right mt10'>
                <Button
                  type='ghost'
                  hidden={!APP.hasPermission('crm_customer-pool-distribution_detail_save')}
                  className='mr5'
                  onClick={() => {
                    instance.save().then(() => {
                      APP.success('保存成功')
                      this.fetchList()
                    }, () => {
                      APP.error('保存失败')
                    })
                  }}
                >
                  保存
                </Button>
                <Button
                  type='ghost'
                  className='mr5'
                  hidden={!APP.hasPermission('crm_customer-pool-distribution_detail_delete')}
                  onClick={() => {
                    deleteCustomer(customerId).then(() => {
                      APP.success('删除成功')
                      this.fetchList().then((res) => {
                        const page = Math.ceil(res.pageTotal / res.pageSize)
                        if (page < this.params.pageCurrent) {
                          modal.hide()
                          return
                        }
                        dataSource = res.data
                        if (dataSource instanceof Array && dataSource[index]) {
                          customerId = dataSource[index].customerId
                          changeCustomerDetailAction(customerId)
                        } else {
                          modal.hide()
                        }
                      })
                    })
                  }}
                >
                  删除
                </Button>
                <Button
                  type='ghost'
                  className='mr5'
                  onClick={() => {
                    instance.save().then(() => {
                      index -= 1
                      if (index === -1) {
                        if (searchPayload.pageCurrent === 1) {
                          modal.hide()
                          return
                        }
                        index = searchPayload.pageSize - 1
                        searchPayload.pageCurrent -= 1
                        dataSource = []
                      }
                      if (dataSource.length === 0) {
                        this.fetchList().then((res) => {
                          dataSource = res.data || []
                          changeCustomerDetailAction(dataSource[index].customerId)
                        })
                      } else {
                        changeCustomerDetailAction(dataSource[index].customerId)
                      }
                    }, () => {
                      APP.error('保存失败')
                    })
                  }}
                >
                  上一页
                </Button>
                <Button
                  type='ghost'
                  onClick={() => {
                    instance.save().then(() => {
                      index += 1
                      if (index >= searchPayload.pageSize) {
                        searchPayload.pageCurrent += 1
                        dataSource = []
                        index = 0
                      }
                      if (dataSource.length === 0) {
                        this.fetchList().then((res) => {
                          if (res.pageCurrent > Math.ceil(res.pageTotal / res.pageSize)) {
                            searchPayload.pageCurrent -= 1
                            modal.hide()
                            return
                          }
                          dataSource = res.data || []
                          changeCustomerDetailAction(dataSource[index].customerId)
                        })
                      } else {
                        if (dataSource[index] === undefined) {
                          modal.hide()
                          return
                        }
                        changeCustomerDetailAction(dataSource[index].customerId)
                      }
                    }, () => {
                      APP.error('保存失败')
                    })
                  }}
                >
                  下一页
                </Button>
              </div>
            )}
          />
        </Provider>
      ),
      footer: null,
      header: null,
      mask: true,
      onCancel: () => {
        this.fetchList()
        modal.hide()
      }
    })
    modal.show()
  }
  public export () {
    const params: ReadyCustomer.ParamsProps = _.cloneDeep(this.params)
    delete params.pageCurrent
    delete params.pageSize
    for (let key in params) {
      console.log(params[key])
      if (!params[key]) {
        delete params[key]
      }
    }
    const url = getExportDistributionDataURL(params)
    APP.fn.downFile(url)
  }
  public render () {
    const { pagination } = this.state
    return (
      <ContentBox
        title='已分配'
        rightCotent={(
          <AddButton
            icon={<APP.Icon type='export' size={15} />}
            hidden={!APP.hasPermission('crm_customer_list_upload')}
            title='导出'
            onClick={() => {
              this.export()
            }}
          />
        )}
      >
        <div className='mb12'>
          <Condition
            dataSource={this.data}
            onChange={this.handleSearch.bind(this)}
          />
          <div>
            <APP.Icon
              style={{float: 'right', marginTop: -20}}
              onClick={this.handleSwitch.bind(this)}
              type={this.state.extshow ? 'up' : 'down'}
            />
          </div>
          <div style={this.state.extshow ? {display:'block'} : {display: 'none'}}>
            <div style={{display: 'inline-block', width: 290, verticalAlign: 'bottom', marginLeft: 20}}>
              <SearchName
                style={{paddingTop: '5px'}}
                options={[
                  { value: 'customerName', label: '客户名称' },
                  { value: 'contactPerson', label: '联系人' },
                  { value: 'contactPhone', label: '联系电话' }
                ]}
                placeholder={''}
                onKeyDown={(e, val) => {
                  if (e.keyCode === 13) {
                    this.handleSearchType(val)
                  }
                }}
                onSearch={(val) => {
                  this.handleSearchType(val)
                }}
              />
            </div>
            <SelectSearch
              onChange={(values) => {
                console.log(values, 'values')
                this.handleSelectType(values)
              }}
            />
          </div>
        </div>
        <Table
          columns={this.columns}
          dataSource={this.state.dataSource}
          rowKey={'customerId'}
          pagination={{
            onChange: this.handlePageChange.bind(this),
            onShowSizeChange: this.onShowSizeChange.bind(this),
            total: pagination.total,
            current: pagination.current,
            pageSize: pagination.pageSize,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: this.pageSizeOptions,
            size: 'small',
            showTotal (total) {
              return `共计 ${total} 条`
            }
          }}
        />
      </ContentBox>
    )
  }
}
