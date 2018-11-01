import React from 'react'
import { Button } from 'antd'
import Modal from 'pilipa/libs/modal'
import Detail from '@/modules/business/detail'
import Provider from '@/components/Provider'
import ToOpenReason from '../ToOpenReason'
import { toOpen } from '../api'
import store from '@/store'
import { changeCustomerDetailAction } from '@/modules/customer/action'
export default function (record: Business.DetailProps, index?: number,
  operate: {
    onOk?: () => void
    onPrev?: () => void
    onNext?: () => void
  } = {}) {
  let customerId = record.id
  const that = this
  let reason: {value: string, label: string} = { value: '', label: ''}
  const modal = new Modal({
    content: (
      <Provider>
        <Detail
          type='business'
          getWrappedInstance={(ins) => {
            that.ins = ins
          }}
          onClose={() =>
            modal.onCancel()
          }
          customerId={customerId}
          footer={(
            <div className='mt10 text-right'>
              <Button
                type='ghost'
                hidden={!APP.hasPermission('crm_business_mine_detail_sea')}
                className='mr5'
                onClick={() => {
                  const modal1 = new Modal({
                    content: (
                      <ToOpenReason onChange={(item) => { reason = item }}/>
                    ),
                    title: '转公海',
                    mask: true,
                    onOk: () => {
                      customerId = store.getState().customer.detail.id
                      if (!reason.label) {
                        APP.error('请选择原因！')
                        return false
                      }
                      const openparams = {
                        customerIdArr: [customerId],
                        bus_sea_memo: reason.label
                      }
                      toOpen(openparams).then(() => {
                        if (operate.onOk) {
                          operate.onOk()
                        }
                      })
                      modal1.hide()
                    },
                    onCancel: () => {
                      modal1.hide()
                    }
                  })
                  modal1.show()
                }}
              >
                转公海
              </Button>
              <Button
                type='ghost'
                className='mr5'
                hidden={!APP.hasPermission('crm_business_mine_detail_save')}
                onClick={() => {
                  that.ins.save().then(() => {
                    // APP.success('保存成功')
                    operate.onOk()
                  })
                }}
              >
                保存
              </Button>
              <Button
                type='ghost'
                className='mr5'
                onClick={() => {
                  that.ins.save().then(() => {
                    // APP.success('保存成功')
                    operate.onOk()
                  })
                  if (operate.onPrev) {
                    operate.onPrev()
                  }
                }}
              >
                上一条
              </Button>
              <Button
                type='primary'
                onClick={() => {
                  that.ins.save().then(() => {
                    // APP.success('保存成功')
                    operate.onOk()
                  })
                  if (operate.onNext) {
                    operate.onNext()
                  }
                }}
              >
                下一条
              </Button>
            </div>
          )}
        />
      </Provider>
    ),
    footer: null,
    header: null,
    mask: true,
    maskClosable: false,
    onCancel: () => {
      modal.hide()
      this.fetchCount()
      this.fetchList()
    }
  })
  modal.show()
  return modal
}
