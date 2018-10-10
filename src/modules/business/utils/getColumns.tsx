import React from 'react'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'
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
    dataIndex: 'intention',
    render: (val) => {
      return (APP.dictionary[`EnumIntentionality-${val}`])
    }
  }, {
    title: '电话状态',
    dataIndex: 'telephoneStatus',
    render: (val) => {
      return (APP.dictionary[`EnumContactStatus-${val}`])
    }
  }, {
    title: '空置天数',
    dataIndex: 'freeDays'
  }, {
    title: '当前销售',
    dataIndex: 'leadingPerson'
  }, {
    title: '客户来源',
    dataIndex: 'source',
    render: (val) => {
      return (APP.dictionary[`EnumContactSource-${val}`])
    }
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    render: (val) => {
      return (moment(val).format('YYYY-MM-DD'))
    }
  }, {
    title: '入库时间',
    dataIndex: 'enterDays',
    render: (val) => {
      return (moment(val).format('YYYY-MM-DD'))
    }
  }]
}
