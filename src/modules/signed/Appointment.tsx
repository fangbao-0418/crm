import React from 'react'
import { Table, Tooltip } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import Modal from 'pilipa/libs/modal'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import SelectSearch from './SelectSearch'
import SearchName from '@/modules/common/search/SearchName'
import moment from 'moment'
import Provider from '@/components/Provider'
import View from './detail'
import { fetchAppointment, fetchWorkers } from './api'

type DetailProps = Signed.DetailProps

const all: any = [{
  label: '全部',
  value: undefined
}]

interface States {
  extshow: boolean
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
    extshow: false,
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
  public data: ConditionOptionProps[] = [
    {
      field: 'appointTime',
      label: ['预约时间'],
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
    }
  ]
  public columns: ColumnProps<DetailProps>[] = [{
    title: '客户名称',
    width: 450,
    dataIndex: 'customerName',
    render: (val, record) => {
      return (
        <span className='href'>
          <span
            onClick={this.detail.bind(this, record, '1')}
          >
            {val}
          </span>
          <span>
            <img
              src={require(`@/assets/images/follow.svg`)}
              style={{marginLeft: 10}}
              hidden={!APP.hasPermission('crm_sign_myself_follow_up')}
              onClick={this.detail.bind(this, record, '5')}
            />
          </span>
        </span>
      )
    }
  }, {
    title: '联系人',
    width: 200,
    dataIndex: 'contactPerson'
  }, {
    title: '服务账期',
    width: 200,
    dataIndex: 'servePeriod'
  }, {
    title: '跟进人',
    width: 200,
    dataIndex: 'currentSalesperson'
  }, {
    title: '运营会计',
    width: 200,
    dataIndex: 'accountOpsUsers'
  }, {
    title: '签单销售',
    width: 200,
    dataIndex: 'signSalesperson'
  }, {
    title: (
      <span>
        预约时间
        <Tooltip placement='top' title='成为签约客户的时间'>
          <i className='fa fa-info-circle ml5' style={{color: '#C9C9C9'}}></i>
        </Tooltip>
      </span>
    ),
    width: 200,
    dataIndex: 'appointTime',
    render: (val) => {
      return (val ? moment(val).format('YYYY-MM-DD') : '')
    }
  }, {
    title: '地区',
    width: 200,
    dataIndex: 'area'
  }, {
    title: '所属机构',
    width: 200,
    dataIndex: 'agencyName'
  }]

  public componentWillMount () {
    this.fetchList()
    this.fetchAllWorker()
  }
  public fetchList () {
    this.params = $.extend(true, {}, this.paramsleft, this.paramsright)
    const pagination = this.state.pagination
    console.log(pagination, 'tijiao')
    this.params.pageSize = pagination.pageSize
    this.params.pageCurrent = pagination.current
    fetchAppointment(this.params).then((res) => {
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
      pagination,
      selectedRowKeys: []
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
  public onSelectAllChange (selectedRowKeys: string[]) {
    this.setState({ selectedRowKeys })
  }

  public handleSearch (values: any) {
    console.log(values, 'values')
    this.paramsleft = {}
    let beginTime
    let endTime
    if (values.appointTime.value) {
      if (values.appointTime.value.indexOf('至') > -1) {
        beginTime = values.appointTime.value.split('至')[0]
        endTime = values.appointTime.value.split('至')[1]
      } else {
        beginTime = moment().format('YYYY-MM-DD')
        endTime = moment().startOf('day').add(values.appointTime.value, 'day').format('YYYY-MM-DD')
      }
    }
    this.paramsleft.appointBeginTime = beginTime || undefined
    this.paramsleft.appointEndTime = endTime || undefined
    const pagination = this.state.pagination
    pagination.current = 1
    this.fetchList()
  }

  public handleSelectType (values: any) {
    this.paramsright.customerSource = values.customerSource || undefined
    this.paramsright.payTaxesNature = values.payTaxesNature || undefined
    this.paramsright.agencyId = values.agencyId || undefined
    this.paramsright.currentSalesperson = values.currentSalesperson || undefined
    const pagination = this.state.pagination
    pagination.current = 1
    this.fetchList()
  }
  public handleSearchType (value: {key: string, value?: string}) {
    this.paramsright.customerName = undefined
    this.paramsright.contactPerson = undefined
    this.paramsright.signSalesperson = undefined
    // this.paramsright.contactPhone = undefined
    this.paramsright.operatingAccouting = undefined
    this.paramsright.areaName = undefined
    this.paramsright.contractCode = undefined
    this.paramsright[value.key] = value.value || undefined
    const pagination = this.state.pagination
    pagination.current = 1
    this.fetchList()
  }

  public detail (record: Signed.DetailProps, defaultKey?: string) {
    console.log(defaultKey)
    const modal = new Modal({
      content: (
        <Provider>
          <View
            type='signed'
            defaultKey={defaultKey}
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

  // 搜索框折叠
  public handleSwitch () {
    this.setState({
      extshow: !this.state.extshow
    })
  }
  public render () {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectAllChange.bind(this)
    }
    const { pagination } = this.state
    return (
      <div>
        <div>
          <Condition
            className='mb10'
            dataSource={this.data}
            onChange={this.handleSearch.bind(this)}
          />
          <APP.Icon
            style={{float: 'right', marginTop: 10}}
            onClick={this.handleSwitch.bind(this)}
            type={this.state.extshow ? 'up' : 'down'}
          />
          <div style={this.state.extshow ? {display:'block', marginTop: -5, marginBottom: 18} : {display: 'none'}}>
          <div style={{display: 'inline-block', width: 290, verticalAlign: 'bottom', marginLeft: 20}}>
            <SearchName
              style={{paddingTop: '5px'}}
              options={[
                { value: 'customerName', label: '客户名称'},
                { value: 'contactPerson', label: '联系人'},
                // { value: 'customerSource', label: '客户来源'},
                // { value: 'signSalesperson', label: '签约人'},
                // { value: 'contactPhone', label: '联系电话'},
                { value: 'operatingAccouting', label: '运营会计'},
                { value: 'areaName', label: '地区'},
                // { value: 'currentSalesperson', label: '跟进人'},
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
          <SelectSearch
            type='2'
            onChange={(values) => {
              this.handleSelectType(values)
            }}
          />
          </div>
        </div>
        <Table
          columns={this.columns}
          dataSource={this.state.dataSource}
          rowSelection={rowSelection}
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
      </div>
    )
  }
}
export default Main
