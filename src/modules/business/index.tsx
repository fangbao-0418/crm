import React from 'react'
import { Table, Button, DatePicker, Select, Tabs } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { PaginationConfig } from 'antd/lib/pagination'
import { DetailProps } from './business'
import ContentBox from '@/modules/common/content'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import SearchName from '@/modules/common/search/SearchName'
import Modal from 'pilipa/libs/modal'
import AddButton from '@/modules/common/content/AddButton'
import ToOpenReason from './ToOpenReason'
import Provider from '@/components/Provider'
import BaseInfo from '@/modules/customer/BaseInfo'
import Import from '@/modules/customer/import'
import { fetchList } from './api'
import moment from 'moment'
interface States {
  dataSource: DetailProps[]
  selectedRowKeys: string[]
  sales: DetailProps[]
  customerCity: DetailProps[]
  pagination: PaginationConfig
}
class Main extends React.Component {
  public state: States = {
    dataSource: [],
    selectedRowKeys: [],
    sales: [],
    customerCity: [],
    pagination: {
      current: 1,
      pageSize: 15,
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: ['15', '30', '50', '80', '100', '200'],
      showTotal (total) {
        return `共计 ${total} 条`
      }
    }
  }
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
      value: '0',
      field: 'intention',
      options: [
        {
          label: '全部',
          value: '0'
        },
        {
          label: '0%',
          value: '1'
        },
        {
          label: '30%',
          value: '2'
        },
        {
          label: '60%',
          value: '3'
        },
        {
          label: '80%',
          value: '4'
        },
        {
          label: '100%',
          value: '5'
        }
      ]
    },
    {
      field: 'telephoneStatus',
      value: '0',
      label: ['电话状态'],
      options: [
        {
          label: '全部',
          value: '0'
        },
        {
          label: '无效电话',
          value: '1'
        },
        {
          label: '无人接听',
          value: '2'
        },
        {
          label: '直接拒绝',
          value: '3'
        },
        {
          label: '持续跟进',
          value: '4'
        },
        {
          label: '同行',
          value: '5'
        }
      ]
    }
  ]
  public params: any = {}
  public columns: ColumnProps<DetailProps>[] = [{
    title: '客户名称',
    dataIndex: 'customerName'
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
    title: '入库时间',
    dataIndex: 'createTime'
  }]
  public componentWillMount () {
    this.fetchList()
  }
  public fetchList () {
    const pagination = this.state.pagination
    this.params.pageSize = pagination.pageSize
    this.params.pageNum = pagination.current
    fetchList(this.params).then((res) => {
      const pagination2 = { ...this.state.pagination }
      pagination2.total = res.pageTotal
      this.setState({
        dataSource: res.data
      })
    })
  }
  public handleSearch (values: any) {
    console.log(values, 'values')
    let beginTime
    let endTime
    if (values.date === 'all') {
      beginTime = ''
      endTime = ''
    } else if (values.date.indexOf('至') > -1) {
      beginTime = values.date.split('至')[0]
      endTime = values.date.split('至')[1]
    } else {
      beginTime = moment().format('YYYY-MM-DD')
      endTime = moment().startOf('day').add(values.date, 'day').format('YYYY-MM-DD')
    }
    this.params.intention = values.intention
    this.params.telephoneStatus = values.telephoneStatus
    this.params.beginTime = beginTime
    this.params.endDate = endTime
    console.log(this.params, '1')
    this.fetchList()
  }
  public handleSearchType (values: any) {
    console.log(values, 'values')
    this.params.type = values.type
    this.params.word = values.word
    console.log(this.params, '2')
    this.fetchList()
  }
  public callback () {
    console.log('11')
  }
  public onSelectAllChange () {
    console.log('select')
  }
  public appointmentAll () {
    const modal = new Modal({
      content: (
        <div>
          <span>请选择预约时间：</span>
          <DatePicker
            format={'YYYY-MM-DD'}
            onChange={(current) => {
              console.log(current)
            }}
          />
        </div>
      ),
      title: '批量预约',
      mask: true,
      onOk: () => {
        modal.hide()
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public toSale () {
    const modal = new Modal({
      content: (
        <div>
          <span>请选择销售：</span>
          <Select
            style={{width:'200px'}}
            onChange={(current) => {
              console.log(current)
            }}
          >
            {
              this.state.sales.map((d) =>
                <Select.Option key={d.value}>{d.text}</Select.Option>
              )
            }
          </Select>
        </div>
      ),
      title: '销售',
      mask: true,
      onOk: () => {
        modal.hide()
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public toOpen () {
    const modal = new Modal({
      content: (
        <ToOpenReason/>
      ),
      title: '转公海',
      mask: true,
      onOk: () => {
        modal.hide()
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public toCustomersCity () {
    const modal = new Modal({
      content: (
        <div>
          <span>请选择客资池：</span>
          <Select
            style={{width:'200px'}}
            onChange={(current) => {
              console.log(current)
            }}
          >
            {
              this.state.customerCity.map((d) =>
                <Select.Option key={d.value}>{d.text}</Select.Option>
              )
            }
          </Select>
        </div>
      ),
      title: '转客资池',
      mask: true,
      onOk: () => {
        modal.hide()
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public add () {
    const modal = new Modal({
      content: (
        <Provider>
          <BaseInfo/>
        </Provider>
      ),
      footer: null,
      title: '新增',
      mask: true,
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public import () {
    const modal = new Modal({
      style: 'width: 800px',
      content: (
        <Provider><Import /></Provider>
      ),
      footer: null,
      title: '导入',
      mask: true,
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
    return (
      <ContentBox
        title='我的商机'
        rightCotent={(
          <div>
            <AddButton
              style={{marginRight: '10px'}}
              title='新增'
              onClick={() => {
                this.add()
              }}
            />
            <AddButton
              title='导入'
              onClick={() => {
                this.import()
              }}
            />
          </div>
        )}
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
              options={APP.keys.EnumCustomerSearchType}
              placeholder={''}
              // onChange={this.handleSearchType.bind(this)}
              onKeyDown={(e, val) => {
                if (e.keyCode === 13) {
                  console.log(val, 'onKeyDown')
                  this.handleSearchType(val)
                }
              }}
            />
          </div>
        </div>
        <Tabs defaultActiveKey='1' onChange={this.callback}>
          <Tabs.TabPane tab='全部(160000)' key='1'>
            <Table
              columns={this.columns}
              dataSource={this.state.dataSource}
              rowSelection={rowSelection}
              bordered
              rowKey={'customerId'}
              pagination={this.state.pagination}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='已有沟通(18000)' key='2'>
            <Table
              columns={this.columns}
              dataSource={this.state.dataSource}
              rowSelection={rowSelection}
              bordered
              rowKey={'customerId'}
              pagination={this.state.pagination}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='新客资(500)' key='3'>
            <Table
              columns={this.columns}
              dataSource={this.state.dataSource}
              rowSelection={rowSelection}
              bordered
              rowKey={'customerId'}
              pagination={this.state.pagination}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='即将被收回(53)' key='4'>
            <Table
              columns={this.columns}
              dataSource={this.state.dataSource}
              rowSelection={rowSelection}
              bordered
              rowKey={'customerId'}
              pagination={this.state.pagination}
            />
          </Tabs.TabPane>
        </Tabs>
        <div className='mt40'>
          <Button type='primary' className='mr10' onClick={this.appointmentAll.bind(this)}>批量预约</Button>
          <Button type='primary' className='mr10' onClick={this.toSale.bind(this)}>转销售</Button>
          <Button type='primary' className='mr10' onClick={this.toOpen.bind(this)}>转公海</Button>
          <Button type='primary' className='mr10' onClick={this.toCustomersCity.bind(this)}>转客资池</Button>
        </div>
      </ContentBox>
    )
  }
}
export default Main
