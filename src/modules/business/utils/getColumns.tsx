import React from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Tooltip } from 'antd'
import moment from 'moment'
const styles = require('../style')
export default function (): ColumnProps<Business.DetailProps>[] {
  console.log(this, 'this')
  return [{
    title: (
      <span>
        客户名称
        <Tooltip placement='top' title='客户未被跟进的天数'>
          <i className='fa fa-exclamation-circle ml5'></i>
        </Tooltip>
      </span>
    ),
    dataIndex: 'customerName',
    render: (val, record) => {
      return (
        <div>
          {
            record.redPoint === 1 &&
            <span className={styles['red-point']}></span>
          }
          <span className='href' onClick={this.show.bind(this, record.id)}>
            {val}
          </span>
        </div>
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
      return (APP.dictionary[`EnumCustomerSource-${val}`])
    }
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    render: (val) => {
      return (moment(val).format('YYYY-MM-DD'))
    }
  }, {
    title: (
      <span>
        入库时间
        <Tooltip placement='top' title='客户掉入销售库的时间'>
          <i className='fa fa-exclamation-circle ml5'></i>
        </Tooltip>
      </span>
    ),
    dataIndex: 'enterDays',
    render: (val) => {
      return (moment(val).format('YYYY-MM-DD'))
    }
  }]
}
