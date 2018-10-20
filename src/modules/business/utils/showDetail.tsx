import React from 'react'
import { Button } from 'antd'
import Modal from 'pilipa/libs/modal'
import Detail from '@/modules/customer/detail'
import Provider from '@/components/Provider'
import ToOpenReason from '../ToOpenReason'
import { toOpen } from '../api'
import store from '@/store'
export default function (record: Business.DetailProps, cb?: () => void) {
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
          onClose={() => modal.hide()}
          customerId={customerId}
          footer={(
            <div className='text-right mt10'>
              <Button
                type='primary'
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
                        APP.success('操作成功')
                        if (cb) {
                          cb()
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
                onClick={() => {
                  that.ins.save().then(() => {
                    APP.success('保存成功')
                  })
                }}
              >
                保存
              </Button>
            </div>
          )}
        />
      </Provider>
    ),
    footer: null,
    header: null,
    mask: true,
    onCancel: () => {
      modal.hide()
    }
  })
  modal.show()
  return modal
}
