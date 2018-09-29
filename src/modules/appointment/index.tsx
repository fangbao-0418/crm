import React from 'react'
import { Table, Button, Row, Col, DatePicker, Select } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import ContentBox from '@/modules/common/content'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import SearchName from '@/modules/common/search/SearchName'
import Modal from 'pilipa/libs/modal'
import moment from 'moment'
import { PaginationConfig } from 'antd/lib/pagination'
import { fetchListappoint } from '@/modules/business/api'
import Provider from '@/components/Provider'
import Detail from '@/modules/customer/detail'
import _ from 'lodash'
type DetailProps = Business.DetailProps
interface States {
  dataSource: DetailProps[]
  pagination: PaginationConfig
}
const all = [{
  label: '全部',
  value: ''
}]
class Main extends React.Component {
  public state: States = {
    dataSource: [],
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
  public params: Business.SearchProps = {}
  public paramsleft: Business.SearchProps = {}
  public paramsright: Business.SearchProps = {}
  public data: ConditionOptionProps[] = [
    {
      field: 'date',
      value: 'all',
      label: ['入库时间', '创建时间'],
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
    dataIndex: 'can'
  }, {
    title: '电话状态',
    dataIndex: 'flowtime'
  }, {
    title: '空置天数',
    dataIndex: 'vacantDays'
  }, {
    title: '当前销售',
    dataIndex: 'leadingPerson'
  }, {
    title: '客户来源',
    dataIndex: 'customerSource'
  }, {
    title: '创建时间',
    dataIndex: 'createTime'
  }, {
    title: '预约时间',
    dataIndex: 'leadingPerson'
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
    fetchListappoint(params).then((res) => {
      const pagination2 = { ...this.state.pagination }
      pagination2.total = res.pageTotal
      this.setState({
        dataSource: res.data
      })
    })
  }
  public handleSearch (values: any) {
    this.paramsleft = {}
    let beginTime
    let endTime
    if (values.date.value === 'all') {
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
    } else if (values.date.label === '最后跟进') {
      this.paramsleft.lastTrackBeginTime = beginTime
      this.paramsleft.lastTrackEndTime = endTime
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
      this.paramsright.currentSalesperson = values.value
      break
    case '4':
      this.paramsright.contactPhone = values.value
      break
    case '5':
      this.paramsright.payTaxesNature = values.value
      break
    }
    this.fetchList()
  }
  public show (customerId: string) {
    const modal = new Modal({
      style: 'width: 840px',
      content: (
        <Provider><Detail customerId={customerId}/></Provider>
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
  public render () {
    return (
      <ContentBox title='我的预约'>
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
                { value: '3', label: '所属销售'},
                { value: '4', label: '联系电话'},
                { value: '5', label: '纳税类别'}
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
          bordered
          rowKey={'id'}
          pagination={this.state.pagination}
        />
      </ContentBox>
    )
  }
}
export default Main
