import React from 'react'
import { Table, Button, Select, Tooltip } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import Modal from 'pilipa/libs/modal'
import ContentBox from '@/modules/common/content'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import SearchName from '@/modules/common/search/SearchName'
import Provider from '@/components/Provider'
import View from './View'
import { fetchList, toOther, fetchWorkers } from './api'
import _ from 'lodash'
import moment from 'moment'
type DetailProps = Signed.DetailProps
const Option = Select.Option
const all: any = [{
  label: '全部',
  value: undefined
}]
interface States {
  dataSource: DetailProps[]
  selectedRowKeys: string[]
  pagination: {
    total: number
    current: number
    pageSize: number
  },
  worders: Array<{id: string, name: string}>
}
class Main extends React.Component {
  public state: States = {
    dataSource: [],
    selectedRowKeys: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 15
    },
    worders: []
  }
  public pageSizeOptions = ['15', '30', '50', '80', '100', '200']
  public params: Signed.SearchProps = {}
  public paramsleft: Signed.SearchProps = {}
  public paramsright: Signed.SearchProps = {}
  public curSale: {key: string, label: string} = { key: '', label: ''}
  public data: ConditionOptionProps[] = [
    {
      field: 'date',
      label: ['入库时间', '创建时间', '预约时间'],
      options: [
        {
          label: '全部',
          value: undefined
        },
        {
          label: '今天',
          value: '0'
        },
        {
          label: '7天',
          value: '6'
        },
        {
          label: '30天',
          value: '29'
        }
      ],
      type: 'date'
    },
    {
      field: 'serviceExpire',
      label: ['即将到期'],
      options: [
        {
          label: '全部',
          value: undefined
        },
        {
          label: '一个月',
          value: '1month'
        },
        {
          label: '二个月',
          value: '2month'
        },
        {
          label: '三个月',
          value: '3month'
        }
      ],
      type: 'month'
    },
    {
      label: ['纳税类别'],
      field: 'payTaxesNature',
      options: all.concat(APP.keys.EnumPayTaxesNature)
    }
  ]
  public columns: ColumnProps<DetailProps>[] = [{
    title: '客户名称',
    dataIndex: 'customerName',
    render: (val, record) => {
      return (
        <span
          className='href'
          onClick={this.detail.bind(this, record)}
        >
          {val}
        </span>
      )
    }
  }, {
    title: '联系人',
    dataIndex: 'contactPerson'
  }, {
    title: '地区',
    dataIndex: 'area'
  }, {
    title: '跟进人',
    dataIndex: 'currentSalesperson'
  }, {
    title: '运营会计',
    dataIndex: 'operatingAccouting'
  }, {
    title: (
      <span>
        入库时间
        <Tooltip placement='top' title='成为签约客户的时间'>
          <i className='fa fa-exclamation-circle ml5'></i>
        </Tooltip>
      </span>
    ),
    dataIndex: 'enterStorageTime',
    render: (val) => {
      return (val ? moment(val).format('YYYY-MM-DD') : '')
    }
  }, {
    title: (
      <span>
        预计截至账期
        <Tooltip placement='top' title='合同到期截至服务的账期'>
          <i className='fa fa-exclamation-circle ml5'></i>
        </Tooltip>
      </span>
    ),
    dataIndex: 'endTime',
    render: (val) => {
      return (val ? moment(val).format('YYYY-MM-DD') : '')
    }
  }, {
    title: (
      <span>
        预约时间
      </span>
    ),
    dataIndex: 'appointTime',
    render: (val) => {
      return (val ? moment(val).format('YYYY-MM-DD') : '')
    }
  }, {
    title: '操作',
    render: (record) => {
      if (APP.hasPermission('crm_sign_myself_list_principals')) {
        return (
          <a onClick={this.toSale.bind(this, record.id)}>转跟进人</a>
        )
      } else {
        return (
          <span></span>
        )
      }
    }
  }]
  public componentWillMount () {
    this.fetchList()
    this.fetchAllWorker()
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
  public fetchAllWorker () {
    fetchWorkers(APP.user.companyId).then((res) => {
      this.setState({
        worders: res
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
    console.log(values, 'values')
    this.paramsleft = {}
    let beginTime
    let endTime
    if (values.date.value) {
      if (values.date.value.indexOf('至') > -1) {
        beginTime = values.date.value.split('至')[0]
        endTime = values.date.value.split('至')[1]
      } else {
        endTime = moment().format('YYYY-MM-DD')
        beginTime = moment().startOf('day').subtract(values.date.value, 'day').format('YYYY-MM-DD')
      }
    }
    if (values.date.label === '入库时间') {
      this.paramsleft.storageBeginDate = beginTime || undefined
      this.paramsleft.storageEndDate = endTime || undefined
    } else if (values.date.label === '创建时间') {
      this.paramsleft.createBeginDate = beginTime || undefined
      this.paramsleft.createEndDate = endTime || undefined
    } else if (values.date.label === '预约时间') {
      this.paramsleft.appointBeginTime = beginTime || undefined
      this.paramsleft.appointEndTime = endTime || undefined
    }
    let startmonth
    let endmonth
    if (values.serviceExpire.value) {
      if (values.serviceExpire.value.indexOf('至') > -1) {
        startmonth = moment(values.serviceExpire.value.split('至')[0]).startOf('month').format('YYYY-MM-DD')
        endmonth = moment(values.serviceExpire.value.split('至')[1]).startOf('month').format('YYYY-MM-DD')
      } else {
        const val = String(values.serviceExpire.value).slice(0, 1)
        startmonth = moment().startOf('month').format('YYYY-MM-DD')
        endmonth = moment().startOf('month').add(val, 'month').format('YYYY-MM-DD')
      }
    }
    if (values.serviceExpire.label === '即将到期') {
      this.paramsleft.serviceExpireBeginMonth = startmonth || undefined
      this.paramsleft.serviceExpireEndMonth = endmonth || undefined
    }
    this.paramsleft.payTaxesNature = values.payTaxesNature.value || undefined
    this.fetchList()
  }
  public handleSearchType (value: {key: string, value?: string}) {
    this.paramsright.customerName = undefined
    this.paramsright.contactPerson = undefined
    this.paramsright.customerSource = undefined
    this.paramsright.signSalesperson = undefined
    this.paramsright.contactPhone = undefined
    this.paramsright.operatingAccouting = undefined
    this.paramsright.areaName = undefined
    this.paramsright.currentSalesperson = undefined
    this.paramsright.contractCode = undefined
    this.paramsright[value.key] = value.value || undefined
    this.fetchList()
  }
  public toSale (id?: string) {
    console.log(id, 'id')
    if (!id && !this.state.selectedRowKeys.length) {
      APP.error('请选择客户！')
      return false
    }
    const modal = new Modal({
      content: (
        <div>
          <span>请选择跟进人：</span>
          <Select
            labelInValue
            style={{width:'200px'}}
            onChange={(val: {key: '', label: ''}) => {
              this.curSale = val
            }}
          >
            {
              this.state.worders.map((item, index) => {
                return (
                  <Option key={item.id}>{item.name}</Option>
                )
              })
            }
          </Select>
        </div>
      ),
      title: '销售',
      mask: true,
      onOk: () => {
        const params = {
          customerIdArr: id ? [id] : this.state.selectedRowKeys,
          principalsId: this.curSale.key,
          principals: this.curSale.label
        }
        toOther(params).then(() => {
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
  public detail (record: Signed.DetailProps) {
    const modal = new Modal({
      content: (
        <Provider>
          <View
            customerId={record.id}
            customerName={record.customerName}
            onClose={() => {
              this.fetchList()
              modal.hide()
            }}
          />
        </Provider>
      ),
      header: null,
      footer: null,
      mask: true,
      maskClosable: false,
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public onSelectAllChange (selectedRowKeys: string[]) {
    this.setState({ selectedRowKeys })
  }
  public render () {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectAllChange.bind(this)
    }
    const { pagination } = this.state
    return (
      <ContentBox
        title='签约客户'
      >
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
                { value: 'customerName', label: '客户名称'},
                { value: 'contactPerson', label: '联系人'},
                { value: 'customerSource', label: '客户来源'},
                { value: 'signSalesperson', label: '签单销售'},
                { value: 'contactPhone', label: '联系电话'},
                { value: 'operatingAccouting', label: '运营会计'},
                { value: 'areaName', label: '地区'},
                { value: 'currentSalesperson', label: '跟进人'},
                { value: 'contractCode', label: '合同号'}
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
        <div style={{ position: 'relative', bottom: '48px', width: '50%'}}>
          <Button type='primary' hidden={APP.hasPermission('crm_sign_myself_list_principals')} onClick={this.toSale.bind(this, '')}>转跟进人</Button>
        </div>
      </ContentBox>
    )
  }
}
export default Main
