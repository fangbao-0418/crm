import React from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Tooltip, Icon } from 'antd'
import moment from 'moment'
import showDetail from './showDetail'
import { fetchList } from '../api'
import store from '@/store'
import { changeCustomerDetailAction } from '@/modules/customer/action'
const styles = require('../style')
import { changeVisibleAction } from '../action'
export default function (): ColumnProps<Business.DetailProps>[] {
  return [{
    title: '客户名称',
    dataIndex: 'customerName',
    render: (val, record, index) => {
      return (
        <div>
          {
            record.redPoint === 1 &&
            <span className={styles['red-point']}></span>
          }
          <span
            className='href'
            onClick={() => {
              const business: Business.Props = store.getState().business
              const tab = business.selectedTab
              let dataSource: Business.DetailProps[] = []
              const { searchPayload, pagination } = business[tab]
              const modal = showDetail.call(this, record, index,
                {
                  onOk: () => {
                    changeVisibleAction(false)
                    changeVisibleAction(true)
                    APP.success('操作成功')
                    fetchList(searchPayload).then((res) => {
                      pagination.total = res.pageTotal
                      APP.dispatch<Business.Props>({
                        type: 'change business data',
                        payload: {
                          [tab]: {
                            dataSource: res.data,
                            pagination
                          }
                        }
                      })
                      if (res.data[index]) {
                        const customerId = res.data[index].id
                        changeCustomerDetailAction(customerId)
                        APP.dispatch<Customer.Props>({
                          type: 'change customer data',
                          payload: {
                            detail: {
                              id: customerId
                            }
                          }
                        })
                      } else {
                        modal.hide()
                      }
                    })
                    return
                  },
                  onPrev: () => {
                    index -= 1
                    if (index === -1) {
                      if (searchPayload.pageCurrent === 1) {
                        modal.hide()
                        return
                      }
                      index = searchPayload.pageSize - 1
                      searchPayload.pageCurrent -= 1
                      dataSource = []
                    }
                    if (dataSource.length === 0) {
                      fetchList(searchPayload).then((res) => {
                        pagination.current = res.pageCurrent
                        APP.dispatch<Business.Props>({
                          type: 'change business data',
                          payload: {
                            [tab]: {
                              searchPayload,
                              dataSource: res.data,
                              pagination
                            }
                          }
                        })
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
                      fetchList(searchPayload).then((res) => {
                        // if (res.data)
                        pagination.current = res.pageCurrent
                        APP.dispatch<Business.Props>({
                          type: 'change business data',
                          payload: {
                            [tab]: {
                              searchPayload,
                              dataSource: res.data,
                              pagination
                            }
                          }
                        })
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
                }
              )
            }}
          >
            {val}
          </span>
          {
            !record.lastTrackTime &&
            <span className={styles['new-point']}>新</span>
          }
        </div>
      )
    }
  }, {
    title: '联系人',
    dataIndex: 'contactPerson'
  }, {
    title: '意向度',
    dataIndex: 'intention',
    render: (val) => {
      return (APP.dictionary[`EnumIntentionality-${val}`])
    }
  }, {
    title: (
      <span>
        空置天数
        <Tooltip placement='top' title='客户未被跟进的天数'>
          <i className='fa fa-info-circle ml5'></i>
        </Tooltip>
      </span>
    )
    ,
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
    title: (
      <span>
        入库时间
        <Tooltip placement='top' title='客户掉入销售库的时间'>
          <i className='fa fa-info-circle ml5'></i>
        </Tooltip>
      </span>
    ),
    dataIndex: 'enterDays',
    render: (val) => {
      return (moment(val).format('YYYY-MM-DD'))
    }
  }]
}
