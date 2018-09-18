import React from 'react'
import { Table, Button, Row, Col } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { DetailProps } from './customer'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import ContentBox from '@/modules/common/content'
import SearchName from '@/modules/common/search/SearchName'
interface States {
  dataSource: DetailProps[]
  selectedRowKeys: string[]
}
class Main extends React.Component {
  public state: States = {
    dataSource: [],
    selectedRowKeys: []
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
      label: ['所属城市'],
      value: 'all',
      field: 'telephoneStatus',
      options: [
        {
          label: '全部',
          value: 'all'
        },
        {
          label: '北京',
          value: 'wxdh'
        },
        {
          label: '上海',
          value: 'zjjj'
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
    title: '空置天数',
    dataIndex: 'vacantDays'
  }, {
    title: '城市',
    dataIndex: 'cityName'
  }, {
    title: '客户来源',
    dataIndex: 'customerSource'
  }, {
    title: '入库时间',
    dataIndex: 'createTime'
  }]
  public onSelectAllChange () {
    console.log('select')
  }
  public render () {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectAllChange.bind(this)
    }
    return (
      <ContentBox title='我的客资'>
        <div className='mt16'>
          <Row>
            <Col span={20}>
              <Condition
                dataSource={this.data}
                onChange={(values) => {
                  console.log(values)
                }}
              />
            </Col>
            <Col span={8}>
              <SearchName
                style={{paddingTop: '5px'}}
                options={[
                  {label: '客户名称', value: '1'},
                  {label: '联系人', value: '2'},
                  {label: '客户来源', value: '3'},
                  {label: '所属销售', value: '4'},
                  {label: '联系电话', value: '5'}
                ]}
                placeholder={''}
                onChange={(value) => {
                  console.log(value)
                }}
              />
            </Col>
          </Row>
        </div>
        <Table
          columns={this.columns}
          dataSource={this.state.dataSource}
          rowSelection={rowSelection}
          bordered
          rowKey={'customerId'}
        />
        <div className='mt40'>
          <Button type='primary' className='mr10'>全选</Button>
          <Button type='primary' className='mr10'>手工分配</Button>
          <Button type='primary' className='mr10'>应用自动分配</Button>
        </div>
      </ContentBox>
    )
  }
}
export default Main
