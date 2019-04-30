import React from 'react'
import { Table, Button, DatePicker, Select } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import ContentBox from '@/modules/common/content'
import Shrink from 'pilipa/libs/shrink'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import SelectSearch from './SelectSearch'
import SearchName from '@/modules/common/search/SearchName'
import moment from 'moment'
import { fetchListappoint, appointment, toSales } from '@/modules/business/api'
import { getSalesByCompany } from '@/modules/common/api'
import _ from 'lodash'
import { showDetail } from '@/modules/business/utils'
import { changeCustomerDetailAction } from '@/modules/customer/action'
import Modal from 'pilipa/libs/modal'
type DetailProps = Business.DetailProps
interface States {
  extshow: boolean
  dataSource: DetailProps[]
  pagination: {
    total: number
    current: number
    pageSize: number
  }
  selectedRowKeys: string[]
  sales: Array<{id: string, name: string}>
}
const all = [{
  label: '全部',
  value: ''
}]
class Main extends React.Component {
  public params: Business.SearchProps = {
    pageSize: 15,
    pageCurrent: 1
  }
  public state: States = {
    extshow: false,
    dataSource: [],
    pagination: {
      total: 0,
      current: this.params.pageCurrent,
      pageSize: this.params.pageSize
    },
    selectedRowKeys: [],
    sales: []
  }
  public paramsleft: Business.SearchProps = {}
  public paramsright: Business.SearchProps = {}
  public appointmentTime: string = ''
  public curSale: {key: string, label: string} = { key: '', label: ''}
  public data: ConditionOptionProps[] = [
    {
      field: 'date',
      value: '',
      label: ['预约时间', '创建时间', '最后跟进'],
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
    width: 350,
    dataIndex: 'customerName',
    render: (val, record, index) => {
      return (
        <span
          className='href'
          onClick={this.show.bind(this, record, index)}
        >
          {val}
        </span>
      )
    }
  }, {
    title: '联系人',
    width: 180,
    dataIndex: 'contactPerson'
  }, {
    title: '意向度',
    width: 180,
    dataIndex: 'intention',
    render: (val) => {
      return (APP.dictionary[`EnumIntentionality-${val}`])
    }
  }, {
    title: '空置天数',
    width: 180,
    dataIndex: 'freeDays'
  }, {
    title: '当前销售',
    width: 180,
    dataIndex: 'currentSalesperson'
  }, {
    title: '客户来源',
    width: 180,
    dataIndex: 'source',
    render: (val) => {
      return (APP.dictionary[`EnumCustomerSource-${val}`])
    }
  }, {
    title: '预约时间',
    width: 180,
    dataIndex: 'appointmentTime',
    render: (val) => {
      return (moment(val).format('YYYY-MM-DD'))
    }
  }]
  public pageSizeOptions = ['15', '30', '50', '80', '100', '200']
  public componentWillMount () {
    this.fetchList()
    this.fetchSales()
  }
  public fetchList () {
    const pagination = this.state.pagination
    return fetchListappoint(this.params).then((res) => {
      pagination.total = res.pageTotal
      pagination.pageSize = res.pageSize
      pagination.current = res.pageCurrent
      this.setState({
        pagination,
        dataSource: res.data,
        selectedRowKeys: []
      })
      return res
    })
  }
  public fetchSales () {
    getSalesByCompany(APP.user.companyId).then((res) => {
      this.setState({
        sales: res
      })
    })
  }
  public handlePageChange (page: number) {
    const { pagination } = this.state
    pagination.current = page
    this.params.pageCurrent = page
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
    this.params.pageCurrent = current
    this.params.pageSize = size
    pagination.pageSize = size
    this.setState({
      pagination
    }, () => {
      this.fetchList()
    })
  }
  public handleSearch (values: any) {
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
    if (values.date.label === '预约时间') {
      this.params.appointStartTime = beginTime
      this.params.appointEndDate = endTime
    } else if (values.date.label === '创建时间') {
      this.params.createBeginDate = beginTime
      this.params.createEndDate = endTime
    } else if (values.date.label === '最后跟进') {
      this.params.lastTrackBeginTime = beginTime
      this.params.lastTrackEndTime = endTime
    }
    this.params.intention = values.intention.value || undefined
    this.params.telephoneStatus = values.telephoneStatus.value || undefined
    this.params.pageCurrent = 1
    this.fetchList()
  }
  public handleSelectType (values: any) {
    this.params.payTaxesNature = values.payTaxesNature || undefined
    this.params.customerSource = values.customerSource || undefined
    this.params.currentSalespersonId = values.currentSalespersonId || undefined
    this.params.pageCurrent = 1
    this.fetchList()
  }
  public handleSearchType (values: any) {
    this.params.customerName = undefined
    this.params.contactPerson = undefined
    this.params.contactPhone = undefined
    this.params.customerSource = undefined
    this.params.payTaxesNature = undefined
    this.params[values.key] = values.value || undefined
    this.params.pageCurrent = 1
    this.fetchList()
  }
  public show (record: DetailProps, index: number) {
    let dataSource: Business.DetailProps[] = this.state.dataSource
    const searchPayload = this.params
    const modal = showDetail.call(this, record, index, {
      onOk: () => {
        APP.success('操作成功')
      },
      onPrev: () => {
        index -= 1
        if (index === -1) {
          if (searchPayload.pageCurrent <= 1) {
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
      },
      onNext: () => {
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
            changeCustomerDetailAction(dataSource[index].id)
          })
        } else {
          if (dataSource[index] === undefined) {
            modal.hide()
            return
          }
          changeCustomerDetailAction(dataSource[index].id)
        }
      }
    })
  }
  // 搜索框折叠
  public handleSwitch () {
    this.setState({
      extshow: !this.state.extshow
    })
  }
  public onSelectAllChange (selectedRowKeys: string[]) {
    this.setState({ selectedRowKeys })
  }
  public appointmentAll () {
    const selectedRowKeys = this.state.selectedRowKeys
    if (!selectedRowKeys.length) {
      APP.error('请选择客户！')
      return false
    }
    const modal = new Modal({
      content: (
        <div>
          <span>请选择预约时间：</span>
          <DatePicker
            placeholder=''
            format={'YYYY-MM-DD'}
            onChange={(current) => {
              this.appointmentTime = current.format('YYYY-MM-DD')
            }}
          />
        </div>
      ),
      title: '批量预约',
      mask: true,
      maskClosable: false,
      onOk: () => {
        if (!this.appointmentTime) {
          APP.error('请选择预约时间！')
          return false
        }
        const params = { customerIdArr: selectedRowKeys }
        console.log(params, 'params')
        const time = this.appointmentTime
        appointment(params, time).then(() => {
          this.fetchList()
          APP.success('预约成功')
          this.setState({
            selectedRowKeys: []
          })
        })
        modal.hide()
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public toSale () {
    const selectedRowKeys = this.state.selectedRowKeys
    if (!selectedRowKeys.length) {
      APP.error('请选择客户！')
      return false
    }
    const modal = new Modal({
      content: (
        <div>
          <span>请选择销售：</span>
          <Select
            showSearch
            optionFilterProp='children'
            filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
            labelInValue
            style={{width:'200px'}}
            onChange={(val: {key: '', label: ''}) => {
              this.curSale = val
            }}
          >
            {
              this.state.sales.map((item, index) => {
                return (
                  <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                )
              })
            }
          </Select>
        </div>
      ),
      title: '销售',
      mask: true,
      maskClosable: false,
      onOk: () => {
        if (!this.curSale.key) {
          APP.error('请选择销售！')
          return false
        }
        const saleparams = {
          customerIdArr: selectedRowKeys,
          salesperson: this.curSale.label
        }
        const saleId = this.curSale.key
        toSales(saleparams, saleId).then((res) => {
          this.fetchList()
          APP.success('操作成功')
          this.setState({
            selectedRowKeys: []
          })
        })
        modal.hide()
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public render () {
    const { pagination } = this.state
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectAllChange.bind(this)
    }
    return (
      <ContentBox title='我的预约'>
        <Shrink
          className='mb12'
          height={100}
        >
          <Condition
            dataSource={this.data}
            onChange={this.handleSearch.bind(this)}
          />
          <SelectSearch
            onChange={(values) => {
              this.handleSelectType(values)
            }}
          >
            <div style={{display: 'inline-block', width: 290, verticalAlign: 'bottom', margin: '0 5px 0 20px'}}>
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
                    console.log(val, 'onKeyDown')
                    this.handleSearchType(val)
                  }
                }}
                onSearch={(val) => {
                  this.handleSearchType(val)
                }}
              />
            </div>
          </SelectSearch>
        </Shrink>
        <Table
          columns={this.columns}
          rowSelection={rowSelection}
          dataSource={this.state.dataSource}
          rowKey={'id'}
          pagination={{
            onChange: this.handlePageChange.bind(this),
            onShowSizeChange: this.onShowSizeChange.bind(this),
            total: pagination.total,
            current: pagination.current,
            pageSize: pagination.pageSize,
            showQuickJumper: true,
            showSizeChanger: true,
            size: 'small',
            pageSizeOptions: this.pageSizeOptions,
            showTotal (total) {
              return `共计 ${total} 条`
            }
          }}
        />
        <div className='btn-position'>
          <Button disabled={this.state.selectedRowKeys.length === 0} type='primary' className='mr5' hidden={!APP.hasPermission('crm_business_appointment-detail_list_appoint')} onClick={this.appointmentAll.bind(this)}>批量预约</Button>
          <Button disabled={this.state.selectedRowKeys.length === 0} type='primary' className='mr5' hidden={!APP.hasPermission('crm_business_appointment-detail_list_distribute')} onClick={this.toSale.bind(this)}>转销售</Button>
        </div>
      </ContentBox>
    )
  }
}
export default Main
