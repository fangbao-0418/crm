import React from 'react'
import { Button } from 'antd'
import Modal from 'pilipa/libs/modal'
import Detail from '@/modules/business/detail'
import Provider from '@/components/Provider'
import ToOpenReason from '../ToOpenReason'
import { toOpen } from '../api'
import store from '@/store'
import Transaction from '@/modules/business/detail/footer/transaction'
export default function (record: Business.DetailProps, index?: number,
  operate: {
    onOk?: () => void
    onPrev?: () => void
    onNext?: () => void
    refresh?: () => void
  } = {}) {
  let customerId = record.id
  const that = this
  const reason: {value: string, label: string} = { value: '', label: ''}
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
              <Transaction showBtn={!APP.hasPermission('entersigninfo')}/>
              <Button
                type='ghost'
                hidden={!APP.hasPermission('crm_business_mine_detail_sea')}
                className='mr5'
                onClick={() => {
                  const modal1 = new Modal({
                    content: (
                      <ToOpenReason
                        onOk={(item) => {
                          customerId = store.getState().customer.detail.id
                          console.log(item)
                          const openparams = {
                            customerIdArr: [customerId],
                            bus_sea_memo: item.label
                          }
                          toOpen(openparams).then(() => {
                            if (operate.refresh) {
                              operate.refresh()
                            }
                            modal1.hide()
                          })
                        }}
                        onCancel={() => {
                          modal1.hide()
                        }}
                      />
                    ),
                    title: '转公海',
                    mask: true,
                    footer: null,
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
                    if (operate.onOk) {
                      operate.onOk()
                    }
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
                    if (operate.onPrev) {
                      operate.onPrev()
                    }
                  })
                }}
              >
                上一条
              </Button>
              <Button
                type='ghost'
                onClick={() => {
                  that.ins.save().then(() => {
                    if (operate.onNext) {
                      operate.onNext()
                    }
                  })
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
      if (this.fetchCount) {
        this.fetchCount()
      }
      this.fetchList()
    }
  })
  modal.show()
  return modal
}
