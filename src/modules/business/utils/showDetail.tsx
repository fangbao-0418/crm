import React from 'react'
import { Button } from 'antd'
import Modal from 'pilipa/libs/modal'
import Detail from '@/modules/customer/detail'
import Provider from '@/components/Provider'
import ToOpenReason from '../ToOpenReason'
import { toOpen } from '../api'
export default function (customerId: string) {
  const that = this
  let reason: {value: string, label: string} = { value: '', label: ''}
  console.log(this, 'assssss')
  const modal = new Modal({
    content: (
      <Provider>
        <Detail
          type='business'
          getWrappedInstance={(ins) => {
            that.ins = ins
          }}
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
                      if (!reason.label) {
                        APP.error('请选择原因！')
                        return false
                      }
                      const openparams = {
                        customerIdArr: [customerId],
                        bus_sea_memo: reason.label
                      }
                      toOpen(openparams).then(() => {
                        this.setState({
                          visible: false
                        }, () => {
                          this.setState({
                            visible: true
                          })
                        })
                        APP.success('操作成功')
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
                  that.ins.save()
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
}
