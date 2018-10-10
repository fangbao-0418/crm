import React from 'react'
import { ColumnProps } from 'antd/lib/table'
export default function (): ColumnProps<Business.DetailProps>[] {
  return [{
    title: '客户名称',
    dataIndex: 'customerName',
    render: (val, record) => {
      return (
        <span className='href' onClick={this.show.bind(this, record.id)}>{val}</span>
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
    dataIndex: 'intention'
  }, {
    title: '电话状态',
    dataIndex: 'telephoneStatus'
  }, {
    title: '空置天数',
    dataIndex: 'freeDays'
  }, {
    title: '当前销售',
    dataIndex: 'leadingPerson'
  }, {
    title: '客户来源',
    dataIndex: 'source'
  }, {
    title: '创建时间',
    dataIndex: 'createTime'
  }, {
    title: '入库时间',
    dataIndex: 'enterDays'
  }]
}
