import React from 'react'
import Modal from 'pilipa/libs/modal'
import { Button } from 'antd'
import Provider from '@/components/Provider'
import BaseInfo from '@/modules/customer/BaseInfo'
import showDetail from './showDetail'
import { fetchList } from '../api'
import store from '@/store'
import { changeCustomerDetailAction } from '@/modules/customer/action'
export default function () {
  let ins: any
  const modal = new Modal({
    style: 'width: 600px',
    content: (
      <Provider>
        <BaseInfo
          reset
          ref={(ref: any) => { ins = ref.getWrappedInstance() }}
          onClose={() => {modal.hide()}}
          type='business'
          flowNow={() => { modal.hide()}}
        />
      </Provider>
    ),
    footer: (
      <div className='text-right mt10'>
        <Button
          className='mr5'
          type='primary'
          onClick={() => {
            console.log(ins.refs.wrappedComponent)
            ins.refs.wrappedComponent.save().then(() => {
              APP.success('保存成功')
              modal.hide()
              this.fetchList()
              this.fetchCount()
            })
          }}
        >
          保存
        </Button>
        <Button
          type='primary'
          onClick={() => {
            ins.refs.wrappedComponent.save().then((res: any) => {
              APP.success('保存成功') // 保存成功后跳转到详情页
              modal.hide()
              const business: Business.Props = store.getState().business
              const tab = business.selectedTab
              let dataSource: Business.DetailProps[] = []
              const { searchPayload, pagination } = business[tab]
              let index = 0
              showDetail.call(this, {id: res.data}, index,
                {
                  onOk: () => {
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
                    if (index < 0) {
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
            }, () => {
              APP.error('保存失败')
            })
          }}
        >
          现在跟进
        </Button>
      </div>
    ),
    title: '录入客资',
    mask: true,
    onCancel: () => {
      modal.hide()
    }
  })
  modal.show()
}
