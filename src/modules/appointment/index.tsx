import React from 'react'
import { Table, Button, Row, Col, DatePicker, Select } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { DetailProps } from './appointment'
import ContentBox from '@/modules/common/content'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import SearchName from '@/modules/common/search/SearchName'
import Modal from 'pilipa/libs/modal'
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
  public render () {
    return (
      <ContentBox title='我的预约'>
        <div className='mb12' style={{ overflow: 'hidden' }}>
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
              options={APP.keys.EnumSignCustomerSearchType}
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
          bordered
          rowKey={'customerId'}
        />
      </ContentBox>
    )
  }
}
export default Main
