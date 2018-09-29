import React from 'react'
import { Table, Button, Select } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import Modal from 'pilipa/libs/modal'
import ContentBox from '@/modules/common/content'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import SearchName from '@/modules/common/search/SearchName'
import AddButton from '@/modules/common/content/AddButton'
import Profile from '@/modules/common/company-detail/Profile'
import Provider from '@/components/Provider'
import View from './View'
import { PaginationConfig } from 'antd/lib/pagination'
import { fetchList, toOther } from './api'
import _ from 'lodash'
import moment from 'moment'
type DetailProps = Signed.DetailProps
const Option = Select.Option
interface States {
  dataSource: DetailProps[]
  selectedRowKeys: string[]
  pagination: PaginationConfig
}
class Main extends React.Component {
  public state: States = {
    dataSource: [],
    selectedRowKeys: [],
    pagination: {
      current: 1,
      pageSize: 10,
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      showTotal (total) {
        return `共计 ${total} 条`
      }
    }
  }
  public params: Signed.SearchProps = {}
  public paramsleft: Signed.SearchProps = {}
  public paramsright: Signed.SearchProps = {}
  public curSale: {key: string, label: string} = { key: '', label: ''}
  public data: ConditionOptionProps[] = [
    {
      field: 'date',
      value: '',
      label: ['入库时间', '创建时间'],
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
      field: 'serviceExpire',
      value: '',
      label: ['即将到期'],
      options: [
        {
          label: '全部',
          value: ''
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
      value: '',
      field: 'payTaxesNature',
      options: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '小规模',
          value: '1'
        },
        {
          label: '一般人',
          value: '2'
        }
      ]
    }
  ]
  public columns: ColumnProps<DetailProps>[] = [{
    title: '客户名称',
    dataIndex: 'customerName',
    render: (val, record) => {
      return (
        <a onClick={this.detail.bind(this)}>{val}</a>
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
    title: '入库时间',
    dataIndex: 'createTime'
  }, {
    title: '开始账期',
    dataIndex: 'startTime'
  }, {
    title: '预计截至账期',
    dataIndex: 'endTime'
  }, {
    title: '操作',
    render: (record) => {
      return (
        <a onClick={this.toSale.bind(this, record.id)}>转跟进人</a>
      )
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
      const pagination2 = { ...this.state.pagination }
      pagination2.total = res.pageTotal
      this.setState({
        dataSource: res.data
      })
    })
  }
  public handleSearch (values: any) {
    console.log(values, 'values')
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
    if (values.date.label === '入库时间') {
      this.paramsleft.storageBeginDate = beginTime
      this.paramsleft.storageEndDate = endTime
    } else if (values.date.label === '创建时间') {
      this.paramsleft.createBeginDate = beginTime
      this.paramsleft.createEndDate = endTime
    }
    let startmonth
    let endmonth
    if (!values.serviceExpire.value) {
      startmonth = ''
      endmonth = ''
    } else if (values.serviceExpire.value.indexOf('至') > -1) {
      startmonth = moment(values.serviceExpire.value.split('至')[0]).startOf('month').format('YYYY-MM-DD')
      endmonth = moment(values.serviceExpire.value.split('至')[1]).startOf('month').format('YYYY-MM-DD')
    } else {
      const val = values.serviceExpire.value.slice(0, 1)
      console.log(val)
      startmonth = moment().startOf('month').format('YYYY-MM-DD')
      endmonth = moment().startOf('month').add(val, 'month').format('YYYY-MM-DD')
    }
    if (values.serviceExpire.label === '即将到期') {
      this.paramsleft.serviceExpireBeginMonth = startmonth
      this.paramsleft.serviceExpireEndMonth = endmonth
    }
    console.log(startmonth, endmonth)
    this.paramsleft.payTaxesNature = values.payTaxesNature.value
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
      this.paramsright.signSalesperson = values.value
      break
    case '4':
      this.paramsright.contactPhone = values.value
      break
    case '5':
      this.paramsright.operatingAccouting = values.value
      break
    case '6':
      this.paramsright.areaName = values.value
      break
    case '7':
      this.paramsright.currentSalesperson = values.value
      break
    case '8':
      this.paramsright.contractCode = values.value
      break
    }
    this.fetchList()
  }
  public toSale (id?: string) {
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
            <Option key='1'>销售1</Option>
            <Option key='2'>销售2</Option>
          </Select>
        </div>
      ),
      title: '销售',
      mask: true,
      onOk: () => {
        const params = {
          customerIdArr: this.state.selectedRowKeys,
          principalsId: this.curSale.key,
          principals: this.curSale.label
        }
        toOther(params).then(() => {
          APP.success('操作成功')
          modal.hide()
        })
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public detail () {
    const modal = new Modal({
      content: (
        <Provider><View /></Provider>
      ),
      header: null,
      footer: null,
      mask: true,
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
                { value: '0', label: '客户名称'},
                { value: '1', label: '联系人'},
                { value: '2', label: '客户来源'},
                { value: '3', label: '签单销售'},
                { value: '4', label: '联系电话'},
                { value: '5', label: '运营会计'},
                { value: '6', label: '地区'},
                { value: '7', label: '跟进人'},
                { value: '8', label: '合同号'}
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
          rowKey={'customerId'}
          pagination={this.state.pagination}
        />
        <div>
          <Button type='primary' onClick={this.toSale.bind(this, '')}>转跟进人</Button>
        </div>
      </ContentBox>
    )
  }
}
export default Main
