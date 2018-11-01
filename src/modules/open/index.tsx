import React from 'react'
import { Table, Button, Tooltip } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import ContentBox from '@/modules/common/content'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import SearchName from '@/modules/common/search/SearchName'
import Modal from 'pilipa/libs/modal'
import { fetchList, pickCustomer } from './api'
import { deleteCustomer } from '@/modules/customer/api'
import Provider from '@/components/Provider'
import Detail from '@/modules/customer/detail'
import _ from 'lodash'
import moment from 'moment'
const styles = require('@/modules/business/style')
import { changeCustomerDetailAction } from '@/modules/customer/action'
type DetailProps = Open.DetailProps
interface States {
  dataSource: DetailProps[]
  selectedRowKeys: string[]
  pagination: {
    total: number
    current: number
    pageSize: number
  }
}
const all = [{
  label: '全部',
  value: ''
}]
class Main extends React.Component {
  public params: Open.SearchProps = {
    pageCurrent: 1,
    pageSize: 15
  }
  public state: States = {
    dataSource: [],
    selectedRowKeys: [],
    pagination: {
      total: 0,
      current: this.params.pageCurrent,
      pageSize: this.params.pageSize
    }
  }
  public pageSizeOptions = ['15', '30', '50', '80', '100', '200']
  public data: ConditionOptionProps[] = [
    {
      field: 'date',
      value: '',
      label: ['释放时间', '创建时间', '最后跟进'],
      options: [
        {
          label: '全部',
          value: ''
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
    },
    {
      label: ['纳税类别'],
      value: '',
      field: 'payTaxesNature',
      type: 'select',
      options: all.concat(APP.keys.EnumPayTaxesNature)
    },
    {
      label: ['客户来源'],
      value: '',
      field: 'customerSource',
      type: 'select',
      options: all.concat(APP.keys.EnumCustomerSource)
    }
  ]
  public columns: ColumnProps<DetailProps>[] = [{
    title: '客户名称',
    dataIndex: 'customerName',
    render: (val, record, index) => {
      return (
        <span>
          <span
            className='href'
            onClick={this.show.bind(this, record, index)}
          >
            {val}
          </span>
          {
            !record.lastTrackTime &&
            <span className={styles['new-point']}>新</span>
          }
        </span>
      )
    }
  }, {
    title: '联系人',
    dataIndex: 'contactPerson'
  }, {
    title: '意向度',
    dataIndex: 'tagIntention',
    render: (val) => {
      return (APP.dictionary[`EnumIntentionality-${val}`])
    }
  }, {
    title: '空置天数',
    dataIndex: 'freeDays'
  }, {
    title: '客户来源',
    dataIndex: 'customerSource',
    render: (val) => {
      return (APP.dictionary[`EnumCustomerSource-${val}`])
    }
  }, {
    title: (
      <span>
        释放次数
        <Tooltip placement='top' title='客户被释放到公海的总次数'>
          <i className='fa fa-exclamation-circle ml5'></i>
        </Tooltip>
      </span>
    ),
    dataIndex: 'releaseNums'
  }, {
    title: (
      <span>
        释放销售
        <Tooltip placement='top' title='客户最后一次被释放到公海时的销售'>
          <i className='fa fa-exclamation-circle ml5'></i>
        </Tooltip>
      </span>
    ),
    dataIndex: 'lastReleaseSalesperson'
  }, {
    title: '释放时间',
    dataIndex: 'lastReleaseTime',
    render: (val) => {
      return (moment(val).format('YYYY-MM-DD'))
    }
  }]
  public componentWillMount () {
    this.fetchList()
  }
  public fetchList () {
    const pagination = this.state.pagination
    return fetchList(this.params).then((res) => {
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
  public handleSearch (values: any) {
    console.log(values, 'values')
    this.params.lastReleaseTimeBegin = undefined
    this.params.lastReleaseTimeEnd = undefined
    this.params.createBeginDate = undefined
    this.params.createEndDate = undefined
    this.params.lastTrackTimeBegin = undefined
    this.params.lastTrackTimeEnd = undefined
    let beginTime
    let endTime
    if (!values.date.value) {
      beginTime = undefined
      endTime = undefined
    } else if (values.date.value.indexOf('至') > -1) {
      beginTime = values.date.value.split('至')[0]
      endTime = values.date.value.split('至')[1]
    } else {
      beginTime = moment().startOf('day').subtract(values.date.value - 1, 'day').format('YYYY-MM-DD')
      endTime = moment().format('YYYY-MM-DD')
    }
    if (values.date.label === '释放时间') {
      this.params.lastReleaseTimeBegin = beginTime
      this.params.lastReleaseTimeEnd = endTime
    } else if (values.date.label === '创建时间') {
      this.params.createBeginDate = beginTime
      this.params.createEndDate = endTime
    } else if (values.date.label === '最后跟进') {
      this.params.lastTrackTimeBegin = beginTime
      this.params.lastTrackTimeEnd = endTime
    }
    this.params.payTaxesNature = values.payTaxesNature.value || undefined
    this.params.customerSource = values.customerSource.value || undefined
    this.params.intention = values.intention.value || undefined
    this.params.telephoneStatus = values.telephoneStatus.value || undefined
    this.fetchList()
  }
  public handleSearchType (values: any) {
    console.log(values, 'values')
    this.params.customerName = undefined
    this.params.contactPerson = undefined
    this.params.contactPhone = undefined
    this.params.lastReleaseSalesperson = undefined
    this.params.busSeaMemo = undefined
    this.params[values.key] = values.value || undefined
    this.fetchList()
  }
  public onSelectAllChange (selectedRowKeys: string[]) {
    this.setState({ selectedRowKeys })
  }
  public show (record: DetailProps, index: number) {
    let customerId = record.id
    let dataSource: DetailProps[] = []
    const searchPayload = this.params
    const modal = new Modal({
      content: (
        <Provider>
          <Detail
            customerId={customerId}
            type='open'
            onClose={() => modal.hide()}
            footer={(
              <div className='mt10'>
                <div style={{ display: 'inline-block', width: 160, marginLeft: 450}}>
                  <Button
                    type='primary'
                    hidden={!APP.hasPermission('crm_sea_manage_grab_customer')}
                    className='mr5'
                    onClick={() => {
                      pickCustomer({
                        customerIdArr: [customerId]
                      }).then(() => {
                        APP.success('抢客户操作成功')
                        this.fetchList().then((res) => {
                          const data = res.data
                          if (data instanceof Array && data[index]) {
                            customerId = data[index].id
                            changeCustomerDetailAction(customerId)
                          } else {
                            modal.hide()
                          }
                        })
                      })
                    }}
                  >
                    抢客户
                  </Button>
                  <Button
                    type='ghost'
                    hidden={!APP.hasPermission('crm_sea_manage_delete')}
                    onClick={() => {
                      deleteCustomer(customerId).then(() => {
                        APP.success('删除成功')
                        this.fetchList().then((res) => {
                          const data = res.data
                          if (data instanceof Array && data[index]) {
                            customerId = data[index].id
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
                </div>
                <div style={{ display: 'inline-block', width: 160, marginLeft: 100}}>
                  <Button
                    type='primary'
                    onClick={() => {
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
                          changeCustomerDetailAction(dataSource[index].id)
                        })
                      } else {
                        changeCustomerDetailAction(dataSource[index].id)
                      }
                    }}
                  >
                    上一页
                  </Button>
                  <Button
                    style={{ marginLeft: 5}}
                    type='ghost'
                    onClick={() => {
                      index += 1
                      if (index >= searchPayload.pageSize) {
                        searchPayload.pageCurrent += 1
                        dataSource = []
                        index = 0
                      }
                      if (dataSource.length === 0) {
                        this.fetchList().then((res) => {
                          if (res.pageCurrent > Math.round(res.pageTotal / res.pageSize)) {
                            searchPayload.pageCurrent -= 1
                            modal.hide()
                            return
                          }
                          dataSource = res.data || []
                          changeCustomerDetailAction(dataSource[index].id)
                        })
                      } else {
                        if (dataSource[index] === undefined) {
                          modal.hide()
                          return
                        }
                        changeCustomerDetailAction(dataSource[index].id)
                      }
                    }}
                  >
                    下一页
                  </Button>
                </div>
              </div>
            )}
          />
        </Provider>
      ),
      footer: null,
      header: null,
      mask: true,
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public deleteAll () {
    if (!this.state.selectedRowKeys.length) {
      APP.error('请选择客户！')
      return false
    }
    const modal = new Modal({
      content: (
        <div>你确定要删除这些客户吗？</div>
      ),
      title: '删除客户',
      mask: true,
      onOk: () => {
        const payload = this.state.selectedRowKeys.join(',')
        deleteCustomer(payload).then(() => {
          APP.success('操作成功')
          this.fetchList()
          modal.hide()
        })
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public pickCustomer () {
    if (!this.state.selectedRowKeys.length) {
      APP.error('请选择客户！')
      return false
    }
    const modal = new Modal({
      content: (
        <div>你确定要批量抢客户吗？</div>
      ),
      title: '批量抢客户',
      mask: true,
      onOk: () => {
        const params = {
          customerIdArr: this.state.selectedRowKeys
        }
        pickCustomer(params).then(() => {
          APP.success('操作成功')
          this.fetchList()
          modal.hide()
        })
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public render () {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectAllChange.bind(this)
    }
    const { pagination } = this.state
    return (
      <ContentBox title='公海管理'>
        <div className='mb12 clear'>
          <div className='fl' style={{ width: 740 }}>
            <Condition
              dataSource={this.data}
              onChange={this.handleSearch.bind(this)}
            />
          </div>
          <div className='fr' style={{ width: 290 }}>
            <SearchName
              style={{paddingTop: '5px'}}
              options={[
                { value: 'customerName', label: '客户名称'},
                { value: 'contactPerson', label: '联系人'},
                { value: 'contactPhone', label: '联系电话'},
                { value: 'lastReleaseSalesperson', label: '释放销售'},
                { value: 'busSeaMemo', label: '释放原因'}
              ]}
              placeholder={''}
              onKeyDown={(e, val) => {
                if (e.keyCode === 13) {
                  console.log(val, 'onKeyDown')
                  this.handleSearchType(val)
                }
              }}
              onSearch={(val) => {
                this.handleSearchType(val)
              }}
            />
          </div>
        </div>
        <Table
          columns={this.columns}
          dataSource={this.state.dataSource}
          rowSelection={rowSelection}
          bordered
          rowKey={'id'}
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
        <div style={{ position: 'relative', bottom: '48px', width: '250px' }}>
          <Button disabled={this.state.selectedRowKeys.length === 0} type='primary' hidden={!APP.hasPermission('crm_sea_manage_grab_customer')} className='mr10' onClick={this.pickCustomer.bind(this)}>批量抢客户</Button>
          <Button disabled={this.state.selectedRowKeys.length === 0} type='primary' hidden={!APP.hasPermission('crm_sea_manage_delete')} className='mr10' onClick={this.deleteAll.bind(this)}>批量删除</Button>
        </div>
      </ContentBox>
    )
  }
}
export default Main
