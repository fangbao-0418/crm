import React from 'react'
import { Table, Button, Row, Col, DatePicker, Select } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { DetailProps } from './business'
import ContentBox from '@/modules/common/content'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import SearchName from '@/modules/common/search/SearchName'
import Modal from 'pilipa/libs/modal'
import RightContent from '@/modules/common/content/right-content'
interface States {
  dataSource: DetailProps[]
  selectedRowKeys: string[]
  sales: DetailProps[]
  customerCity: DetailProps[]
}
class Main extends React.Component {
  public state: States = {
    dataSource: [],
    selectedRowKeys: [],
    sales: [],
    customerCity: []
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
          value: 'today'
        },
        {
          label: '7天',
          value: '7d'
        },
        {
          label: '30天',
          value: '30d'
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
          value: '0%'
        },
        {
          label: '30%',
          value: '30%'
        },
        {
          label: '60%',
          value: '60%'
        },
        {
          label: '80%',
          value: '80%'
        },
        {
          label: '100%',
          value: '100%'
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
    title: '跟进次数',
    dataIndex: 'flowtime'
  }, {
    title: '空置天数',
    dataIndex: 'vacantDays'
  }, {
    title: '客户来源',
    dataIndex: 'customerSource'
  }, {
    title: '入库时间',
    dataIndex: 'createTime'
  }, {
    title: '当前销售',
    dataIndex: 'leadingPerson'
  }]
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
        <div>
          <span>请选择转公海原因：</span>
        </div>
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
  public render () {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectAllChange.bind(this)
    }
    return (
      <ContentBox
        title='我的商机'
        rightCotent={(
          <RightContent />
        )}
      >
        <div className='mt12' style={{ overflow: 'hidden' }}>
          <div className='fl' style={{ width: 740 }}>
            <Condition
              dataSource={this.data}
              onChange={(values) => {
                console.log(values)
              }}
            />
          </div>
          <div className='fr' style={{ width: 290 }}>
            <SearchName
              style={{paddingTop: '5px'}}
              options={[
                {label: '客户名称', value: '0'},
                {label: '联系人', value: '1'},
                {label: '客户来源', value: '2'},
                {label: '所属销售', value: '3'},
                {label: '联系电话', value: '4'},
                {label: '联系电话', value: '5'}
              ]}
              placeholder={''}
              onChange={(value) => {
                console.log(value)
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
        />
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
