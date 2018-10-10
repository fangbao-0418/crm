import React from 'react'
import { Table, Button } from 'antd'
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
  public state: States = {
    dataSource: [],
    selectedRowKeys: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 15
    }
  }
  public pageSizeOptions = ['15', '30', '50', '80', '100', '200']
  public params: Open.SearchProps = {}
  public paramsleft: Open.SearchProps = {}
  public paramsright: Open.SearchProps = {}
  public data: ConditionOptionProps[] = [
    {
      field: 'date',
      value: '',
      label: ['释放时间', '创建时间', '最后跟进时间'],
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
    }
  ]
  public columns: ColumnProps<DetailProps>[] = [{
    title: '客户名称',
    dataIndex: 'customerName',
    render: (val, record) => {
      return (
        <a onClick={this.show.bind(this, record.id)}>{val}</a>
      )
    }
  }, {
    title: '联系人',
    dataIndex: 'contactPerson'
  }, {
    title: '联系电话',
    dataIndex: 'contactPhone'
  }, {
    title: '意向度',
    dataIndex: 'tagIntention',
    render: (val) => {
      return (APP.dictionary[`EnumIntentionality-${val}`])
    }
  }, {
    title: '电话状态',
    dataIndex: 'tagTelephoneStatus',
    render: (val) => {
      return (APP.dictionary[`EnumContactStatus-${val}`])
    }
  }, {
    title: '空置天数',
    dataIndex: 'freeDays'
  }, {
    title: '客户来源',
    dataIndex: 'customerSource',
    render: (val) => {
      return (APP.dictionary[`EnumContactSource-${val}`])
    }
  }, {
    title: '释放次数',
    dataIndex: 'releaseNums'
  }, {
    title: '释放销售',
    dataIndex: 'lastReleaseSalesperson'
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    render: (val) => {
      return (moment(val).format('YYYY-MM-DD'))
    }
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
    this.params = $.extend(true, {}, this.paramsleft, this.paramsright)
    const params = _.cloneDeep(this.params)
    const pagination = this.state.pagination
    params.pageSize = pagination.pageSize
    params.pageCurrent = pagination.current
    fetchList(params).then((res) => {
      pagination.total = res.pageTotal
      this.setState({
        pagination,
        dataSource: res.data
      })
    })
  }
  public handlePageChange (page: number) {
    const { pagination } = this.state
    pagination.current = page
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
    this.setState({
      pagination
    }, () => {
      this.fetchList()
    })
  }
  public handleSearch (values: any) {
    this.paramsleft = {}
    let beginTime
    let endTime
    if (!values.date.value) {
      beginTime = ''
      endTime = ''
    } else if (values.date.value.indexOf('至') > -1) {
      beginTime = values.date.value.split('至')[0]
      endTime = values.date.value.split('至')[1]
    } else {
      beginTime = moment().format('YYYY-MM-DD')
      endTime = moment().startOf('day').add(values.date.value, 'day').format('YYYY-MM-DD')
    }
    if (values.date.label === '释放时间') {
      this.paramsleft.lastReleaseTimeBegin = beginTime
      this.paramsleft.lastReleaseTimeEnd = endTime
    } else if (values.date.label === '创建时间') {
      this.paramsleft.createBeginDate = beginTime
      this.paramsleft.createEndDate = endTime
    } else if (values.date.label === '最后跟进') {
      this.paramsleft.lastTrackTimeBegin = beginTime
      this.paramsleft.lastTrackTimeEnd = endTime
    }
    this.paramsleft.intention = values.intention.value
    this.paramsleft.telephoneStatus = values.telephoneStatus.value
    this.fetchList()
  }
  public handleSearchType (values: any) {
    this.paramsright = {}
    switch (values.key) {
    case '0':
      this.paramsright.customerName = values.value
      break
    case '1':
      this.paramsright.contactPerson = values.value
      break
    case '2':
      this.paramsright.customerSource = values.value
      break
    case '3':
      this.paramsright.lastReleaseSalesperson = values.value
      break
    case '4':
      this.paramsright.contactPhone = values.value
      break
    case '5':
      this.paramsright.payTaxesNature = values.value
      break
    case '6':
      this.paramsright.busSeaMemo = values.value
      break
    }
    this.fetchList()
  }
  public onSelectAllChange (selectedRowKeys: string[]) {
    this.setState({ selectedRowKeys })
  }
  public show (customerId: string) {
    const modal = new Modal({
      style: 'width: 840px',
      content: (
        <Provider><Detail customerId={customerId} isOpen={true}/></Provider>
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
      title: '删除',
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
        <div className='mb12' style={{ overflow: 'hidden' }}>
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
                { value: '0', label: '客户名称'},
                { value: '1', label: '联系人'},
                { value: '2', label: '客户来源'},
                { value: '3', label: '释放销售'},
                { value: '4', label: '联系电话'},
                { value: '5', label: '纳税类别'},
                { value: '6', label: '释放原因'}
              ]}
              placeholder={''}
              onKeyDown={(e, val) => {
                if (e.keyCode === 13) {
                  console.log(val, 'onKeyDown')
                  this.handleSearchType(val)
                }
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
            showTotal (total) {
              return `共计 ${total} 条`
            }
          }}
        />
        <div>
          <Button type='primary' className='mr10' onClick={this.pickCustomer.bind(this)}>批量抢客户</Button>
          <Button type='primary' className='mr10' onClick={this.deleteAll.bind(this)}>批量删除</Button>
        </div>
      </ContentBox>
    )
  }
}
export default Main
